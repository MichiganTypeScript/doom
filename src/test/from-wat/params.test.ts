import type { entry } from "./params.actual.js";
import { Expect, Equal } from "type-testing";

import { test, expect } from 'vitest';
import { getWasm } from '../../utils.js';

const name = 'params';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(1, 2, 3)).toStrictEqual(3);
  expect(entry(2, 3, 4)).toStrictEqual(4);
});

type testCases = [
  Expect<Equal<entry<[1, 2, 3]>, 3>>,
  Expect<Equal<entry<[2, 3, 4]>, 4>>,
]
