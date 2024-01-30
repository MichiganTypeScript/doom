import { Expect, Equal } from 'type-testing';
import type { entry } from './c-add.actual.js';

import { test, expect } from 'vitest';
import { getWasm } from '../../utils.js';

const name = 'c-add';
test(name, async () => {
  const entry = await getWasm("from-c", name);
  expect(entry(2, 2)).toStrictEqual(4);
  expect(entry(2, 2)).toStrictEqual(4);
  expect(entry(1, 2)).toStrictEqual(3);
  expect(entry(0, 2)).toStrictEqual(2);
  expect(entry(-1, 2)).toStrictEqual(1);
  expect(entry(-2, 2)).toStrictEqual(0);
  expect(entry(-3, -3)).toStrictEqual(-6);
});

type testCases = [
  Expect<Equal<entry<[2, 2]>, 4>>,
  Expect<Equal<entry<[1, 2]>, 3>>,
  Expect<Equal<entry<[0, 2]>, 2>>,
  Expect<Equal<entry<[-1, 2]>, 1>>,
  Expect<Equal<entry<[-2, 2]>, 0>>,
  Expect<Equal<entry<[-3, -3]>, -6>>,
]
