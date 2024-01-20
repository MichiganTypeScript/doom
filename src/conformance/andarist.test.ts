import { Expect, Equal } from 'type-testing';
import type { andarist } from './andarist.expected.d.ts'; // TODO, change to actual

import { test, expect } from 'vitest';
import { getWasm } from '../utils.js';

const name = 'andarist';
test(name, async () => {
  const { andarist } = await getWasm(name);
  expect(andarist(-6)).toStrictEqual(11);
  expect(andarist(-5)).toStrictEqual(12);
  expect(andarist(-4)).toStrictEqual(15);
  expect(andarist(-3)).toStrictEqual(16);
});

type testCases = [
  Expect<Equal<andarist<-6>, 11>>,
  Expect<Equal<andarist<-5>, 12>>,

  // break
  Expect<Equal<andarist<-4>, 15>>,
  Expect<Equal<andarist<-3>, 16>>,
  ]
