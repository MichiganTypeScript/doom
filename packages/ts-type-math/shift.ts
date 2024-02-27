import { ReverseString, SignBit, To32Binary, ToDecimalSigned, ToDecimalUnsigned, ToDecimalUnsignedBigInt } from "./binary";
import { RepeatBigInt } from "./hotscript-fork/strings/impl/repeat";
import { Wasm, WasmValue } from "./wasm";

/** inputs are unsigned Decimal32, under the hood is binary */
export type ShiftLeft<
  Decimal extends number,
  Shift extends number
> = Satisfies<number,
  ToDecimalUnsigned<
    ShiftLeftBinaryO<
      To32Binary<Decimal>,
      '',
      Shift
    >
  >
>

// lol
// Array.from(Array(32)).map((_ ,index) => index).map(index => `    ${index} extends Shift ? (a extends \`${"${string}".repeat(index)}\${infer R}\` ? \`\${R}${"0".repeat(index)}\` : never) :`).join("\n")
/** input must be a Binary32 */
export type ShiftLeftBinaryO<
  a extends string,
  Shift extends string,
  s extends number = ToDecimalUnsigned<Shift>
> = Satisfies<string,
   0 extends s ? a :
   1 extends s ? (a extends `${string}${infer R}` ? `${R}0` : never) :
   2 extends s ? (a extends `${string}${string}${infer R}` ? `${R}00` : never) :
   3 extends s ? (a extends `${string}${string}${string}${infer R}` ? `${R}000` : never) :
   4 extends s ? (a extends `${string}${string}${string}${string}${infer R}` ? `${R}0000` : never) :
   5 extends s ? (a extends `${string}${string}${string}${string}${string}${infer R}` ? `${R}00000` : never) :
   6 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000` : never) :
   7 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000` : never) :
   8 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000` : never) :
   9 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000` : never) :
  10 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000` : never) :
  11 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000` : never) :
  12 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000` : never) :
  13 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000` : never) :
  14 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000000` : never) :
  15 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000000` : never) :
  16 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000000` : never) :
  17 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000000000` : never) :
  18 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000000000` : never) :
  19 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000000000` : never) :
  20 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000000000000` : never) :
  21 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000000000000` : never) :
  22 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000000000000` : never) :
  23 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000000000000000` : never) :
  24 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000000000000000` : never) :
  25 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000000000000000` : never) :
  26 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000000000000000000` : never) :
  27 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000000000000000000` : never) :
  28 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000000000000000000` : never) :
  29 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000000000000000000000` : never) :
  30 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000000000000000000000` : never) :
  31 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000000000000000000000` : never) :
  32 extends s ? a :
  never
>

export type ShiftLeftBinary1<
  a extends string,
  Shift extends string,
  s extends number = ToDecimalUnsigned<Shift>
> = Satisfies<string,
   0 extends s ? a :
   1 extends s ? (a extends `${string}${infer R}` ? `${R}1` : never) :
   2 extends s ? (a extends `${string}${string}${infer R}` ? `${R}11` : never) :
   3 extends s ? (a extends `${string}${string}${string}${infer R}` ? `${R}111` : never) :
   4 extends s ? (a extends `${string}${string}${string}${string}${infer R}` ? `${R}1111` : never) :
   5 extends s ? (a extends `${string}${string}${string}${string}${string}${infer R}` ? `${R}11111` : never) :
   6 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111` : never) :
   7 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111` : never) :
   8 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111` : never) :
   9 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111` : never) :
  10 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111` : never) :
  11 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111` : never) :
  12 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111` : never) :
  13 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111` : never) :
  14 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111111` : never) :
  15 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111111` : never) :
  16 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111111` : never) :
  17 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111111111` : never) :
  18 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111111111` : never) :
  19 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111111111` : never) :
  20 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111111111111` : never) :
  21 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111111111111` : never) :
  22 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111111111111` : never) :
  23 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111111111111111` : never) :
  24 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111111111111111` : never) :
  25 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111111111111111` : never) :
  26 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111111111111111111` : never) :
  27 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111111111111111111` : never) :
  28 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111111111111111111` : never) :
  29 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111111111111111111111` : never) :
  30 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111111111111111111111` : never) :
  31 extends s ? (a extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111111111111111111111` : never) :
  32 extends s ? a :
  never
>


/** inputs are unsigned Decimal32, under the hood is binary */
export type ShiftRight<
  Decimal extends number,
  Shift extends number,
  Signed extends boolean
> = Satisfies<number,
  ToDecimalSigned<
    ShiftRightBinary<
      To32Binary<Decimal>,
      To32Binary<Shift>,
      Signed
    >
  >
>

// lol
// Array.from(Array(32)).map((_ ,index) => index).map(index => `    ${index} extends Shift ? (a extends \`${"${s}".repeat(index)}\${infer R}\` ? \`\${R}${"0".repeat(index)}\` : never) :`).join("\n")

/** input must be a Binary32 */
export type ShiftRightBinary<
  a extends WasmValue,
  Shift extends WasmValue,
  Signed extends boolean,

  Rev extends string = ReverseString<a>
> = Satisfies<WasmValue,
  Wasm.I32False extends Shift
  ? a
  : // first check if this is a signed shift and we're supposed to be
    [Signed, SignBit<a>] extends [true, "1"]
    ? ReverseString<ShiftLeftBinary1<Rev, Shift>>
    : ReverseString<ShiftLeftBinaryO<Rev, Shift>>
>

type r = RepeatBigInt<'a', 13n> // =>
type a = '0000000000000000000000000000000000000000001001011010110100001110'
type b = '0000000000000000000000000000000000000000000000000000000000000001'
type x = ShiftLeftBinary64<a, b, '0'> // =>

export type ShiftLeftBinary64<
  a extends WasmValue,
  shiftBy extends WasmValue,
  shiftWith extends '0' | '1',

  _shiftBy extends bigint = ToDecimalUnsignedBigInt<shiftBy>,
> = Satisfies<string,
  ''
  // _shiftBy extends 0n
  // ? a
  // : `${a}${RepeatBigInt<shiftWith, _shiftBy>}`
>

export type ShiftRightBinary64<
  a extends WasmValue,
  Shift extends WasmValue,
  Signed extends boolean,

  Rev extends string = ReverseString<a>
> = Satisfies<WasmValue,
  ''
  // Wasm.I64False extends Shift
  // ? a
  // : // first check if this is a signed shift and we're supposed to be
  //   [Signed, SignBit<a>] extends [true, "1"]
  //   ? ReverseString<
  //       ShiftLeftBinary64<
  //         Rev,
  //         Shift,
  //         '1'
  //       >
  //     >
  //   : ReverseString<
  //       ShiftLeftBinary64<
  //         Rev,
  //         Shift,
  //         '0'
  //       >
  //     >
>
