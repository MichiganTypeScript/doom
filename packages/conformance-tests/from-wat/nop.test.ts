import type { Expect, Equal } from 'type-testing';
import type { entry } from "./nop"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const name = 'nop';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry()).toStrictEqual(undefined);
});

type testCases = [
  Expect<Equal<entry<[]>, never>>,
]
