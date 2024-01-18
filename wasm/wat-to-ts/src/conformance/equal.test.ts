import { Expect, Equal } from 'type-testing';
import type { equal } from './equal.actual.d.ts';

import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'equal';
test(name, async () => {
  const { equal } = await getWasm(name);
  expect(equal(2, 2)).toStrictEqual(1);
  expect(equal(1, 2)).toStrictEqual(0);
  expect(equal(0, 2)).toStrictEqual(0);
  expect(equal(-1, 2)).toStrictEqual(0);
  expect(equal(-2, 2)).toStrictEqual(0);
  expect(equal(-3, -3)).toStrictEqual(1);
});

type testCases = [
  Expect<Equal<equal<2, 2>, 1>>,
  Expect<Equal<equal<1, 2>, 0>>,
  Expect<Equal<equal<0, 2>, 0>>,
  Expect<Equal<equal<-1, 2>, 0>>,
  Expect<Equal<equal<-2, 2>, 0>>,
  Expect<Equal<equal<-3, -3>, 1>>,
]
