import { Expect, Equal } from 'type-testing';
import type { compute } from './multiple-results.expected.d.ts';

import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'multiple-results';
test(name, async () => {
  const { compute } = await getWasm(name);
  expect(compute(2n, 2)).toStrictEqual([4n, 4]);
  expect(compute(1n, 1)).toStrictEqual([2n, 1]);
  expect(compute(0n, 0)).toStrictEqual([0n, 0]);
  expect(compute(-1n, -1)).toStrictEqual([-2n, 1]);
  expect(compute(-2n, 2)).toStrictEqual([-4n, 4]);
  expect(compute(-3n, -3)).toStrictEqual([-6n, 9]);
});

type testCases = [
  Expect<Equal<compute<2, 2>, [4, 4]>>,
  Expect<Equal<compute<1, 1>, [2, 1]>>,
  Expect<Equal<compute<0, 0>, [0, 0]>>,
  Expect<Equal<compute<-1, -1>, [-2, 1]>>,
  Expect<Equal<compute<-2, -2>, [-4, 4]>>,
  Expect<Equal<compute<-3, -3>, [-6, 9]>>,
]