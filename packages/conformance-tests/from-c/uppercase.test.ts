import { expect, test } from 'vitest'
import type { getWasmMemory } from '../utils.d.ts'
import type { entry } from './uppercase.actual.d.ts'
import type { Equal, Expect } from 'type-testing';
import type { ReadMemory } from 'ts-type-math';

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

// type Greeting = ReadMemory<entry<[97], true>>;

// type testCases = [
//   Expect<Equal<Greeting, typeof greeting>>,
// ]
