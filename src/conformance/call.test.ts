import type { get42Plus1 } from "./call.actual.d.ts";
import { Expect, Equal } from "type-testing";

import { test, expect } from 'vitest';
import { getWasm } from '../utils.js';

const name = 'call';
test(name, async () => {
  const { get42Plus1 } = await getWasm(name);
  expect(get42Plus1()).toStrictEqual(43);
});

type testCases = [
  Expect<Equal<get42Plus1, 43>>,
]
