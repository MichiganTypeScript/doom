import { Expect, Equal } from 'type-testing';
import type { entry } from "./memory.actual.js";

import { getWasm } from '../../utils.js';
import { expect, test } from 'vitest';

const name = 'memory';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(2)).toStrictEqual(3);
  expect(entry(1)).toStrictEqual(2);
  expect(entry(0)).toStrictEqual(1);
  expect(entry(-1)).toStrictEqual(0);
  expect(entry(-2)).toStrictEqual(-1);
});

type testCases = [
  // Expect<Equal<entry<[2]>, 3>>,
  // Expect<Equal<entry<[1]>, 2>>,
  // Expect<Equal<entry<[0]>, 1>>,
  // Expect<Equal<entry<[-1]>, 0>>,
  // Expect<Equal<entry<[-2]>, -1>>,
]
