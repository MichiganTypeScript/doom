import type { Expect, Equal } from 'type-testing';
import type { entry } from "./return-partial-stack"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const name = 'return-partial-stack';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry()).toStrictEqual(0);
});

type actual = entry<[]>; //=>

type testCases = [
  // Expect<Equal<actual, []>>, // this is WRONG
  // Expect<Equal<actual, [0, 1]>>, // should be this
]
