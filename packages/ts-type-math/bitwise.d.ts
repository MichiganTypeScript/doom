import { Bit, To32Binary, ToDecimal } from "./binary";

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

type ProcessLookup<
  A extends string,
  B extends string,
  Lookup extends Record<Bit, Record<Bit, Bit>>,
> =
  A extends `${infer AHead extends Bit}${infer ATail extends string}`
  ? B extends `${infer BHead extends Bit}${infer BTail extends string}`
    ? `${Lookup[AHead][BHead]}${ProcessLookup<ATail, BTail, Lookup>}`
    : never // should always be equal number of digits
  : ''

export type BitwiseAnd<
  T extends number,
  U extends number
> = ToDecimal<BitwiseAndBinary<To32Binary<T>, To32Binary<U>>>

export type BitwiseAndBinary<
  T extends string,
  U extends string
> = ProcessLookup<T, U, LookupBitAnd>

export type BitwiseOr<
  T extends number,
  U extends number
> = ToDecimal<BitwiseOrBinary<To32Binary<T>, To32Binary<U>>>

export type BitwiseOrBinary<
  T extends string,
  U extends string
> = ProcessLookup<T, U, LookupBitOr>

export type BitwiseXor<
  T extends number,
  U extends number
> = ToDecimal<BitwiseXorBinary<To32Binary<T>, To32Binary<U>>>

export type BitwiseXorBinary<
  T extends string,
  U extends string
> = ProcessLookup<T, U, LookupBitXor>
