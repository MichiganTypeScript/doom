import { Expect, Equal } from 'type-testing';
import type { selectFalse, selectTrue } from "./select.actual.d.ts";


import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'select';
test(name, async () => {
  const { selectTrue, selectFalse } = await getWasm(name);
  expect(selectTrue()).toStrictEqual(20);
  expect(selectFalse()).toStrictEqual(10);
});

type testCases = [
  Expect<Equal<selectTrue, 20>>,
  Expect<Equal<selectFalse, 10>>,
]
