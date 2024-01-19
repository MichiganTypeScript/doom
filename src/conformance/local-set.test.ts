import { Expect, Equal } from 'type-testing';
import type { main } from "./local-set.actual.d.ts";

import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'local-set';
test(name, async () => {
  const { main } = await getWasm(name);
  expect(main()).toStrictEqual(11);
});

type testCases = [
  Expect<Equal<main, 11>>,
  
  // @ts-expect-error
  Expect<Equal<main, 6>>,
]
