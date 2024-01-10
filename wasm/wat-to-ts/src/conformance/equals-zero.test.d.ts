import { Expect, Equal } from 'type-testing';
import type { isZeroExport } from './equals-zero.actual.d.ts';

type testCases = [
  Expect<Equal<isZeroExport<2>, 0>>,
  Expect<Equal<isZeroExport<1>, 0>>,
  Expect<Equal<isZeroExport<0>, 1>>,
  Expect<Equal<isZeroExport<-1>, 0>>,
  Expect<Equal<isZeroExport<-2>, 0>>,
]
