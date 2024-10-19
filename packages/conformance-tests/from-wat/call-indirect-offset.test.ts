import type { Expect, Equal } from 'type-testing';
import type { entry } from './call-indirect-offset'

import { test, expect } from 'vitest';
import { getWasm } from '../utils'

const name = 'call-indirect-offset';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(3, 2)).toStrictEqual(11);
  expect(entry(2, 2)).toStrictEqual(8);
  expect(entry(1, 2)).toStrictEqual(5);
  expect(entry(0, 2)).toStrictEqual(2);
  expect(entry(-1, 2)).toStrictEqual(-1);
  expect(entry(-2, 2)).toStrictEqual(-4);
  expect(entry(-3, -3)).toStrictEqual(3);
})

type testCases = [
  Expect<Equal<entry<[3, 2]>, 11>>,
  Expect<Equal<entry<[2, 2]>, 8>>,
  Expect<Equal<entry<[1, 2]>, 5>>,
  Expect<Equal<entry<[0, 2]>, 2>>,
  Expect<Equal<entry<[-1, 2]>, -1>>,
  Expect<Equal<entry<[-2, 2]>, -4>>,
  Expect<Equal<entry<[-3, -3]>, 3>>,
]
