import { I32AddBinary, I64AddBinary } from "./add";
import { ShiftLeftBinaryO, ShiftRightBinary, ShiftRightBinary64, ShiftLeftBinary64 } from "./shift";
import { BitwiseAndBinary, BitwiseOrBinary, BitwiseXorBinary, RotateLeft } from "./bitwise";
import { EqualsBinary, GreaterThanSignedBinary, GreaterThanUnsignedBinary, LessThanSignedBinary, LessThanUnsignedBinary, NotEqualsBinary } from "./comparison";
import { I32SubtractBinary, I64SubtractBinary } from "./subtract";
import { I32MultiplyBinary, I64MultiplyBinary } from "./multiply";
import { I64ExtendI32SBinary64, I64ExtendI32UBinary64 } from "./wasm-conversion";
import { I32ClzBinary, I64ClzBinary64 } from "./binary";
import { WrapBinary } from "./split";
import { Convert } from "./conversion";
import { DivideBinary32, RemainderBinary32 } from "./divide";

export type WasmType = 'i32' | 'i64' | 'f32' | 'f64';
export type WasmInt = 'i32' | 'i64';
export type WasmFloat = 'f32' | 'f64';

/**
 * This type is a wasm memory value.  Could be an item on the stack, or a global, or a byte in memory (or a few bytes)
 * this is a string with either 8, 16, 32 or 64 bits in binary
 */
export type WasmValue = string;

export namespace Wasm {
  /** 8 bits string (in binary) */
  export type Byte = string;
  export type I32True  = '00000000000000000000000000000001'
  export type I32False = '00000000000000000000000000000000'
  export type I64True  = '0000000000000000000000000000000000000000000000000000000000000001'
  export type I64False = '0000000000000000000000000000000000000000000000000000000000000000'

  export type I32Add<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    I32AddBinary<a, b>
  >

  export type I64Add<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    I64AddBinary<a, b>
  >

  export type I32Sub<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    I32SubtractBinary<a, b>
  >

  export type I64Sub<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    I64SubtractBinary<a, b>
  >

  export type I32Mul<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    I32MultiplyBinary<a, b>
  >

  export type I64Mul<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    I64MultiplyBinary<a, b>
  >

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
    ShiftLeftBinaryO<a, b>
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

  export type I64And<
    /** value to shift */
    a extends WasmValue,
    /** amount to shift by */
    b extends WasmValue
  > = Satisfies<WasmValue,
    BitwiseAndBinary<a, b>
  >

  export type I64Or<
    /** value to shift */
    a extends WasmValue,
    /** amount to shift by */
    b extends WasmValue
  > = Satisfies<WasmValue,
    BitwiseOrBinary<a, b>
  >

  export type I64Xor<
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

  export type I64GtU<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    GreaterThanUnsignedBinary<a, b>
  >

  export type I64GeU<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    EqualsBinary<a, b> extends I32True
    ? I32True
    : GreaterThanUnsignedBinary<a, b>
  >

  export type I64LtU<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    LessThanUnsignedBinary<a, b>
  >

  export type I64LeU<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    EqualsBinary<a, b> extends I32True
    ? I32True
    : LessThanUnsignedBinary<a, b>
  >


  export type I64GtS<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    GreaterThanSignedBinary<a, b>
  >

  export type I64GeS<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    EqualsBinary<a, b> extends I32True
    ? I32True
    : GreaterThanSignedBinary<a, b>
  >

  export type I64LtS<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    LessThanSignedBinary<a, b>
  >

  export type I64LeS<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    EqualsBinary<a, b> extends I32True
    ? I32True
    : LessThanSignedBinary<a, b>
  >

  export type I64Shl<
    /** value to shift */
    a extends WasmValue,
    /** amount to shift by */
    b extends WasmValue
  > = Satisfies<WasmValue,
    ShiftLeftBinary64<a, b, '0'>
  >

  export type I64ShrU<
    /** value to shift */
    a extends WasmValue,
    /** amount to shift by */
    b extends WasmValue
  > = Satisfies<WasmValue,
    ShiftRightBinary64<a, b, false>
  >

  export type I64ShrS<
    /** value to shift */
    a extends WasmValue,
    /** amount to shift by */
    b extends WasmValue
  > = Satisfies<WasmValue,
    ShiftRightBinary64<a, b, true>
  >

  export type I64ExtendI32U<
    a extends WasmValue
  > = Satisfies<WasmValue,
    I64ExtendI32UBinary64<a>
  >

  export type I64ExtendI32S<
    a extends WasmValue
  > = Satisfies<WasmValue,
    I64ExtendI32SBinary64<a>
  >

  export type I32Clz<
    a extends WasmValue
  > = Satisfies<WasmValue,
    I32ClzBinary<a>
  >

  export type I64Clz<
    a extends WasmValue
  > = Satisfies<WasmValue,
    I64ClzBinary64<a>
  >

  export type I32WrapI64<
    a extends WasmValue
  > = Satisfies<WasmValue,
    WrapBinary<a>
  >

  export type I32Rotl<
    a extends WasmValue,
    shiftBy extends WasmValue
  > = Satisfies<WasmValue,
    RotateLeft<
      a,
      Convert.WasmValue.ToTSNumber<shiftBy, 'i32'>
    >
  >

  export type I64Rotl<
    a extends WasmValue,
    shiftBy extends WasmValue
  > = Satisfies<WasmValue,
    RotateLeft<
      a,
      Convert.TSBigInt.ToTSNumber<
        Convert.WasmValue.ToTSBigInt<shiftBy>
      >
    >
  >

  export type I32DivS<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    DivideBinary32<a, b>
  >

  export type I32DivU<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    I32False
    // DivideBinary32<a, b>
  >

  export type I64DivS<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    I64False
    // DivideBinary64<a, b>
  >

  export type I64DivU<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    I64False
    // DivideBinary64<a, b>
  >

  export type I32RemS<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    RemainderBinary32<a, b>
  >

  export type I32RemU<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    I32False
    // RemainderBinary32<a, b>
  >

  export type I64RemS<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    I64False
    // RemainderBinary64<a, b>
  >

  export type I64RemU<
    a extends WasmValue,
    b extends WasmValue
  > = Satisfies<WasmValue,
    I64False
    // RemainderBinary64<a, b>
  >

}
