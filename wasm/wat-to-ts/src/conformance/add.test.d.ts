import { Expect, Equal } from 'type-testing';
import type { add, program } from './add.actual.d.ts';

type testCases = [
  Expect<Equal<add<2, 2>, 4>>,
  Expect<Equal<add<1, 2>, 3>>,
  Expect<Equal<add<0, 2>, 2>>,
  Expect<Equal<add<-1, 2>, 1>>,
  Expect<Equal<add<-2, 2>, 0>>,
  Expect<Equal<add<-3, -3>, -6>>,
  Expect<Equal<program, 3>>,
]
