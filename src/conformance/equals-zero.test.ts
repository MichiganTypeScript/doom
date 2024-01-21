import { Expect, Equal } from 'type-testing';
import type { entry } from './equals-zero.actual.d.ts';

import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'equals-zero';
test(name, async () => {
  const entry = await getWasm(name);
  expect(entry(2)).toStrictEqual(0);
  expect(entry(1)).toStrictEqual(0);
  expect(entry(0)).toStrictEqual(1);
  expect(entry(-1)).toStrictEqual(0);
  expect(entry(-2)).toStrictEqual(0);
});

type testCases = [
  Expect<Equal<entry<2>, 0>>,
  Expect<Equal<entry<1>, 0>>,
  Expect<Equal<entry<0>, 1>>,
  Expect<Equal<entry<-1>, 0>>,
  Expect<Equal<entry<-2>, 0>>,
]
