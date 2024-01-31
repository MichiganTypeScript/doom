import type { Expect, Equal } from 'type-testing';
import type { entry } from './equal.actual.d.ts'

import { getWasm } from '../utils.ts'
import { expect, test } from 'vitest';

const name = 'equal';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(2, 2)).toStrictEqual(1);
  expect(entry(1, 2)).toStrictEqual(0);
  expect(entry(0, 2)).toStrictEqual(0);
  expect(entry(-1, 2)).toStrictEqual(0);
  expect(entry(-2, 2)).toStrictEqual(0);
  expect(entry(-3, -3)).toStrictEqual(1);
});

type testCases = [
  Expect<Equal<entry<[2, 2]>, 1>>,
  Expect<Equal<entry<[1, 2]>, 0>>,
  Expect<Equal<entry<[0, 2]>, 0>>,
  Expect<Equal<entry<[-1, 2]>, 0>>,
  Expect<Equal<entry<[-2, 2]>, 0>>,
  Expect<Equal<entry<[-3, -3]>, 1>>,
]
