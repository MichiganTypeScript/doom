import { getWasmMemory } from "../utils";
import { expect, test } from "vitest";
import { entry } from "./store-bytes";
import { Expect, Equal } from "type-testing";
import { ReadStringFromMemory } from "../../ts-type-math/memory-read-string";

const results = {
  at0: 'Ziltoid, the Omniscient!',
  at1024: 'in search of the ultimate cup of coffee',
  at2048: 'you have five Earth minutes... make it perfect!',
  at4096: 'I am so omniscient, if there were to be two omnisciences.. I would be both!',
} as const;

type locations = {
  at0:    '00000000000000000000000000000000',
  at1024: '00000000000000000000010000000000',
  at2048: '00000000000000000000100000000000',
  at4096: '00000000000000000001000000000000',
}

test('store-bytes', async () => {
  const result = getWasmMemory('from-wat', 'store-bytes');
  expect(await result()).toBe(results.at0);
  
  const resultDirect = getWasmMemory('from-wat', 'store-bytes', 0);
  expect(await resultDirect()).toBe(results.at0);

  const at1024 = getWasmMemory('from-wat', 'store-bytes', 1024);
  expect(await at1024()).toBe(results.at1024);
  
  const at2048 = getWasmMemory('from-wat', 'store-bytes', 2048);
  expect(await at2048()).toBe(results.at2048);

  const at4096 = getWasmMemory('from-wat', 'store-bytes', 4096);
  expect(await at4096()).toBe(results.at4096);
});

type programState = entry<[], true>;

type memory = programState['memory'];

type tests = [
  Expect<Equal<ReadStringFromMemory<programState>, typeof results['at0']>>,

  Expect<Equal<
    ReadStringFromMemory<{ memory: memory, stack: [locations['at0']] }>,
    typeof results['at0']
  >>,

  Expect<Equal<
    ReadStringFromMemory<{ memory: memory, stack: [locations['at1024']] }>,
    typeof results['at1024']
  >>,

  Expect<Equal<
    ReadStringFromMemory<{ memory: memory, stack: [locations['at2048']] }>,
    typeof results['at2048']
  >>,

  Expect<Equal<
    ReadStringFromMemory<{ memory: memory, stack: [locations['at4096']] }>,
    typeof results['at4096']
  >>,
]