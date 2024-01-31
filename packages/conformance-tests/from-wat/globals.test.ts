import type { Expect, Equal } from 'type-testing';
import type { entry } from "./globals.actual.d.ts"


import { getWasm } from '../utils.ts'
import { expect, test } from 'vitest';

const name = 'globals';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry()).toStrictEqual(42);
});

type testCases = [
  Expect<Equal<entry, 42>>,
]
