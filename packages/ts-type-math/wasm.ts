import { ClampDigits } from "./binary";
import { AddBinary } from "./add-binary";
import { ShiftLeftBinary, ShiftRightBinary } from "./shift";

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
    a extends I64False ? I64True : I64False
  >

  export type I32Eq<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    a extends b ? I32True : I32False
  >

  export type I64Eq<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    a extends b ? I64True : I64False
  >

  export type I32Neq<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    a extends b ? I32False : I32True
  >

  export type I64Neq<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    a extends b ? I64False : I64True
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
}
