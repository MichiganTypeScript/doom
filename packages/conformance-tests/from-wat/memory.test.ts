import type { Expect, Equal } from 'type-testing';
import type { entry } from "./memory.actual.d.ts"

import { getWasm } from '../utils.ts'
import { expect, test } from 'vitest';
import { Neg, neg } from '../../ts-type-math/test-cases/negative';

const name = 'memory';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(2)).toStrictEqual(3);
  expect(entry(1)).toStrictEqual(2);
  expect(entry(0)).toStrictEqual(1);

  expect(entry(-1)).toStrictEqual(0);
  expect(entry(-1 >>> 0)).toStrictEqual(0);
  expect(entry(neg["-1"])).toStrictEqual(0);

  expect(entry(-2)).toStrictEqual(-1);
  expect(entry(-2 >>> 0)).toStrictEqual(-1);
  expect(entry(neg["-2"])).toStrictEqual(-1);
});

type testCases = [
  Expect<Equal<entry<[2]>, 3>>,
  Expect<Equal<entry<[1]>, 2>>,
  Expect<Equal<entry<[0]>, 1>>,
  // Expect<Equal<entry<[Neg['-1']]>, Neg['0']>>,
  // Expect<Equal<entry<Neg['-2']>, Neg['-1']>>,
]
