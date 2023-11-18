import { Expect, Equal } from 'type-testing';
import type { compute } from './multiple-results.expected.d.ts';

type testCases = [
  Expect<Equal<compute<2, 2>, [4, 4]>>,
  Expect<Equal<compute<1, 1>, [2, 1]>>,
  Expect<Equal<compute<0, 0>, [0, 0]>>,
  Expect<Equal<compute<-1, -1>, [-2, 1]>>,
  Expect<Equal<compute<-2, -2>, [-4, 4]>>,
  Expect<Equal<compute<-3, -3>, [-6, 9]>>,
]