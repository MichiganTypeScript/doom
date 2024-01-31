import { Expect, Equal } from 'type-testing';
import type { entry } from "./nop.actual.js"

import { getWasm } from '../utils.js'
import { expect, test } from 'vitest';

const name = 'nop';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry()).toStrictEqual(undefined);
});

type testCases = [
  Expect<Equal<entry, undefined>>,
]
