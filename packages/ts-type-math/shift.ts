import { ReverseString8Segments, SignBit, To32Binary, ToDecimalSigned, ToDecimalSignedBigInt, ToDecimalUnsigned, ToDecimalUnsignedBigInt } from "./binary";
import { Wasm, WasmValue } from "./wasm";
import type { Convert } from './conversion';
import { Clamp } from "./split";

/** inputs are unsigned Decimal32, under the hood is binary */
export type ShiftLeft<
  Decimal extends number,
  Shift extends number
> = Satisfies<number,
  Shift extends 0
  ? Decimal
  : ToDecimalUnsigned<
      ShiftLeftBinaryO<
        To32Binary<Decimal>,
        '',
        Shift
      >
    >
>

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


/** input must be a Binary32 */
export type ShiftRightBinary<
  a extends WasmValue,
  Shift extends WasmValue,
  Signed extends boolean,

  Rev extends string = ReverseString8Segments<a>
> = Satisfies<WasmValue,
  Wasm.I32False extends Shift
  ? a
  : // first check if this is a signed shift and we're supposed to be
    [Signed, SignBit<a>] extends [true, "1"]
    ? ReverseString8Segments<ShiftLeftBinary1<Rev, Shift>>
    : ReverseString8Segments<ShiftLeftBinaryO<Rev, Shift>>
>

// type b = '0000000000000000000000000000000000000000000000000000000000000001'
// type a = '1111111111111111111111111111111110000000000000000000000000000010'
// type e = '1111111111111111111111111111111100000000000000000000000000000100'
// type x = ShiftLeftBinary64<a, b, '0'> // =>

export type ShiftLeftBigInt<
  Decimal extends bigint,
  Shift extends bigint
> = Satisfies<bigint,
  ToDecimalSignedBigInt<
    ShiftLeftBinary64<
      Convert.TSBigInt.ToWasmValue<Decimal>,
      Convert.TSBigInt.ToWasmValue<Shift>
    >
  >
>

export type ShiftLeftBinary64<
  a extends WasmValue,
  shiftBy extends WasmValue,

  /** strictly speaking, ShiftLeft doesn't need this, but since the ShiftRight (signed and unsigned) implementations use this, it's here as an option */
  shiftWith extends '0' | '1' = '0',

  lookup =
    shiftWith extends '0'
    ? Convert.WasmValue.ToTSNumber<shiftBy, 'i32'>
    : Convert.WasmValue.ToTSNumber<shiftBy, 'i32'>,

  _fill extends string =
    shiftWith extends '0'
    ? Repeat0Lookup[lookup & keyof Repeat0Lookup]
    : Repeat1Lookup[lookup & keyof Repeat1Lookup]

> = Satisfies<string,
  shiftBy extends Wasm.I64False
  ? a
  : Clamp.Last64Bits<`${a}${_fill}`>
>

export type ShiftRightBinary64<
  a extends WasmValue,
  Shift extends WasmValue,
  Signed extends boolean,

  Rev extends string = ReverseString8Segments<a>
> = Satisfies<WasmValue,
  Shift extends Wasm.I64False
  ? a
  : // first check if this is a signed shift and we're supposed to be
    [Signed, SignBit<a>] extends [true, "1"]
    ? ReverseString8Segments<
        ShiftLeftBinary64<
          Rev,
          Shift,
          '1'
        >
      >
    : ReverseString8Segments<
        ShiftLeftBinary64<
          Rev,
          Shift,
          '0'
        >
      >
>

/** inputs are unsigned Decimal32, under the hood is binary */
export type ShiftRightBigInt<
  Decimal extends bigint,
  Shift extends bigint,
  Signed extends boolean
> = Satisfies<bigint,
  Convert.WasmValue.ToTSBigInt<
    ShiftRightBinary64<
      Convert.TSBigInt.ToWasmValue<Decimal>,
      Convert.TSBigInt.ToWasmValue<Shift>,
      Signed
    >
  >
>

type Repeat0Lookup = {
   0: '';
   1: '0';
   2: '00';
   3: '000';
   4: '0000';
   5: '00000';
   6: '000000';
   7: '0000000';
   8: '00000000';
   9: '000000000';
  10: '0000000000';
  11: '00000000000';
  12: '000000000000';
  13: '0000000000000';
  14: '00000000000000';
  15: '000000000000000';
  16: '0000000000000000';
  17: '00000000000000000';
  18: '000000000000000000';
  19: '0000000000000000000';
  20: '00000000000000000000';
  21: '000000000000000000000';
  22: '0000000000000000000000';
  23: '00000000000000000000000';
  24: '000000000000000000000000';
  25: '0000000000000000000000000';
  26: '00000000000000000000000000';
  27: '000000000000000000000000000';
  28: '0000000000000000000000000000';
  29: '00000000000000000000000000000';
  30: '000000000000000000000000000000';
  31: '0000000000000000000000000000000';
  32: '00000000000000000000000000000000';
  33: '000000000000000000000000000000000';
  34: '0000000000000000000000000000000000';
  35: '00000000000000000000000000000000000';
  36: '000000000000000000000000000000000000';
  37: '0000000000000000000000000000000000000';
  38: '00000000000000000000000000000000000000';
  39: '000000000000000000000000000000000000000';
  40: '0000000000000000000000000000000000000000';
  41: '00000000000000000000000000000000000000000';
  42: '000000000000000000000000000000000000000000';
  43: '0000000000000000000000000000000000000000000';
  44: '00000000000000000000000000000000000000000000';
  45: '000000000000000000000000000000000000000000000';
  46: '0000000000000000000000000000000000000000000000';
  47: '00000000000000000000000000000000000000000000000';
  48: '000000000000000000000000000000000000000000000000';
  49: '0000000000000000000000000000000000000000000000000';
  50: '00000000000000000000000000000000000000000000000000';
  51: '000000000000000000000000000000000000000000000000000';
  52: '0000000000000000000000000000000000000000000000000000';
  53: '00000000000000000000000000000000000000000000000000000';
  54: '000000000000000000000000000000000000000000000000000000';
  55: '0000000000000000000000000000000000000000000000000000000';
  56: '00000000000000000000000000000000000000000000000000000000';
  57: '000000000000000000000000000000000000000000000000000000000';
  58: '0000000000000000000000000000000000000000000000000000000000';
  59: '00000000000000000000000000000000000000000000000000000000000';
  60: '000000000000000000000000000000000000000000000000000000000000';
  61: '0000000000000000000000000000000000000000000000000000000000000';
  62: '00000000000000000000000000000000000000000000000000000000000000';
  63: '000000000000000000000000000000000000000000000000000000000000000';
  64: '0000000000000000000000000000000000000000000000000000000000000000';
}

type Repeat1Lookup = {
   0: '';
   1: '1';
   2: '11';
   3: '111';
   4: '1111';
   5: '11111';
   6: '111111';
   7: '1111111';
   8: '11111111';
   9: '111111111';
  10: '1111111111';
  11: '11111111111';
  12: '111111111111';
  13: '1111111111111';
  14: '11111111111111';
  15: '111111111111111';
  16: '1111111111111111';
  17: '11111111111111111';
  18: '111111111111111111';
  19: '1111111111111111111';
  20: '11111111111111111111';
  21: '111111111111111111111';
  22: '1111111111111111111111';
  23: '11111111111111111111111';
  24: '111111111111111111111111';
  25: '1111111111111111111111111';
  26: '11111111111111111111111111';
  27: '111111111111111111111111111';
  28: '1111111111111111111111111111';
  29: '11111111111111111111111111111';
  30: '111111111111111111111111111111';
  31: '1111111111111111111111111111111';
  32: '11111111111111111111111111111111';
  33: '111111111111111111111111111111111';
  34: '1111111111111111111111111111111111';
  35: '11111111111111111111111111111111111';
  36: '111111111111111111111111111111111111';
  37: '1111111111111111111111111111111111111';
  38: '11111111111111111111111111111111111111';
  39: '111111111111111111111111111111111111111';
  40: '1111111111111111111111111111111111111111';
  41: '11111111111111111111111111111111111111111';
  42: '111111111111111111111111111111111111111111';
  43: '1111111111111111111111111111111111111111111';
  44: '11111111111111111111111111111111111111111111';
  45: '111111111111111111111111111111111111111111111';
  46: '1111111111111111111111111111111111111111111111';
  47: '11111111111111111111111111111111111111111111111';
  48: '111111111111111111111111111111111111111111111111';
  49: '1111111111111111111111111111111111111111111111111';
  50: '11111111111111111111111111111111111111111111111111';
  51: '111111111111111111111111111111111111111111111111111';
  52: '1111111111111111111111111111111111111111111111111111';
  53: '11111111111111111111111111111111111111111111111111111';
  54: '111111111111111111111111111111111111111111111111111111';
  55: '1111111111111111111111111111111111111111111111111111111';
  56: '11111111111111111111111111111111111111111111111111111111';
  57: '111111111111111111111111111111111111111111111111111111111';
  58: '1111111111111111111111111111111111111111111111111111111111';
  59: '11111111111111111111111111111111111111111111111111111111111';
  60: '111111111111111111111111111111111111111111111111111111111111';
  61: '1111111111111111111111111111111111111111111111111111111111111';
  62: '11111111111111111111111111111111111111111111111111111111111111';
  63: '111111111111111111111111111111111111111111111111111111111111111';
  64: '1111111111111111111111111111111111111111111111111111111111111111';
}