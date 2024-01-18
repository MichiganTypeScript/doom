import type { brif } from './br-if.actual.d.ts';
import { Expect, Equal } from 'type-testing';

import { test, expect } from 'vitest';
import { getWasm } from '../utils.js';

const name = 'br-if';
test(name, async () => {
  const { brif } = await getWasm(name);
  expect(brif(2)).toStrictEqual(7);
  expect(brif(1)).toStrictEqual(99);
  expect(brif(0)).toStrictEqual(42);
  expect(brif(-1)).toStrictEqual(7);
  expect(brif(-2)).toStrictEqual(7);
  expect(brif(-3)).toStrictEqual(7);
});

type testCases = [
  Expect<Equal<brif<2>, 7>>,
  Expect<Equal<brif<1>, 99>>,
  Expect<Equal<brif<0>, 42>>,
  Expect<Equal<brif<-1>, 7>>,
  Expect<Equal<brif<-2>, 7>>,
  Expect<Equal<brif<-3>, 7>>,
]
