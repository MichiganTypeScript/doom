import { Convert } from "./conversion";
import { Add } from "./hotscript-fork/numbers/impl/addition";
import { Clamp } from "./split";
import { WasmValue } from "./wasm";

type Counter = 1[];

type Reverse<
  T extends string
> =
  T extends `${infer L}${infer R}`
  ? `${Reverse<R>}${L}`
  : ''

type DigitToCounter<T extends string> =
  T extends '0'
  ? []
  : [1]

type Calculation = {
  digit: string,
  carry: Counter,
}

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
type AppendCalculation<
  A_Remaining extends string,
  B_Remaining extends string,
  C extends Calculation
> = `${
  C['digit']
}${
  StringAdd<
    A_Remaining,
    B_Remaining,
    C['carry']
  >
}`

type StringAdd<
  A extends string,
  B extends string,
  carry extends Counter
> =
  A extends `${infer A_Digit}${infer A_Remaining}`
  
  ? // A has a digit
    B extends `${infer B_Digit}${infer B_Remaining}`
    ? // A and B both have a digit
      AppendCalculation<
        A_Remaining,
        B_Remaining,
        Calculate<[
          ...DigitToCounter<A_Digit>,
          ...DigitToCounter<B_Digit>,
          ...carry,
        ]>
      >

    : // A has a digit, but B does not
      AppendCalculation<
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
        AppendCalculation<
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

// type x = AddBinary<"1", "110101010111101"> // =>

/** this is an arbitrary precision add, which means it can return more bits than it was given (as in the case of an overflow) */
export type AddBinary<
  A extends string,
  B extends string
> = Satisfies<string,
  // we reverse the strings so we can add them from right to left
  // there's no simply way in TypeScript to pick a character off the end of a string
  // since we only do this three times (once for A, once for B, and once for the result)
  // it's really not significant performance-wise
  Reverse<
    StringAdd<
      Reverse<A>,
      Reverse<B>,
      []
    >
  >
>

export type I32AddBinary<
  a extends WasmValue,
  b extends WasmValue
> = Satisfies<WasmValue,
  Clamp.Last32Bits<
    AddBinary<a, b>
  >
>

export type I64AddBinary<
  a extends WasmValue,
  b extends WasmValue
> = Satisfies<WasmValue,
  Clamp.Last64Bits<
    AddBinary<a, b>
  >
>

export type I32AddDecimal<
  a extends number,
  b extends number,
> = Satisfies<number,
  Add<a, b>
>