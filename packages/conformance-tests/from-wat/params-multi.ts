import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $test = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b', '$c'];
  paramsTypes: ['i32', 'i32', 'i32'];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'Const'; value: '00000000000000000000000000000001' },
    { kind: 'Add', type: 'i32' },
  ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  resultTypes: ['i32', 'i32'];
  locals: [];
  instructions: [
    { kind: 'Const'; value: '00000000000000000000000000001000' },
    { kind: 'Const'; value: '00000000000000000000000000010000' },
    { kind: 'Const'; value: '00000000000000000000000000100000' },
    { kind: 'Const'; value: '00000000000000000000000001000000' },
    { kind: 'Call'; id: '$test' },
  ];
}>

export type funcs = {
  $test: $test;
  $entry: $entry;
}

export type entry<
  arguments extends [],
  debugMode extends boolean = false,
  stopAt extends number = number,
> = bootstrap<
  {
    arguments: arguments;
    funcs: funcs;
    globals: {};
    memory: {};
    memorySize: '00000000000000000000000000000000';
    indirect: {};
  },
  debugMode,
  stopAt
>
