import { Expect, Equal } from 'type-testing';
import type { main } from "./negate.actual.d.ts";

import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'negate';
test(name, async () => {
  const { main } = await getWasm(name);
  expect(main()).toStrictEqual(-10);
});

type testCases = [
  Expect<Equal<main, -10>>,
  
  // @ts-expect-error
  Expect<Equal<main, 6>>,
]
