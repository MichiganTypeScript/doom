import { Expect, Equal } from 'type-testing';
import type { ziltoid } from "./subtract.actual.d.ts";


import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'subtract';
test(name, async () => {
  const { ziltoid } = await getWasm(name);
  expect(ziltoid()).toStrictEqual(7);
});

type testCases = [
  Expect<Equal<ziltoid, 7>>,
  
  // @ts-expect-error
  Expect<Equal<ziltoid, 6>>,
]
