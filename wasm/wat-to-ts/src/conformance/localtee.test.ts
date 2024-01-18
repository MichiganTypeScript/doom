import { Expect, Equal } from 'type-testing';
import type { useLocalTee } from "./localtee.actual.d.ts";

import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'localtee';
test(name, async () => {
  const { useLocalTee } = await getWasm(name);
  expect(useLocalTee(2)).toStrictEqual(4);
  expect(useLocalTee(1)).toStrictEqual(2);
  expect(useLocalTee(0)).toStrictEqual(0);
  expect(useLocalTee(-1)).toStrictEqual(-2);
  expect(useLocalTee(-2)).toStrictEqual(-4);
});

type testCases = [
  Expect<Equal<useLocalTee<2>, 4>>,
  Expect<Equal<useLocalTee<1>, 2>>,
  Expect<Equal<useLocalTee<0>, 0>>,
  Expect<Equal<useLocalTee<-1>, -2>>,
  Expect<Equal<useLocalTee<-2>, -4>>,
]
