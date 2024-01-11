import { $foo } from './br-if.actual.d.ts';
import { Expect, Equal } from 'type-testing';

type testCases = [
  Expect<Equal<$foo<2>, 7>>,
  Expect<Equal<$foo<1>, 99>>,
  Expect<Equal<$foo<0>, 42>>,
  Expect<Equal<$foo<-1>, 7>>,
  Expect<Equal<$foo<-2>, 7>>,
  Expect<Equal<$foo<-3>, 7>>,
]
