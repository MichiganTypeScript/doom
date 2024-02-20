import type { Expect, Equal } from 'type-testing';
import type { entry } from "./memory.actual"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const t = [
  2,
  1,
  0
  -1,
  -2
] as const

const name = 'memory';
test.each(t)(name, async (value) => {
  const entry = await getWasm("from-wat", name);
  expect(entry(value)).toBe(value);
});

type tests = [
  Expect<Equal<entry<[2]>, 2>>,
  Expect<Equal<entry<[1]>, 1>>,
  Expect<Equal<entry<[0]>, 0>>,
  Expect<Equal<entry<[-1]>, -1>>,
  Expect<Equal<entry<[-2]>, -2>>,
]
