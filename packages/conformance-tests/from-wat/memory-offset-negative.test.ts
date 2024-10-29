import type { Expect, Equal } from 'type-testing';
import type { entry } from "./memory-offset-negative"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const name = 'memory-offset-negative';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(-2)).toStrictEqual(-2);
  expect(entry(-1)).toStrictEqual(-1);
  expect(entry( 0)).toStrictEqual( 0);
  expect(entry( 1)).toStrictEqual( 1);
  expect(entry( 2)).toStrictEqual( 2);
});

type testCases = [
  Expect<Equal<entry<[-2]>, -2>>,
  Expect<Equal<entry<[-1]>, -1>>,
  Expect<Equal<entry<[0]>,   0>>,
  Expect<Equal<entry<[1]>,   1>>,
  Expect<Equal<entry<[2]>,   2>>,
  // Expect<Equal<entry<[-1, -100, 10]>, -89>>,
  // Expect<Equal<entry<[-1, -2, -3]>, -4>>,
]
