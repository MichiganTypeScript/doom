import { Ascii, U8Binary, U8Decimal } from "./conversion.js";
import { Convert } from "./conversion.js";
import type { Add } from './hotscript-fork/numbers/impl/addition.js';

type AsciiToU8Decimal<T extends string> =
  T extends `${infer Char extends Ascii}${infer Rest}`
  ? [Convert.Ascii.ToU8Decimal<Char>, ...AsciiToU8Decimal<Rest>]
  : [];

type U8DecimalToAscii<T extends U8Decimal[]> =
  T extends [infer digit extends U8Decimal, ...infer rest extends U8Decimal[]]
  ? `${Convert.U8Decimal.ToAscii<digit>}${U8DecimalToAscii<rest>}`
  : '';

type AsciiToU8Binary<T extends string> =
  T extends `${infer Char extends Ascii}${infer Rest}`
  ? [Convert.Ascii.ToU8Binary<Char>, ...AsciiToU8Binary<Rest>]
  : [];

type U8BinaryToAscii<T extends U8Binary[]> =
  T extends [infer digit extends U8Binary, ...infer rest extends U8Binary[]]
  ? `${Convert.U8Binary.ToAscii<digit>}${U8BinaryToAscii<rest>}`
  : '';

type dtoa = U8DecimalToAscii<AsciiToU8Decimal<"from ascii to decimal and back">>;
//   ^?

type atod = U8BinaryToAscii<AsciiToU8Binary<"from ascii to binary and back">>;
//   ^?

type _StoreString<
  Index extends number,
  T extends string,

  _Acc extends Record<number, string> = {},

  RESULT extends Record<number, string> =
    T extends `${infer Char extends Ascii}${infer Rest extends string}`
    ?
      _StoreString<
        Add<1, Index>,
        Rest,
        
        & _Acc
        & {
            [I in Index]:
              Convert.Ascii.ToU8Decimal<Char>
              // Char
          }
      >
    : _Acc
> = RESULT

export type evaluate<T> = {
  [K in keyof T]: T[K]
} & unknown

export type StoreString<
  StartingIndex extends number,
  Input extends string,

  RESULT extends Record<number, string> =
    evaluate<
      _StoreString<
        StartingIndex,
        Input
      >
    >
> = RESULT;

type x = StoreString<1024, "Let's hope this works..">;
//   ^?
type y = StoreString<2048, "but it prolly wont">;

type Cast<T, U> = T extends U ? T : U;

export type ReadUntilNullTerminator<
  memory extends Record<number, U8Decimal>,

  address extends number,

  RESULT extends string =
    memory[address] extends infer Char
    ? Char extends '\0'
      ? ''
      : `${
          Convert.U8Decimal.ToAscii<Cast<Char, U8Decimal>>
        }${
          ReadUntilNullTerminator<memory, Add<1, address>>
        }`
    : never

> = RESULT;

export type ReadMemory<
  state extends {
    stack: number[]
    memory: Record<number, U8Decimal>
  },

  _startAddress extends number =
    state['stack'][0],

  RESULT extends string =
    ReadUntilNullTerminator<
      state['memory'],
      _startAddress
    >
> = RESULT