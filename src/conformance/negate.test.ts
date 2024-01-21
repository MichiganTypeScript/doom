import { Expect, Equal } from 'type-testing';
import type { entry } from "./negate.actual.d.ts";

import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'negate';
test(name, async () => {
  const entry = await getWasm(name);
  expect(entry()).toStrictEqual(-10);
});

type testCases = [
  Expect<Equal<entry, -10>>,
  
  // @ts-expect-error
  Expect<Equal<entry, 6>>,
]
