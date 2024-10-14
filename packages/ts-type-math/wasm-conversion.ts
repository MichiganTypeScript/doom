import { SignBit } from "./binary"
import { Convert } from "./conversion"
import { WasmValue } from "./wasm"
import type { Satisfies } from './utils'


type sixteenZeros   = '0000000000000000'
type sixteenOnes    = '1111111111111111'
type thirtyTwoZeros = '00000000000000000000000000000000'
type thirtyTwoOnes  = '11111111111111111111111111111111'

export type I64ExtendI32UBinary64<
  a extends WasmValue
> = Satisfies<WasmValue,
  `${thirtyTwoZeros}${a}`
>

export type I64ExtendI32UDecimal<
  a extends number
> = Satisfies<bigint,
  Convert.WasmValue.ToTSBigInt<
    I64ExtendI32UBinary64<
      Convert.TSNumber.ToWasmValue<a, 'i32'>
    >
  >
>

export type I64ExtendI32SBinary64<
  a extends WasmValue
> = Satisfies<WasmValue,
  `${SignBit<a> extends '0' ? thirtyTwoZeros : thirtyTwoOnes}${a}`
>

export type I64ExtendI32SDecimal<
  a extends number
> = Satisfies<bigint,
  Convert.WasmValue.ToTSBigInt<
    I64ExtendI32SBinary64<
      Convert.TSNumber.ToWasmValue<a, 'i32'>
    >
  >
>

type s = string;

type SixteenDeep<
  a extends WasmValue,
> =
  a extends `${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${s}${infer b}${infer rest}`
  ? { sign: b; rest: rest }
  : never

export type I32Extend16SBinary32<
  a extends WasmValue,
> = Satisfies<WasmValue,
  SixteenDeep<a> extends { sign: infer sign extends '0' | '1'; rest: infer rest extends string }
  ? `${sign extends '0' ? sixteenZeros : sixteenOnes }${sign}${rest}`
  : never
>

export type I32Extend16SDecimal<
  a extends number
> = Satisfies<number,
  Convert.WasmValue.ToTSNumber<
    I32Extend16SBinary32<
      Convert.TSNumber.ToWasmValue<a, 'i32'>
    >,
    'i32'
  >
>
