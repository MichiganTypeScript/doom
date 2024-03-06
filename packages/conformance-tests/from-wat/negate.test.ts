import type { Expect, Equal } from 'type-testing';
import type { entry } from "./negate.actual"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const name = 'negate';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(2)).toStrictEqual(-2);
  expect(entry(-1)).toStrictEqual(1);
  expect(entry(0)).toStrictEqual(-0); // Difference between TS and WASM
  expect(entry(1)).toStrictEqual(-1);
  expect(entry(2)).toStrictEqual(-2);
});

type testCases = [
  // Expect<Equal<entry<[2]>, -2>>,
  // Expect<Equal<entry<[-1]>, 1>>,
  // Expect<Equal<entry<[0]>, 0>>,
  // Expect<Equal<0, -0>>, // there's not really a "negative zero" in TypeScript
  // Expect<Equal<entry<[0]>, -0>>,
  // Expect<Equal<entry<[1]>, -1>>,
  // Expect<Equal<entry<[2]>, -2>>,
]
