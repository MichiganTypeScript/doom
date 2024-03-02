import { Bit, To32Binary, ToDecimalSigned } from "./binary";
import { WasmValue } from "./wasm";

type LookupBitAnd = {
  '0': {
    '0': '0';
    '1': '0';
  };
  '1': {
    '0': '0';
    '1': '1';
  };
}

type LookupBitOr = {
  '0': {
    '0': '0';
    '1': '1';
  };
  '1': {
    '0': '1';
    '1': '1';
  };
}

type LookupBitXor = {
  '0': {
    '0': '0';
    '1': '1';
  };
  '1': {
    '0': '1';
    '1': '0';
  };
}

// QUESTION maybe don't make Lookup generic for better performance?
type ProcessLookup<
  A extends string,
  B extends string,
  Lookup extends Record<Bit, Record<Bit, Bit>>,
> =
  A extends `${infer AHead extends Bit}${infer ATail extends string}`
  ? B extends `${infer BHead extends Bit}${infer BTail extends string}`
    ? `${Lookup[AHead][BHead]}${ProcessLookup<ATail, BTail, Lookup>}`

    : // B is empty
      ''

  : // A is empty
    ''

export type BitwiseAnd<
  T extends number,
  U extends number
> = ToDecimalSigned<BitwiseAndBinary<To32Binary<T>, To32Binary<U>>>

export type BitwiseAndBinary<
  T extends string,
  U extends string
> = ProcessLookup<T, U, LookupBitAnd>

export type BitwiseOr<
  T extends number,
  U extends number
> = ToDecimalSigned<BitwiseOrBinary<To32Binary<T>, To32Binary<U>>>

export type BitwiseOrBinary<
  T extends string,
  U extends string
> = ProcessLookup<T, U, LookupBitOr>

export type BitwiseXor<
  T extends number,
  U extends number
> = ToDecimalSigned<BitwiseXorBinary<To32Binary<T>, To32Binary<U>>>

export type BitwiseXorBinary<
  T extends string,
  U extends string
> = ProcessLookup<T, U, LookupBitXor>

type _BitwiseNotBinary<
  T extends string,
  _Acc extends string
> =
  T extends `${infer Head}${infer Tail}`
  ? _BitwiseNotBinary<Tail, `${_Acc}${Head extends '0' ? '1' : '0'}`>
  : _Acc

export type BitwiseNotBinary<
  T extends string
> = _BitwiseNotBinary<T, ''>

export type BitwiseNot<
  T extends number
> = ToDecimalSigned<BitwiseNotBinary<To32Binary<T>>>

export type RotateLeft<
  T extends WasmValue,
  ShiftBy extends number
> = Satisfies<WasmValue,
  LeftRotateString<T, ShiftBy>
>

type LeftRotateString<
  T extends string,
  N extends number,

  _Count extends 1[] = []
> =
  _Count['length'] extends N
    ? T
    : T extends `${infer A}${infer Rest}`
      ? LeftRotateString<
          `${Rest}${A}`,
          N,
          [..._Count, 1]
        >
      : never;