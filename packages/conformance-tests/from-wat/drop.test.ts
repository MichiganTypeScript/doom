// import type { entry } from "./drop"
import type { Expect, Equal } from "type-testing";
import type { entry } from "./drop"
import { test, expect } from 'vitest';
import { getWasm } from '../utils'

const name = 'drop';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(1, 2)).toStrictEqual(2);
  expect(entry(2, 1)).toStrictEqual(1);
  expect(entry(3, 4)).toStrictEqual(4);
});

type testCases = [
  Expect<Equal<entry<[1, 2]>, 2>>,
  Expect<Equal<entry<[2, 1]>, 1>>,
  Expect<Equal<entry<[3, 4]>, 4>>,
]
