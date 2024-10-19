import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $main = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  resultTypes: ['i32'];
  locals: ['$var'];
  instructions: [
    { kind: 'Const'; value: '00000000000000000000000000001010' },
    { kind: 'LocalSet'; id: '$var' },
    { kind: 'LocalGet'; id: '$var' },
    { kind: 'Const'; value: '00000000000000000000000000000001' },
    { kind: 'Add', type: 'i32' },
  ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'Call'; id: '$main' },
  ];
}>

export type funcs = {
  $main: $main;
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
