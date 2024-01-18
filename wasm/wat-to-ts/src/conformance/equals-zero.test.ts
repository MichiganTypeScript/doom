import { Expect, Equal } from 'type-testing';
import type { isZeroExport } from './equals-zero.actual.d.ts';

import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'equals-zero';
test(name, async () => {
  const { isZeroExport } = await getWasm(name);
  expect(isZeroExport(2)).toStrictEqual(0);
  expect(isZeroExport(1)).toStrictEqual(0);
  expect(isZeroExport(0)).toStrictEqual(1);
  expect(isZeroExport(-1)).toStrictEqual(0);
  expect(isZeroExport(-2)).toStrictEqual(0);
});

type testCases = [
  Expect<Equal<isZeroExport<2>, 0>>,
  Expect<Equal<isZeroExport<1>, 0>>,
  Expect<Equal<isZeroExport<0>, 1>>,
  Expect<Equal<isZeroExport<-1>, 0>>,
  Expect<Equal<isZeroExport<-2>, 0>>,
]
