// F32Add
// F64Add
// I32Add
// I64Add
// F32Div
// F64Div
// I32DivS
// I64DivS
// I32DivU
// I64DivU
// F32Mul
// F64Mul
// I32Mul
// I64Mul
// I32RemS
// I32RemU
// F32Sub
// F64Sub
// I32Sub
// I64Sub

import { Expect, Equal } from 'type-testing';
import type { entry } from './arithmetic.actual.d.ts';

import { test, expect } from 'vitest';
import { getWasm } from '../utils.js'

const name = 'arithmetic';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
});

type testCases = [
  // TODO
]
