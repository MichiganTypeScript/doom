import { Expect, Equal } from 'type-testing';
import type { add } from './add.actual.d.ts';

import { test, expect } from 'vitest';
import { getWasm } from '../utils.js';

const name = 'add';
test(name, async () => {
  const { add } = await getWasm(name);
  expect(add(2, 2)).toStrictEqual(4);
  expect(add(2, 2)).toStrictEqual(4);
  expect(add(1, 2)).toStrictEqual(3);
  expect(add(0, 2)).toStrictEqual(2);
  expect(add(-1, 2)).toStrictEqual(1);
  expect(add(-2, 2)).toStrictEqual(0);
  expect(add(-3, -3)).toStrictEqual(-6);
});

type testCases = [
  Expect<Equal<add<2, 2>, 4>>,
  Expect<Equal<add<1, 2>, 3>>,
  Expect<Equal<add<0, 2>, 2>>,
  Expect<Equal<add<-1, 2>, 1>>,
  Expect<Equal<add<-2, 2>, 0>>,
  Expect<Equal<add<-3, -3>, -6>>,
]
