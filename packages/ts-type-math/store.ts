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
      evaluate<
        & _Acc
        & {
            [A in Address]:
              Convert.Ascii.ToU8Binary<Char>
          }
      >
    >
  : _Acc
>

export type StoreString<
  StartingAddress extends WasmValue,
  Input extends string
> = Satisfies<Record<WasmValue, string>,
  // evaluate< // QUESTION: why is there a memory leak if I evaluate here instead of in `_StoreString`?
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
  > = Satisfies<Wasm.Byte[],
    SplitToBytes<a>
  >

  // QUESTION: I need to get the _last_ 8 characters of a string.  is it better to do this or to use `SplitToBytes`?
  export type GetLSB<
    a extends WasmValue
  > = Satisfies<[Wasm.Byte],
    a extends `${infer b0}${infer b1}${infer b2}${infer b3}${infer b4}${infer b5}${infer b6}${infer b7}${infer b8}${infer b9}${infer b10}${infer b11}${infer b12}${infer b13}${infer b14}${infer b15}${infer b16}${infer b17}${infer b18}${infer b19}${infer b20}${infer b21}${infer b22}${infer b23}${infer b24}${infer b25}${infer b26}${infer b27}${infer b28}${infer b29}${infer b30}${infer b31}`
    ? [`${b24}${b25}${b26}${b27}${b28}${b29}${b30}${b31}`]
    : never
  >
}
