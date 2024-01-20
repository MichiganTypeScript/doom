import { Expect, Equal } from 'type-testing';
import type { do_nothing } from "./nop.actual.d.ts";

import { getWasm } from '../utils.js';
import { expect, test } from 'vitest';

const name = 'nop';
test(name, async () => {
  const { do_nothing } = await getWasm(name);
  expect(do_nothing()).toStrictEqual(undefined);
});

type testCases = [
  Expect<Equal<do_nothing, unknown>>,
]
