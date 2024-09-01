import type { Expect, Equal } from 'type-testing';
import type { entry } from "./memory-overwrite"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const t = [
  { input: 2, output: 6 },
  { input: 1, output: 3 },
  { input: 0, output: 0 },
  { input: -1, output: -3 },
  { input: -2, output: -6 },
] as const
type T = typeof t;

const name = 'memory-overwrite';
test.each(t)(name, async (value) => {
  const entry = await getWasm("from-wat", name);
  expect(entry(value.input)).toBe(value.output);
});

type i = 3;
type a = T[i]['input'];  // =>
type b = T[i]['output']; // =>
type e = entry<[a]>;     // =>


type tests = [
  Expect<Equal<entry<[T[0]['input']]>, T[0]['output']>>,
  Expect<Equal<entry<[T[1]['input']]>, T[1]['output']>>,
  Expect<Equal<entry<[T[2]['input']]>, T[2]['output']>>,
  Expect<Equal<entry<[T[3]['input']]>, T[3]['output']>>,
  Expect<Equal<entry<[T[4]['input']]>, T[4]['output']>>,
]
