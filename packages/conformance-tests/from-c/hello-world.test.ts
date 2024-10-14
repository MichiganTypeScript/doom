import { expect, test } from 'vitest'
import { getWasmMemory } from '../utils'
import type { entry } from './hello-world'
import type { Equal, Expect } from 'type-testing';
import type { ReadStringFromMemory } from 'ts-type-math';

const greeting = `Greetings humans, I am Ziltoid... the omniscient.
I have come far from across the Omniverse.
You shall fetch me your universe's ultimate cup of coffee... Black!
You have five Earth minutes.
Make it perfect!`;

const name = 'hello-world';
test(name, async () => {
  const entry = getWasmMemory("from-c", name);
  expect(await entry(0)).toStrictEqual(greeting);
});

type result = entry<[], true>;
type Greeting = ReadStringFromMemory<result>;

type testCases = [
  Expect<Equal<Greeting, typeof greeting>>,
]

// type memory = result['memory'];
// //   ^?
// type stack = result['stack'];
// //   ^?
// type start = stack[0];
// //   ^?
// type x = ReadUntilNullTerminator<memory, start>;
// //   ^?

// type z = start extends keyof memory ? 1 : 2;
// //   ^?