import { Expect, Equal } from 'type-testing';
import type { entry } from './loop.actual.js';

import { test, expect } from 'vitest';
import { getWasm } from '../../utils.js';

const name = 'loop';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(3)).toStrictEqual(3072);
  expect(entry(2)).toStrictEqual(2048);
  expect(entry(1)).toStrictEqual(1024);
  expect(entry(0)).toStrictEqual(0);
  expect(entry(-1)).toStrictEqual(-1024);
  expect(entry(-2)).toStrictEqual(-2048)
  expect(entry(-3)).toStrictEqual(-3072);
});

type testCases = [
  // Expect<Equal<entry<[3]>, 3072>>,
  // Expect<Equal<entry<[2]>, 2048>>,
  // Expect<Equal<entry<[1]>, 1024>>,
  // Expect<Equal<entry<[0]>, 0>>,
  // Expect<Equal<entry<[-1]>, -1024>>,
  // Expect<Equal<entry<[-2]>, -204>>,
  // Expect<Equal<entry<[-3]>, -3072>>,
]
