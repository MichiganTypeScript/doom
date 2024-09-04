import { expect, test } from 'vitest'
import { getWasmMemory } from '../utils'
import type { entry } from './uppercase'
import type { Equal, Expect } from 'type-testing';
import type { ReadStringFromMemory } from 'ts-type-math';

const name = 'uppercase';
test(name, async () => {
  const entry = getWasmMemory("from-c", name);
  expect(await entry( 97 /* 'a' */)).toStrictEqual('A' /* 65 */);
  expect(await entry( 98 /* 'b' */)).toStrictEqual('B' /* 66 */);
  expect(await entry( 99 /* 'c' */)).toStrictEqual('C' /* 67 */);
  expect(await entry(100 /* 'd' */)).toStrictEqual('D' /* 68 */);

  expect(await entry( 65 /* 'A' */)).toStrictEqual('A' /* 65 */);
  expect(await entry( 66 /* 'B' */)).toStrictEqual('B' /* 66 */);
  expect(await entry( 67 /* 'C' */)).toStrictEqual('C' /* 67 */);
  expect(await entry( 68 /* 'D' */)).toStrictEqual('D' /* 68 */);
});

type p1024 = '00000000000000000000010000000000'
type result = entry<[97], true>   // =>
type pointer = result['stack'][0] // =>
type memory = result['memory']    // =>
type end = result['memory'][p1024]// =>

type Greeting = ReadStringFromMemory<entry<[97], true>>;
//   ^?

type testCases = [
  Expect<Equal<pointer, p1024>>,

  Expect<Equal<memory[p1024], end>>,

  Expect<Equal<Greeting, "A">>,
]
