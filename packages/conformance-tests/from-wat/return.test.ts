import type { Expect, Equal } from 'type-testing';
import type { entry } from "./return"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const name = 'return';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry()).toStrictEqual(4);
});

type testCases = [
  Expect<Equal<entry<[]>, 4>>,
]
