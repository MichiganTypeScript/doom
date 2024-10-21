import { test } from 'vitest';
import { ProgramInput } from './types';
import { ProcessInputStack } from './bootstrap';
import { Equal, Expect } from 'type-testing';
import type { Satisfies } from 'ts-type-math'

test("program")

export type makeInput = Satisfies<ProgramInput, {
  arguments: [1, 2];
  funcs: {
    $entry: {
      kind: 'func';
      params: ['$a', '$b'];
      paramsTypes: ['i32', 'i32'];
      resultTypes: ['i32'];
      locals: [];
      instructions: [];
    };
  };
  globals: {};
  L1Cache: {};
  memory: {};
  memorySize: '0';
  indirect: {};
}>

type c1 = ProcessInputStack<makeInput>; // =>
type e1 = [
  '00000000000000000000000000000001',
  '00000000000000000000000000000010',
];

type tests = [
  Expect<Equal<c1, e1>>,
]
