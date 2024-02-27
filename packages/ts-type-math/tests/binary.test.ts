import type { Expect, Equal } from 'type-testing'
import { expect, test } from "vitest"
import { To32Binary, ToDecimalSigned } from '../binary';
import { twosComplementToNumber, numberToTwosComplement } from '../test-utils';

const t = [
  {
    decimal: 0,
    binary: '00000000000000000000000000000000',
  },
  {
    decimal: 1,
    binary: '00000000000000000000000000000001',
  },
  {
    decimal: 2,
    binary: '00000000000000000000000000000010',
  },
  {
    decimal: 3,
    binary: '00000000000000000000000000000011',
  },
  {
    decimal: 4,
    binary: '00000000000000000000000000000100',
  },
  {
    decimal: 255,
    binary: '00000000000000000000000011111111',
  },
  {
    decimal: 3242182, // lol, TypeScript blue runs deep
    binary: '00000000001100010111100011000110',
  },
  {
    decimal: -1,
    binary: '11111111111111111111111111111111',
  },
  {
    decimal: -18,
    binary: '11111111111111111111111111101110',
  },
] as const;

test.each(t)('$binary === $decimal', ({
  decimal,
  binary,
}) => {
  expect(twosComplementToNumber(binary)).toBe(decimal);
  expect(numberToTwosComplement(decimal)).toBe(binary);
});

type T = typeof t;

type tests = [
  Expect<Equal<To32Binary<T[0]['decimal']>, T[0]['binary']>>,
  Expect<Equal<To32Binary<T[1]['decimal']>, T[1]['binary']>>,
  Expect<Equal<To32Binary<T[2]['decimal']>, T[2]['binary']>>,
  Expect<Equal<To32Binary<T[3]['decimal']>, T[3]['binary']>>,
  Expect<Equal<To32Binary<T[4]['decimal']>, T[4]['binary']>>,
  Expect<Equal<To32Binary<T[5]['decimal']>, T[5]['binary']>>,
  Expect<Equal<To32Binary<T[6]['decimal']>, T[6]['binary']>>,
  Expect<Equal<To32Binary<T[7]['decimal']>, T[7]['binary']>>,
  Expect<Equal<To32Binary<T[8]['decimal']>, T[8]['binary']>>,

  Expect<Equal<ToDecimalSigned<T[0]['binary']>, T[0]['decimal']>>,
  Expect<Equal<ToDecimalSigned<T[1]['binary']>, T[1]['decimal']>>,
  Expect<Equal<ToDecimalSigned<T[2]['binary']>, T[2]['decimal']>>,
  Expect<Equal<ToDecimalSigned<T[3]['binary']>, T[3]['decimal']>>,
  Expect<Equal<ToDecimalSigned<T[4]['binary']>, T[4]['decimal']>>,
  Expect<Equal<ToDecimalSigned<T[5]['binary']>, T[5]['decimal']>>,
  Expect<Equal<ToDecimalSigned<T[6]['binary']>, T[6]['decimal']>>,
  Expect<Equal<ToDecimalSigned<T[7]['binary']>, T[7]['decimal']>>,
  Expect<Equal<ToDecimalSigned<T[8]['binary']>, T[8]['decimal']>>,

  Expect<Equal<T['length'], 9>>,
]