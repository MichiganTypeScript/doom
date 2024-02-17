import type { Func, runProgram } from 'wasm-to-typescript-types'

type $test = Satisfies<Func, {
  kind: 'func';
  params: ['$a'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$first', '$second', '$third'];
  paramsTypes: ['i32', 'i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$third' },
      { kind: 'Call'; id: '$test' },
    ];
}>

export type entry<
  arguments extends [number, number, number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $test: $test;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
