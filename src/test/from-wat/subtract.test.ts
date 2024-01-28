import { Expect, Equal } from 'type-testing';
import type { entry } from "./subtract.actual.js";

import { getWasm } from '../../utils.js';
import { expect, test } from 'vitest';

const name = 'subtract';
test(name, async () => {
  const { entry } = await getWasm("from-wat", name);
  expect(entry( 5)).toStrictEqual( 4);
  expect(entry( 4)).toStrictEqual( 3);
  expect(entry( 3)).toStrictEqual( 2);
  expect(entry( 2)).toStrictEqual( 1);
  expect(entry( 1)).toStrictEqual( 0);
  expect(entry( 0)).toStrictEqual(-1);
  expect(entry(-1)).toStrictEqual(-2);
  expect(entry(-2)).toStrictEqual(-3);
  expect(entry(-3)).toStrictEqual(-4);
  expect(entry(-4)).toStrictEqual(-5);
  expect(entry(-5)).toStrictEqual(-6);

  expect(entry(4294967295)).toStrictEqual(-2);
  expect(entry(4294967296)).toStrictEqual(-1);
  expect(entry(4294967297)).toStrictEqual(0);
  expect(entry(4294967298)).toStrictEqual(1);
  expect(entry(4294967299)).toStrictEqual(2);
});

type testCases = [
  Expect<Equal<entry<[ 5]>, 4>>,
  Expect<Equal<entry<[ 4]>, 3>>,
  Expect<Equal<entry<[ 3]>, 2>>,
  Expect<Equal<entry<[ 2]>, 1>>,
  Expect<Equal<entry<[ 1]>, 0>>,
  Expect<Equal<entry<[ 0]>,-1>>,
  Expect<Equal<entry<[-1]>,-2>>,
  Expect<Equal<entry<[-2]>,-3>>,
  Expect<Equal<entry<[-3]>,-4>>,
  Expect<Equal<entry<[-4]>,-5>>,
  Expect<Equal<entry<[-5]>,-6>>,
]
