import type { Expect, Equal } from 'type-testing';
import type { entry } from "./select"


import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const name = 'select';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(1)).toStrictEqual(10);
  expect(entry(0)).toStrictEqual(20);
});

type testCases = [
  Expect<Equal<entry<[1]>, 10>>,
  Expect<Equal<entry<[0]>, 20>>,
]
