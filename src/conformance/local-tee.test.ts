import { Expect, Equal } from 'type-testing';
import type { localTee } from "./local-tee.actual.js";

import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'local-tee';
test(name, async () => {
  const { localTee } = await getWasm(name);
  expect(localTee(2)).toStrictEqual(4);
  expect(localTee(1)).toStrictEqual(2);
  expect(localTee(0)).toStrictEqual(0);
  expect(localTee(-1)).toStrictEqual(-2);
  expect(localTee(-2)).toStrictEqual(-4);
});

type testCases = [
  Expect<Equal<localTee<2>, 4>>,
  Expect<Equal<localTee<1>, 2>>,
  Expect<Equal<localTee<0>, 0>>,
  Expect<Equal<localTee<-1>, -2>>,
  Expect<Equal<localTee<-2>, -4>>,
]
