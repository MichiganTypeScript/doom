import type { Expect, Equal } from 'type-testing';
import type { entry } from './call-indirect'

import { test, expect } from 'vitest';
import { getWasm } from '../utils'

const name = 'call-indirect';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(3, 2)).toStrictEqual(5);
  expect(entry(2, 2)).toStrictEqual(4);
  expect(entry(1, 2)).toStrictEqual(3);
  expect(entry(0, 2)).toStrictEqual(2);
  expect(entry(-1, 2)).toStrictEqual(1);
  expect(entry(-2, 2)).toStrictEqual(0);
  expect(entry(-3, -3)).toStrictEqual(-6);

  expect(entry(4294967294, 0)).toStrictEqual(-2);
  expect(entry(4294967295, 0)).toStrictEqual(-1);
  expect(entry(4294967296, 0)).toStrictEqual(0); // 2**32
  expect(entry(4294967297, 0)).toStrictEqual(1);
  expect(entry(4294967298, 0)).toStrictEqual(2);
  expect(entry(4294967299, 0)).toStrictEqual(3);

  expect(entry(4294967294, 1)).toStrictEqual(-1);
  expect(entry(4294967295, 1)).toStrictEqual(0);
  expect(entry(4294967296, 1)).toStrictEqual(1);
  expect(entry(4294967297, 1)).toStrictEqual(2);
  expect(entry(4294967298, 1)).toStrictEqual(3);
  expect(entry(4294967299, 1)).toStrictEqual(4);

  expect(entry(2147483646, 0)).toStrictEqual(2147483646);
  expect(entry(2147483647, 0)).toStrictEqual(2147483647);
  expect(entry(2147483648, 0)).toStrictEqual(-2147483648); // 2**16
  expect(entry(2147483649, 0)).toStrictEqual(-2147483647);
  expect(entry(2147483650, 0)).toStrictEqual(-2147483646);
  expect(entry(2147483651, 0)).toStrictEqual(-2147483645);

  expect(entry(2147483646, 1)).toStrictEqual(2147483647);
  expect(entry(2147483647, 1)).toStrictEqual(-2147483648);
  expect(entry(2147483648, 1)).toStrictEqual(-2147483647);
  expect(entry(2147483649, 1)).toStrictEqual(-2147483646);
  expect(entry(2147483650, 1)).toStrictEqual(-2147483645);
  expect(entry(2147483651, 1)).toStrictEqual(-2147483644);
});

type testCases = [
  Expect<Equal<entry<[3, 2]>, 5>>,
  Expect<Equal<entry<[2, 2]>, 4>>,
  Expect<Equal<entry<[1, 2]>, 3>>,
  Expect<Equal<entry<[0, 2]>, 2>>,
  Expect<Equal<entry<[-1, 2]>, 1>>,
  Expect<Equal<entry<[-2, 2]>, 0>>,
  Expect<Equal<entry<[-3, -3]>, -6>>,
]
