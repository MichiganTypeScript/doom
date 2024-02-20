import type { Ascii, U8Binary, U8Decimal } from "./conversion"
import type { Convert } from "./conversion"
import type { SplitToBytes } from "./split"
import type { WasmValue, Wasm } from "./wasm"

export type AsciiToU8Decimal<T extends string> =
  T extends `${infer Char extends Ascii}${infer Rest}`
  ? [Convert.Ascii.ToU8Decimal<Char>, ...AsciiToU8Decimal<Rest>]
  : [];

export type U8DecimalToAscii<T extends U8Decimal[]> =
  T extends [infer digit extends U8Decimal, ...infer rest extends U8Decimal[]]
  ? `${Convert.U8Decimal.ToAscii<digit>}${U8DecimalToAscii<rest>}`
  : '';

export type AsciiToU8Binary<T extends string> =
  T extends `${infer Char extends Ascii}${infer Rest}`
  ? [Convert.Ascii.ToU8Binary<Char>, ...AsciiToU8Binary<Rest>]
  : [];

export type U8BinaryToAscii<T extends U8Binary[]> =
  T extends [infer digit extends U8Binary, ...infer rest extends U8Binary[]]
  ? `${Convert.U8Binary.ToAscii<digit>}${U8BinaryToAscii<rest>}`
  : '';

export type _StoreString<
  Address extends WasmValue,
  T extends string,

  _Acc extends Record<WasmValue, string>
> = Satisfies<Record<WasmValue, string>,
  T extends `${infer Char extends Ascii}${infer Rest extends string}`
  ?
    _StoreString<
      Wasm.I32Add<Wasm.I32True, Address>,
      Rest,
      
      & _Acc
      & {
          [A in Address]:
            Convert.Ascii.ToU8Binary<Char>
            // Char
        }
    >
  : _Acc
>

export type StoreString<
  StartingAddress extends WasmValue,
  Input extends string
> = Satisfies<Record<WasmValue, string>,
  // QUESTION: why can't I use evaluate here??
  // evaluate<
    _StoreString<
      StartingAddress,
      Input,
      {}
    >
  // >
>

export namespace Store {
  export type I32<
    a extends WasmValue
  > = Satisfies<string[],
    SplitToBytes<a>
  >
}

