import type { Func, runProgram } from 'wasm-to-typescript-types'

type $foo = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b', '$c'];
  paramsTypes: ['i32', 'i32', 'i32'];
  result: 'i32';
    locals: ['$start'];
    instructions: [
      { kind: 'Const'; value: '0' },
      { kind: 'LocalSet'; id: '$start' },
      { kind: 'LocalGet'; id: '$start' },
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'I32Store'; offset: 0 },
      { kind: 'LocalGet'; id: '$start' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'I32Store'; offset: 4 },
      { kind: 'LocalGet'; id: '$start' },
      { kind: 'LocalGet'; id: '$c' },
      { kind: 'I32Store'; offset: 8 },
      { kind: 'LocalGet'; id: '$start' },
      { kind: 'I32Load'; offset: 8 },
      { kind: 'LocalGet'; id: '$start' },
      { kind: 'I32Load'; offset: 4 },
      { kind: 'LocalGet'; id: '$start' },
      { kind: 'I32Load'; offset: 0 },
      { kind: 'Subtract' },
      { kind: 'Add', type: 'i32' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b', '$c'];
  paramsTypes: ['i32', 'i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'LocalGet'; id: '$c' },
      { kind: 'Call'; id: '$foo' },
    ];
}>

export type entry<
  arguments extends [number, number, number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $foo: $foo;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: '1';
    indirect: [];
  },
  debugMode
>
