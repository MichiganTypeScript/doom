import { ReverseString, SignBit, To32Binary, ToDecimalUnsigned } from "./binary";

/** inputs are unsigned Decimal32, under the hood is binary */
export type ShiftLeft<
  Decimal extends number,
  Shift extends number
> = Satisfies<number,
  ToDecimalUnsigned<
    ShiftLeftBinary<
      To32Binary<Decimal>,
      Shift
    >
  >
>

// lol
// Array.from(Array(32)).map((_ ,index) => index).map(index => `    ${index} extends Shift ? (Bits extends \`${"${string}".repeat(index)}\${infer R}\` ? \`\${R}${"0".repeat(index)}\` : never) :`).join("\n")
/** input must be a Binary32 */
export type ShiftLeftBinary<
  Bits extends string,
  Shift extends number
> = Satisfies<string,
  0  extends Shift ? Bits :
  1  extends Shift ? (Bits extends `${string}${infer R}` ? `${R}0` : never) :
  2  extends Shift ? (Bits extends `${string}${string}${infer R}` ? `${R}00` : never) :
  3  extends Shift ? (Bits extends `${string}${string}${string}${infer R}` ? `${R}000` : never) :
  4  extends Shift ? (Bits extends `${string}${string}${string}${string}${infer R}` ? `${R}0000` : never) :
  5  extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${infer R}` ? `${R}00000` : never) :
  6  extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000` : never) :
  7  extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000` : never) :
  8  extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000` : never) :
  9  extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000` : never) :
  10 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000` : never) :
  11 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000` : never) :
  12 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000` : never) :
  13 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000` : never) :
  14 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000000` : never) :
  15 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000000` : never) :
  16 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000000` : never) :
  17 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000000000` : never) :
  18 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000000000` : never) :
  19 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000000000` : never) :
  20 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000000000000` : never) :
  21 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000000000000` : never) :
  22 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000000000000` : never) :
  23 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000000000000000` : never) :
  24 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000000000000000` : never) :
  25 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000000000000000` : never) :
  26 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000000000000000000` : never) :
  27 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000000000000000000` : never) :
  28 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000000000000000000` : never) :
  29 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}00000000000000000000000000000` : never) :
  30 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}000000000000000000000000000000` : never) :
  31 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}0000000000000000000000000000000` : never) :
  32 extends Shift ? Bits :
  never
>

export type ShiftLeftBinaryFill1<
  Bits extends string,
  Shift extends number
> = Satisfies<string,
  0  extends Shift ? Bits :
  1  extends Shift ? (Bits extends `${string}${infer R}` ? `${R}1` : never) :
  2  extends Shift ? (Bits extends `${string}${string}${infer R}` ? `${R}11` : never) :
  3  extends Shift ? (Bits extends `${string}${string}${string}${infer R}` ? `${R}111` : never) :
  4  extends Shift ? (Bits extends `${string}${string}${string}${string}${infer R}` ? `${R}1111` : never) :
  5  extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${infer R}` ? `${R}11111` : never) :
  6  extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111` : never) :
  7  extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111` : never) :
  8  extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111` : never) :
  9  extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111` : never) :
  10 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111` : never) :
  11 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111` : never) :
  12 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111` : never) :
  13 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111` : never) :
  14 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111111` : never) :
  15 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111111` : never) :
  16 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111111` : never) :
  17 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111111111` : never) :
  18 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111111111` : never) :
  19 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111111111` : never) :
  20 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111111111111` : never) :
  21 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111111111111` : never) :
  22 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111111111111` : never) :
  23 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111111111111111` : never) :
  24 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111111111111111` : never) :
  25 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111111111111111` : never) :
  26 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111111111111111111` : never) :
  27 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111111111111111111` : never) :
  28 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111111111111111111` : never) :
  29 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}11111111111111111111111111111` : never) :
  30 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}111111111111111111111111111111` : never) :
  31 extends Shift ? (Bits extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${infer R}` ? `${R}1111111111111111111111111111111` : never) :
  32 extends Shift ? Bits :
  never
>


/** inputs are unsigned Decimal32, under the hood is binary */
export type ShiftRight<
  Decimal extends number,
  Shift extends number,
  Signed extends boolean
> = Satisfies<number,
  ToDecimalUnsigned<
    ShiftRightBinary<
      To32Binary<Decimal>,
      Shift,
      Signed
    >
  >
>

// lol
// Array.from(Array(32)).map((_ ,index) => index).map(index => `    ${index} extends Shift ? (Bits extends \`${"${s}".repeat(index)}\${infer R}\` ? \`\${R}${"0".repeat(index)}\` : never) :`).join("\n")

/** input must be a Binary32 */
export type ShiftRightBinary<
  Bits extends string,
  Shift extends number,
  Signed extends boolean,

  Rev extends string = ReverseString<Bits>
> = Satisfies<string,
  0 extends Shift
  ? Bits
  : // first check if this is a signed shift and we're supposed to be
    [Signed, SignBit<Bits>] extends [true, "1"]
    ? ReverseString<ShiftLeftBinaryFill1<Rev, Shift>>
    : ReverseString<ShiftLeftBinary<Rev, Shift>>
>

//
// 10000000000000000000000000000010 start
// 01000000000000000000000000000001 reverse
// 10000000000000000000000000000010 shift left by 1 and fill with 0
// 01000000000000000000000000000001 reverse back
