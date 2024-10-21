import type { Expect, Equal } from 'type-testing';
import type { entry } from "./return-mid-loop"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const args = [393736, 60552] as const;

const name = 'return-mid-loop';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(...args)).toStrictEqual(10);
});

// type result = entry<[args[0], args[1]]>; // =>

type testCases = [
  // Expect<Equal<result, 10>>,
]
