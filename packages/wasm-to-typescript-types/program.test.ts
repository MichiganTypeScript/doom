import { test } from 'vitest';
import { ProgramInput } from './types';
import { ProcessInputStack } from './program';
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
  memory: {};
  memorySize: '0';
  indirect: [];
}>

type c1 = ProcessInputStack<makeInput>; // =>
type e1 = [
  '00000000000000000000000000000001',
  '00000000000000000000000000000010',
];

type tests = [
  Expect<Equal<c1, e1>>,
]
