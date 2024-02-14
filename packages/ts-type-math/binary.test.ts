import type { Expect, Equal } from 'type-testing'
import { expect, test } from "vitest"
import { To32Binary, ToDecimal } from './binary';

const bit32 = [
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
    decimal: 4294967295,
    binary: '11111111111111111111111111111111',
  },
] as const;

test.each(bit32)('$binary === $decimal', ({
  decimal,
  binary,
}) => {
  const fromBinary = parseInt(binary, 2);
  expect(fromBinary).toBe(decimal);

  const fromDecimal = decimal.toString(2).padStart(32, '0');
  expect(fromDecimal).toBe(binary);
});

type Bit32 = typeof bit32;

type tests = [
  Expect<Equal<Bit32['length'], 8>>,

  Expect<Equal<To32Binary<Bit32[0]['decimal']>, Bit32[0]['binary']>>,
  Expect<Equal<To32Binary<Bit32[1]['decimal']>, Bit32[1]['binary']>>,
  Expect<Equal<To32Binary<Bit32[2]['decimal']>, Bit32[2]['binary']>>,
  Expect<Equal<To32Binary<Bit32[3]['decimal']>, Bit32[3]['binary']>>,
  Expect<Equal<To32Binary<Bit32[4]['decimal']>, Bit32[4]['binary']>>,
  Expect<Equal<To32Binary<Bit32[5]['decimal']>, Bit32[5]['binary']>>,
  Expect<Equal<To32Binary<Bit32[6]['decimal']>, Bit32[6]['binary']>>,
  Expect<Equal<To32Binary<Bit32[7]['decimal']>, Bit32[7]['binary']>>,

  Expect<Equal<ToDecimal<Bit32[0]['binary']>, Bit32[0]['decimal']>>,
  Expect<Equal<ToDecimal<Bit32[1]['binary']>, Bit32[1]['decimal']>>,
  Expect<Equal<ToDecimal<Bit32[2]['binary']>, Bit32[2]['decimal']>>,
  Expect<Equal<ToDecimal<Bit32[3]['binary']>, Bit32[3]['decimal']>>,
  Expect<Equal<ToDecimal<Bit32[4]['binary']>, Bit32[4]['decimal']>>,
  Expect<Equal<ToDecimal<Bit32[5]['binary']>, Bit32[5]['decimal']>>,
  Expect<Equal<ToDecimal<Bit32[6]['binary']>, Bit32[6]['decimal']>>,
  Expect<Equal<ToDecimal<Bit32[7]['binary']>, Bit32[7]['decimal']>>,
]