// import type { entry } from "./drop.actual.ts"
import { Expect, Equal } from "type-testing";
import { Func } from 'wasm-to-typescript-types'

import { test, expect } from 'vitest';
import { getWasm } from '../utils.js'

const name = 'drop';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(1, 2)).toStrictEqual(2);
  expect(entry(2, 1)).toStrictEqual(1);
  expect(entry(3, 4)).toStrictEqual(4);
});

type testCases = [
  // Expect<Equal<entry<[1, 2]>, 2>>,
  // Expect<Equal<entry<[2, 1]>, 1>>,
  // Expect<Equal<entry<[3, 4]>, 4>>,
  // Expect<Equal<1, 2>>,
]
