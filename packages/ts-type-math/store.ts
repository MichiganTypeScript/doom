import { To32Binary } from "./binary";
import type { Ascii, U8Binary, U8Decimal } from "./conversion"
import type { Convert } from "./conversion"
import type { Add } from './hotscript-fork/numbers/impl/addition'
import type { SplitToBytes } from "./split"

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
  Index extends number,
  T extends string,

  _Acc extends Record<number, string> = {}
> = Satisfies<Record<number, string>,
  T extends `${infer Char extends Ascii}${infer Rest extends string}`
  ?
    _StoreString<
      Add<1, Index>,
      Rest,
      
      & _Acc
      & {
          [I in Index]:
            Convert.Ascii.ToU8Binary<Char>
            // Char
        }
    >
  : _Acc
>

export type evaluate<T> = {
  [K in keyof T]: T[K]
} & unknown

export type StoreString<
  StartingIndex extends number,
  Input extends string
> = Satisfies<Record<number, string>,
  evaluate<
    _StoreString<
      StartingIndex,
      Input
    >
  >
>

export namespace Store {
  export type I32<
    i32 extends number
  > = Satisfies<string[],
    SplitToBytes<
      To32Binary<i32>
    >
  >
}

