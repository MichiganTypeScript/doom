import type { Expect, Equal } from 'type-testing';
import type { entry } from "./local-set"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const name = 'local-set';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry()).toStrictEqual(11);
});

type testCases = [
  Expect<Equal<entry<[]>, 11>>,
]
