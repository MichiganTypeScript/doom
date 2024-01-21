import type { entry } from "./call.actual.d.ts";
import { Expect, Equal } from "type-testing";

import { test, expect } from 'vitest';
import { getWasm } from '../utils.js';

const name = 'call';
test(name, async () => {
  const entry = await getWasm(name);
  expect(entry()).toStrictEqual(43);
});

type testCases = [
  Expect<Equal<entry, 43>>,
]
