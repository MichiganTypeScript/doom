// import type { entry } from './br-if.expected.js'; // TODO: change to `actual`
import { Expect, Equal } from 'type-testing';

import { test, expect } from 'vitest';
import { getWasm } from '../../utils.js';

const name = 'br-if';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(2)).toStrictEqual(7);
  expect(entry(1)).toStrictEqual(99);
  expect(entry(0)).toStrictEqual(42);
  expect(entry(-1)).toStrictEqual(7);
  expect(entry(-2)).toStrictEqual(7);
  expect(entry(-3)).toStrictEqual(7);
});

// type testCases = [
//   Expect<Equal<entry<[2]>, 7>>,
//   Expect<Equal<entry<[1]>, 99>>,
//   Expect<Equal<entry<[0]>, 42>>,
//   Expect<Equal<entry<[-1]>, 7>>,
//   Expect<Equal<entry<[-2]>, 7>>,
//   Expect<Equal<entry<[-3]>, 7>>,
// ]
