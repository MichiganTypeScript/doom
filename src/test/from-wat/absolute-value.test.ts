import { Expect, Equal } from 'type-testing';
import type { entry } from './absolute-value.expected.js'; // TODO, change to actual

import { test, expect } from 'vitest';
import { getWasm } from '../../utils.js';

const name = 'absolute-value';
test(name, async () => {
  const { entry } = await getWasm("from-wat", name);
  expect(entry(-1.0)).toStrictEqual(1.0);
  expect(entry(2.0)).toStrictEqual(2.0);
  expect(entry(-3.5)).toStrictEqual(3.5);
  expect(entry(4.1)).toStrictEqual(4.1);
  expect(entry(-5.25)).toStrictEqual(5.25);
  expect(entry(0)).toStrictEqual(0);
  expect(entry(-0)).toStrictEqual(0);
  expect(entry(-123.456)).toStrictEqual(123.456);
  expect(entry(789.1011)).toStrictEqual(789.1011);
  expect(entry(-9876.54321)).toStrictEqual(9876.54321);
  expect(entry(10e-3)).toStrictEqual(10e-3);
  expect(entry(-10e3)).toStrictEqual(10e3);
  expect(entry(-1.7976931348623157e+308)).toStrictEqual(1.7976931348623157e+308 /* (Max Double) */);
  expect(entry(-5e-324)).toStrictEqual(5e-324 /* (Min Subnormal Double) */);
  expect(entry(-Infinity)).toStrictEqual(Infinity);
});

type testCases = [
  Expect<Equal<entry<[-1.0]>, 1.0>>,
  Expect<Equal<entry<[2.0]>, 2.0>>,
  Expect<Equal<entry<[-3.5]>, 3.5>>,
  Expect<Equal<entry<[4.1]>, 4.1>>,
  Expect<Equal<entry<[-5.25]>, 5.25>>,
  Expect<Equal<entry<[0]>, 0>>,
  Expect<Equal<entry<[-0]>, 0>>,
  Expect<Equal<entry<[-123.456]>, 123.456>>,
  Expect<Equal<entry<[789.1011]>, 789.1011>>,
  Expect<Equal<entry<[-9876.54321]>, 9876.54321>>,
  Expect<Equal<entry<[10e-3]>, 10e-3>>,
  Expect<Equal<entry<[-10e3]>, 10e3>>,
  Expect<Equal<entry<[-1.7976931348623157e+308]>, 1.7976931348623157e+308 /* (Max Double) */>>,
  Expect<Equal<entry<[-5e-324]>, 5e-324 /* (Min Subnormal Double) */>>,
  // Expect<Equal<entry<[-Infinity]>, Infinity>>, there ain't no Infinity in TypeScript types
]
