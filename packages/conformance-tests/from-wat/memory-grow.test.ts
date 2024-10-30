import type { Expect, Equal } from 'type-testing';
import type { entry } from "./memory-grow"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const name = 'memory-grow';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry()).toStrictEqual([42, 42, 69]);
});

type result = entry<[]>;
//   ^?

type testCases = [
  Expect<Equal<result, [42, 42, 69]>>,
]
