import type { Expect, Equal } from 'type-testing';
import type { entry } from './c-add.actual.d.ts'

import { test, expect } from 'vitest';
import { getWasm } from '../utils.ts'
import { Neg, neg } from '../../ts-type-math/test-cases/negative';

const name = 'c-add';
test(name, async () => {
  const entry = await getWasm("from-c", name);
  expect(entry(2, 2)).toStrictEqual(4);
  expect(entry(2, 2)).toStrictEqual(4);
  expect(entry(1, 2)).toStrictEqual(3);
  expect(entry(0, 2)).toStrictEqual(2);
  expect(entry(neg["-1"], 2)).toStrictEqual(1);
  expect(entry(neg["-2"], 2)).toStrictEqual(0);
  expect(entry(neg["-3"], neg["-3"])).toStrictEqual(-6);
});

type testCases = [
  Expect<Equal<entry<[2, 2]>, 4>>,
  Expect<Equal<entry<[1, 2]>, 3>>,
  Expect<Equal<entry<[0, 2]>, 2>>,
  // Expect<Equal<entry<[Neg["-1"], 2]>, Neg["1"]>>,
  // Expect<Equal<entry<[Neg["-2"], 2]>, Neg["0"]>>,
  // Expect<Equal<entry<[Neg["-3"], Neg["-3"]]>, 8589934586>>, // uh oh.
]
