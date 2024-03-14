import type { Func, bootstrap } from 'wasm-to-typescript-types'

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
  debugMode extends boolean = false,
  stopAt extends number = number,
> = bootstrap<
  {
    arguments: arguments;
    funcs: {
      $test: $test;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: '00000000000000000000000000000000';
    indirect: [];
  },
  debugMode,
  stopAt
>
