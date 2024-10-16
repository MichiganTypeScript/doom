import type { Expect, Equal } from 'type-testing';
import type { entry } from "./return-extra-stack"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const name = 'return-extra-stack';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry()).toStrictEqual([9, 12, 13]);
});

type actual = entry<[]>; //=>

type testCases = [
  Expect<Equal<actual, [9, 12, 13]>>,
]
