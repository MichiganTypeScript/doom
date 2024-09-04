import { expect, test } from 'vitest'
import { getWasmMemory } from '../utils'
import type { entry } from './memory-stress'
import type { Equal, Expect } from 'type-testing';
import type { ReadStringFromMemory, ReadUntilNullTerminator } from 'ts-type-math';

const name = 'memory-stress';

const t = [
  [0, ''],
  [1, 'a'],
  [10, 'aaaaaaaaaa'],
  [100, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
  [1000, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
] as const;
type T = typeof t

test.each(t)(`${name}: given %i`, async (input, expected) => {
  const entry = getWasmMemory("from-c", name);
  expect(await entry(input)).toStrictEqual(expected);
});

type i = 1
type a = T[i][0]   // =>
type e = T[i][1]   // =>
type x = entry<[a]>// =>
// type s = ReadStringFromMemory<entry<[a], true>>
//   ^?

type testCases = [
  // Expect<Equal<ReadStringFromMemory<entry<[T[0][0]], true>>, T[0][1]>>,
  // Expect<Equal<ReadStringFromMemory<entry<[T[1][0]], true>>, T[1][1]>>,
  // Expect<Equal<ReadStringFromMemory<entry<[T[2][0]], true>>, T[2][1]>>,
  // Expect<Equal<ReadStringFromMemory<entry<[T[3][0]], true>>, T[3][1]>>,
  // Expect<Equal<ReadStringFromMemory<entry<[T[4][0]], true>>, T[4][1]>>,
]
