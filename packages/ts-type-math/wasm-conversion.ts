import { SignBit } from "./binary"
import { Convert } from "./conversion"
import { WasmValue } from "./wasm"
import type { Satisfies } from './utils'


type thirtyTwoZeros = '00000000000000000000000000000000'
type thirtyTwoOnes =  '11111111111111111111111111111111'

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
