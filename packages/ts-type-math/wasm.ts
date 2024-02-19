import { ClampDigits } from "./binary";
import { AddBinary } from "./add-binary";
import { ShiftLeftBinary, ShiftRightBinary } from "./shift";
import { BitwiseAndBinary, BitwiseOrBinary, BitwiseXorBinary } from "./bitwise";
import { EqualsBinary, GreaterThanSignedBinary, GreaterThanUnsignedBinary, LessThanSignedBinary, LessThanUnsignedBinary, NotEqualsBinary } from "./comparison";

export type WasmType = 'i32' | 'i64' | 'f32' | 'f64';
export type WasmInt = 'i32' | 'i64';
export type WasmFloat = 'f32' | 'f64';

/**
 * This type is a wasm memory value.  Could be an item on the stack, or a global, or a byte in memory (or a few bytes)
 * this is a string with either 8, 16, 32 or 64 bits in binary
 */
export type WasmValue = string;

export namespace Wasm {
  export type I32Add<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    ClampDigits<
      AddBinary<a, b>,
      32
    >
  >

  export type I32True  = '00000000000000000000000000000001'
  export type I32False = '00000000000000000000000000000000'
  export type I64True  = '0000000000000000000000000000000000000000000000000000000000000001'
  export type I64False = '0000000000000000000000000000000000000000000000000000000000000000'

  export type I32Eqz<
    a extends WasmValue
  > = Satisfies<WasmValue,
    a extends I32False ? I32True : I32False
  >

  export type I64Eqz<
    a extends WasmValue
  > = Satisfies<WasmValue,
    // note, even if it's an i64, it's still 32 bits that's returned
    a extends I64False ? I32True : I32False
  >

  export type I32Eq<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    EqualsBinary<a, b>
  >

  export type I64Eq<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    EqualsBinary<a, b>
  >

  export type I32Neq<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    NotEqualsBinary<a, b>
  >

  export type I64Neq<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    NotEqualsBinary<a, b>
  >

  export type I32Shl<
    /** value to shift */
    a extends WasmValue,
    /** amount to shift by */
    b extends WasmValue
  > = Satisfies<WasmValue,
    ShiftLeftBinary<a, b>
  >

  export type I32ShrU<
    /** value to shift */
    a extends WasmValue,
    /** amount to shift by */
    b extends WasmValue
  > = Satisfies<WasmValue,
    ShiftRightBinary<a, b, false>
  >

  export type I32ShrS<
    /** value to shift */
    a extends WasmValue,
    /** amount to shift by */
    b extends WasmValue
  > = Satisfies<WasmValue,
    ShiftRightBinary<a, b, true>
  >

  export type I32And<
    /** value to shift */
    a extends WasmValue,
    /** amount to shift by */
    b extends WasmValue
  > = Satisfies<WasmValue,
    BitwiseAndBinary<a, b>
  >

  export type I32Or<
    /** value to shift */
    a extends WasmValue,
    /** amount to shift by */
    b extends WasmValue
  > = Satisfies<WasmValue,
    BitwiseOrBinary<a, b>
  >

  export type I32Xor<
    /** value to shift */
    a extends WasmValue,
    /** amount to shift by */
    b extends WasmValue
  > = Satisfies<WasmValue,
    BitwiseXorBinary<a, b>
  >

  export type I32GtU<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    GreaterThanUnsignedBinary<a, b>
  >

  export type I32GeU<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    EqualsBinary<a, b> extends I32True
    ? I32True
    : GreaterThanUnsignedBinary<a, b>
  >

  export type I32LtU<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    LessThanUnsignedBinary<a, b>
  >

  export type I32LeU<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    EqualsBinary<a, b> extends I32True
    ? I32True
    : LessThanUnsignedBinary<a, b>
  >


  export type I32GtS<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    GreaterThanSignedBinary<a, b>
  >

  export type I32GeS<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    EqualsBinary<a, b> extends I32True
    ? I32True
    : GreaterThanSignedBinary<a, b>
  >

  export type I32LtS<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    LessThanSignedBinary<a, b>
  >

  export type I32LeS<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    EqualsBinary<a, b> extends I32True
    ? I32True
    : LessThanSignedBinary<a, b>
  >
}
