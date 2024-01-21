import { Expect, Equal } from 'type-testing';
import type { entry } from "./if-expr.actual.d.ts";

import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'if-expr';
test(name, async () => {
  const entry = await getWasm(name);
  expect(entry(10, 2)).toStrictEqual(11);
  expect(entry(10, 1)).toStrictEqual(11);
  expect(entry(10, 0)).toStrictEqual(11);
  expect(entry(10, -1)).toStrictEqual(9);
  expect(entry(10, -2)).toStrictEqual(9);
});

type testCases = [
  Expect<Equal<entry<10, 2>, 11>>,
  Expect<Equal<entry<10, 1>, 11>>,
  Expect<Equal<entry<10, 0>, 11>>,
  Expect<Equal<entry<10, -1>, 9>>,
  Expect<Equal<entry<10, -2>, 9>>,
]
