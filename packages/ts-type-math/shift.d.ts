import { To32Binary, ToDecimal } from "./binary";

type s = string;

/** inputs are unsigned Decimal32, under the hood is binary */
export type ShiftLeft<
  Decimal extends number,
  Shift extends number,
  RESULT extends number =
    ToDecimal<
      ShiftLeftBinary<
        To32Binary<Decimal>,
        Shift
      >
    >
> = RESULT

/** input must be a Binary32 */
export type ShiftLeftBinary<
  Bits extends string,
  Shift extends number,

  // lol
  // Array.from(Array(32)).map((_ ,index) => index).map(index => `    ${index} extends Shift ? (Bits extends \`${"${s}".repeat(index)}\${infer R}\` ? \`\${R}${"0".repeat(index)}\` : never) :`).join("\n")

  RESULT extends string =
    0 extends Shift ? Bits :
    0 extends Shift ? (Bits extends `${infer R}` ? `${R}` : never) :
    1 extends Shift ? (Bits extends `${s}${infer R}` ? `${R}0` : never) :
    2 extends Shift ? (Bits extends `${s}${s}${infer R}` ? `${R}00` : never) :
    3 extends Shift ? (Bits extends `${s}${s}${s}${infer R}` ? `${R}000` : never) :
    4 extends Shift ? (Bits extends `${s}${s}${s}${s}${infer R}` ? `${R}0000` : never) :
    5 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${infer R}` ? `${R}00000` : never) :
    6 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}000000` : never) :
    7 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}0000000` : never) :
    8 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}00000000` : never) :
    9 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}000000000` : never) :
    10 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}0000000000` : never) :
    11 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}00000000000` : never) :
    12 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}000000000000` : never) :
    13 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}0000000000000` : never) :
    14 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}00000000000000` : never) :
    15 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}000000000000000` : never) :
    16 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}0000000000000000` : never) :
    17 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}00000000000000000` : never) :
    18 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}000000000000000000` : never) :
    19 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}0000000000000000000` : never) :
    20 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}00000000000000000000` : never) :
    21 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}000000000000000000000` : never) :
    22 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}0000000000000000000000` : never) :
    23 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}00000000000000000000000` : never) :
    24 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}000000000000000000000000` : never) :
    25 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}0000000000000000000000000` : never) :
    26 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}00000000000000000000000000` : never) :
    27 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}000000000000000000000000000` : never) :
    28 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}0000000000000000000000000000` : never) :
    29 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}00000000000000000000000000000` : never) :
    30 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}000000000000000000000000000000` : never) :
    31 extends Shift ? (Bits extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer R}` ? `${R}0000000000000000000000000000000` : never) :
    32 extends Shift ? "00000000000000000000000000000000" :
    never

> = RESULT
