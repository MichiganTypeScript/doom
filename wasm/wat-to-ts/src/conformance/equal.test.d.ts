import { Expect, Equal } from 'type-testing';
import type { equal } from './equal.actual.d.ts';

type testCases = [
  Expect<Equal<equal<2, 2>, 1>>,
  Expect<Equal<equal<1, 2>, 0>>,
  Expect<Equal<equal<0, 2>, 0>>,
  Expect<Equal<equal<-1, 2>, 0>>,
  Expect<Equal<equal<-2, 2>, 0>>,
  Expect<Equal<equal<-3, -3>, 1>>,
]
