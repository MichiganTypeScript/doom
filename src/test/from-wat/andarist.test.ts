import { Expect, Equal } from 'type-testing';
import type { entry } from './andarist.expected.js';

import { test, expect } from 'vitest';
import { getWasm } from '../../utils.js';

const name = 'andarist';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(-6)).toStrictEqual(11);
  expect(entry(-5)).toStrictEqual(12);
  expect(entry(-4)).toStrictEqual(15);
  expect(entry(-3)).toStrictEqual(16);
});

type testCases = [
  Expect<Equal<entry<[-6]>, 11>>,
  Expect<Equal<entry<[-5]>, 12>>,

  // break
  Expect<Equal<entry<[-4]>, 15>>,
  Expect<Equal<entry<[-3]>, 16>>,
  ]
