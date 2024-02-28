import { Pad, ReverseString, SignBit } from "./binary";
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
    ReverseString<a> extends `${infer b00}${infer b01}${infer b02}${infer b03}${infer b04}${infer b05}${infer b06}${infer b07}${infer Tail}`
    ? [`${b07}${b06}${b05}${b04}${b03}${b02}${b01}${b00}`]
    : never
  >

  export type GoodLuckBro<
    a extends WasmValue,
    count extends 8 | 16 | 32 | 64
  > = Satisfies<Wasm.Byte[],
    SplitToBytes<
      GetLast<a, count>
    >
  >

  type _GetLast<
    rev extends string,
    count extends number,
    _Acc extends string = '',
    _Count extends 1[] = []
  > = Satisfies<string,
    count extends _Count['length']
    ? _Acc
    : rev extends `${infer Head}${infer Tail}`
      ? _GetLast<
          Tail,
          count,
          `${Head}${_Acc}`, // we add on the start because it's already been reversed and we don't want to have to bother reversing it again
          [..._Count, 1] // increment the counter
        >
      : never // this will only happen if the requested count is greater than the number of characters in the string and the string has been exhausted
  >

  export type GetLast<
    a extends string,
    count extends number,
  > = Satisfies<string,
    _GetLast<ReverseString<a>, count>
  >

  export type SignedFill<
    a extends string,
    fillSize extends 8 | 16 | 24 | 32 | 48 | 56
  > = Satisfies<string,
    SignBit<a> extends '1'

    ? // we got ourselves a negative number
      fillSize extends 8 ? Pad.StartWith8Ones<a> :
      fillSize extends 16 ? Pad.StartWith16Ones<a> :
      fillSize extends 24 ? Pad.StartWith24Ones<a> :
      fillSize extends 32 ? Pad.StartWith32Ones<a> :
      fillSize extends 48 ? Pad.StartWith48Ones<a> :
      fillSize extends 56 ? Pad.StartWith56Ones<a> :
      never

    : // this number is positive, just like DoomGuy's outlook on life
      fillSize extends 8 ? Pad.StartWith8Zeros<a> :
      fillSize extends 16 ? Pad.StartWith16Zeros<a> :
      fillSize extends 24 ? Pad.StartWith24Zeros<a> :
      fillSize extends 32 ? Pad.StartWith32Zeros<a> :
      fillSize extends 48 ? Pad.StartWith48Zeros<a> :
      fillSize extends 56 ? Pad.StartWith56Zeros<a> :
      never
  >
}
