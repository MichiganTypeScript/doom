import type { entry } from "./params-multi"
import type { Expect, Equal } from "type-testing";

import { test, expect } from 'vitest';
import { getWasm } from '../utils'

const name = 'params-multi';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry()).toStrictEqual([8, 17]);
});

type x = entry<[]>;
//   ^?

type testCases = [
  Expect<Equal<entry<[]>, [8, 17]>>,
]
