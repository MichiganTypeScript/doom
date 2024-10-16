import { expect, test } from 'vitest'
import { getWasmMemory } from '../utils'
import type { entry } from './multiple-returns'

const name = 'multiple-returns';
test(name, async () => {
  const entry = getWasmMemory("from-c", name);
  expect(await entry()).toStrictEqual(4);
});

type result = entry<[], true>;
