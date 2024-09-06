import { Add } from "./hotscript-fork/numbers/impl/addition";
import { WasmValue } from "./wasm";
import type { Satisfies } from './utils'

type Counter = 1[];

type DigitToCounter<T extends string> =
  T extends '0'
  ? []
  : [1]

type Calculation = {
  digit: string,
  carry: Counter,
}

// TODO(perf) look into using a regular string here instead of DigitToCounter

/** this creates a Calculation for the addition */
type Calculate<T extends Counter> =
  T['length'] extends 0 ? { digit: '0', carry: [] } :
  T['length'] extends 1 ? { digit: '1', carry: [] } :
  T['length'] extends 2 ? { digit: '0', carry: [1] } :
  T['length'] extends 3 ? { digit: '1', carry: [1] } :
  never

  // QUESTION: is this faster?
  // vvvvvvvvvvvvvvvvvvvvvvvvv
  // T extends [1, 1, ...infer Remainder]
  // ? {
  //   digit: `${Remainder['length']}`
  //   carry: [1]
  // }
  // : {
  //   digit: `${T['length']}`
  //   carry: []
  // }


/** This function's purpose in life is to avoid needing to calculate C twice */
type AppendCalculationFixedReversed<
  A_Remaining extends string,
  B_Remaining extends string,
  C extends Calculation
> = `${
  C['digit']
}${
  StringAddFixedReversed<
    A_Remaining,
    B_Remaining,
    C['carry']
  >
}`

export type StringAddFixedReversed<
  A extends string,
  B extends string,
  carry extends Counter,
> =
  A extends `${infer A_Digit}${infer A_Remaining}`
  
  ? // A has a digit
    B extends `${infer B_Digit}${infer B_Remaining}`
    ? // A and B both have a digit
      AppendCalculationFixedReversed<
        A_Remaining,
        B_Remaining,
        Calculate<[
          ...DigitToCounter<A_Digit>,
          ...DigitToCounter<B_Digit>,
          ...carry,
        ]>
      >

    : // A has a digit, but B does not
      ''

  : // out of digits.  fuck the carry.
    ''

export type StringAddFixed<
  A extends string,
  B extends string,
  Carry extends 0 | 1 = 0,
  Padding extends string = `${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}`,
> =
  [A, B, Carry] extends [`${Padding}1${any}`, `${Padding}1${any}`, 1] ? (Padding extends '' ? '1' : `${StringAddFixed<A, B, 1, Padding extends `${any}${infer Rest}` ? Rest : ''>}1`)
  : [A, B, Carry] extends [`${Padding}1${any}`, `${Padding}1${any}`, 0] | [`${Padding}1${any}`, `${Padding}0${any}`, 1] | [`${Padding}0${any}`, `${Padding}1${any}`, 1] ? (Padding extends '' ? '0' : `${StringAddFixed<A, B, 1, Padding extends `${any}${infer Rest}` ? Rest : ''>}0`)
  : [A, B, Carry] extends [`${Padding}1${any}`, `${Padding}0${any}`, 0] | [`${Padding}0${any}`, `${Padding}1${any}`, 0] | [`${Padding}0${any}`, `${Padding}0${any}`, 1] ? (Padding extends '' ? '1' : `${StringAddFixed<A, B, 0, Padding extends `${any}${infer Rest}` ? Rest : ''>}1`)
  : (Padding extends '' ? '0' : `${StringAddFixed<A, B, 0, Padding extends `${any}${infer Rest}` ? Rest : ''>}0`)

export type AddBinaryFixed<
  A extends string,
  B extends string,
> = Satisfies<string, StringAddFixed<A, B, 0>>

/** This function's purpose in life is to avoid needing to calculate C twice */
type AppendCalculationArbitraryReversed<
  A_Remaining extends string,
  B_Remaining extends string,
  C extends Calculation
> = `${
  C['digit']
}${
  StringAddArbitraryReversed<
    A_Remaining,
    B_Remaining,
    C['carry']
  >
}`


export type StringAddArbitraryReversed<
  A extends string,
  B extends string,
  carry extends Counter,
> =
  A extends `${infer A_Digit}${infer A_Remaining}`
  
  ? // A has a digit
    B extends `${infer B_Digit}${infer B_Remaining}`
    ? // A and B both have a digit
      AppendCalculationArbitraryReversed<
        A_Remaining,
        B_Remaining,
        Calculate<[
          ...DigitToCounter<A_Digit>,
          ...DigitToCounter<B_Digit>,
          ...carry,
        ]>
      >

    : // A has a digit, but B does not
      AppendCalculationArbitraryReversed<
        A_Remaining,
        '', // since we know B is out of digits, we can just pass an empty string
        Calculate<[
          ...DigitToCounter<A_Digit>,
          ...carry
        ]>
      >

    : // A does not have a digit
      B extends `${infer B_Digit}${infer B_Remaining}`

      ? // A does not have a digit, but B does
        AppendCalculationArbitraryReversed<
          '', // since we know A is out of digits, we can just pass an empty string
          B_Remaining,
          Calculate<[
            ...DigitToCounter<B_Digit>,
            ...carry
          ]>
        >


      : // A and B do not have digits left.  just need to resolve the carry
      carry extends []
      ? // there was no a carry, base case of recursion
        ''
      : // there was a carry, base case of recursion
        '1'


export type I32AddBinary<
  a extends WasmValue,
  b extends WasmValue
> = Satisfies<WasmValue,
  AddBinaryFixed<a, b>
>

export type I64AddBinary<
  a extends WasmValue,
  b extends WasmValue
> = Satisfies<WasmValue,
  AddBinaryFixed<a, b>
>

export type I32AddDecimal<
  a extends number,
  b extends number,
> = Satisfies<number,
  Add<a, b>
>


/*

The following is a disappointing failure.

The goal is to do addition from left to right (i.e. MSB to LSB).

To accomplish this, you consider a moving window where you can look at the next digit of A and B _as well as_ the next digit of each _after that_.

The problem is, you need an effectively infinite lookup to make sure you don't have to carry.

Consider the following:
'011',
'001'

for the first window we see `01` in A and `00` in B.  This is a simple addition, no carry.

EXCEPT IT ISN"T because in the next frame you have a carry but you just can't see it yet.

That means you effectively have to implement an infinite forward lookup.  I might.  I fucking just might.  But in the end it'll probably be easier to just.... I can't believe I'm even saying this... to just store everything in reverse order all the time.

*/

// type AdditionMatrixLookup = {
// // AABB
// // 0101
//   '0000': '0', // one 1
//   '0001': '0', // one 1
//   '0010': '1', // one 1
//   '0100': '0', // one 1
//   '1000': '1', // one 1
//   '0011': '1', // two 1s
//   '0110': '1', // two 1s
//   '1100': '1', // two 1s
//   '1001': '1', // two 1s
//   '0101': '1', // two 1s
//   '1010': '0', // two 1s
//   '1110': '0', // three 1s
//   '1101': '0', // three 1s
//   '1011': '0', // three 1s
//   '0111': '0', // three 1s
//   '1111': '1', // four 1s
// }

// type AdditionLookup = {
//   // AB
//     '00': '0',
//     '10': '1',
//     '01': '1',
//     '11': '0',
//   }

// export type AddBinaryDoNotLookDownVersion<
//   A extends string,
//   B extends string,
//   Acc extends string = '',
// > =
//   A extends `${infer A0 extends string}${infer A1 extends string}${infer ARest}`
//   ? B extends `${infer B0 extends string}${infer B1 extends string}${infer BRest}`
//     ? `${A0}${A1}${B0}${B1}` extends infer Lookup extends keyof AdditionMatrixLookup
//        ? AddBinaryDoNotLookDownVersion<
//           `${A1}${ARest}`,
//           `${B1}${BRest}`,
//           `${Acc}${AdditionMatrixLookup[Lookup]}`
//          >
//        : never // a not-binary number was passed in
//     : never // unequal lengths were passed in
//   : // we've reached the last digits
//     `${Acc}${
//       `${A}${B}` extends infer Lookup extends keyof AdditionLookup
//         ? AdditionLookup[Lookup]
//         : never // a not-binary number was passed in
//     }`

// type t =  AddBinaryDoNotLookDownVersion<
//   '011',
//   '001'
// // 0x
// //  ^- here's where it fucks up because it can't see the carry coming from far ahead
// > // =>