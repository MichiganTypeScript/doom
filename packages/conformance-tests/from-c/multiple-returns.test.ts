import { expect, test } from 'vitest'
import { getWasm, getWasmMemory } from '../utils'
import type { entry } from './multiple-returns'
import { Equal, Expect } from 'type-testing';
import { ReadStringFromMemory } from '../../ts-type-math/memory-read-string';

const name = 'multiple-returns';
test(name, async () => {
  const entry = await getWasm("from-c", name);
  expect(entry()).toStrictEqual(1024);

  const entryMemory = getWasmMemory("from-c", name);
  expect(await entryMemory()).toStrictEqual("\u0004");
});

type result = entry<[]>;
//   ^?

type t0 = Expect<Equal<result, 1024>>;

type resultMemory = ReadStringFromMemory<entry<[], true>>;
//   ^?

type t1 = Expect<Equal<resultMemory, "\u0004">>;

