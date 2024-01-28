import type { entry } from './br-table.actual.js';
import { Expect, Equal } from 'type-testing';

import { test, expect } from 'vitest';
import { getWasm } from '../../utils.js';

const name = 'br-table';
test(name, async () => {
  const { entry } = await getWasm("from-wat", name);
  expect(entry( 4)).toStrictEqual(100); // default
  expect(entry( 3)).toStrictEqual(100); // default
  expect(entry( 2)).toStrictEqual(103); // $B2
  expect(entry( 1)).toStrictEqual(102); // $B1
  expect(entry( 0)).toStrictEqual(101); // $B0
  expect(entry(-1)).toStrictEqual(100); // default
  expect(entry(-2)).toStrictEqual(100); // default
});

type testCases = [
  Expect<Equal<entry<[ 4]>, 100>>, // default
  Expect<Equal<entry<[ 3]>, 100>>, // default
  Expect<Equal<entry<[ 2]>, 103>>, // $B2
  Expect<Equal<entry<[ 1]>, 102>>, // $B1
  Expect<Equal<entry<[ 0]>, 101>>, // $B0
  Expect<Equal<entry<[-1]>, 100>>, // default
  Expect<Equal<entry<[-2]>, 100>>, // default
]
