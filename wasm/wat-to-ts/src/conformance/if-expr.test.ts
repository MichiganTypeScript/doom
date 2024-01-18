import { Expect, Equal } from 'type-testing';
import type { ifexpr } from "./if-expr.actual.d.ts";

import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'if-expr';
test(name, async () => {
  const { ifexpr } = await getWasm(name);
  expect(ifexpr(10, 2)).toStrictEqual(11);
  expect(ifexpr(10, 1)).toStrictEqual(11);
  expect(ifexpr(10, 0)).toStrictEqual(11);
  expect(ifexpr(10, -1)).toStrictEqual(9);
  expect(ifexpr(10, -2)).toStrictEqual(9);
});

type testCases = [
  Expect<Equal<ifexpr<10, 2>, 11>>,
  Expect<Equal<ifexpr<10, 1>, 11>>,
  Expect<Equal<ifexpr<10, 0>, 11>>,
  Expect<Equal<ifexpr<10, -1>, 9>>,
  Expect<Equal<ifexpr<10, -2>, 9>>,
]
