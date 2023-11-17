import { Expect, Equal } from 'type-testing';
import type { isZeroExport } from './equals-zero.actual.d.ts';

type testCases = [
  Expect<Equal<isZeroExport<2>, false>>,
  Expect<Equal<isZeroExport<1>, false>>,
  Expect<Equal<isZeroExport<0>, true>>,
  Expect<Equal<isZeroExport<-1>, false>>,
  Expect<Equal<isZeroExport<-2>, false>>,
]
