import { Expect, Equal } from 'type-testing';
import type { entry } from "./subtract.actual.d.ts";


import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'subtract';
test(name, async () => {
  const entry = await getWasm(name);
  expect(entry()).toStrictEqual(7);
});

type testCases = [
  Expect<Equal<entry, 7>>,
  
  // @ts-expect-error
  Expect<Equal<entry, 6>>,
]
