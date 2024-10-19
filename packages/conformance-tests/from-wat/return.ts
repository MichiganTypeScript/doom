import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $return = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'Const'; value: '00000000000000000000000000000000' },
    { kind: 'Const'; value: '00000000000000000000000000000001' },
    { kind: 'Const'; value: '00000000000000000000000000000010' },
    { kind: 'Const'; value: '00000000000000000000000000000011' },
    { kind: 'Const'; value: '00000000000000000000000000000100' },
    { kind: 'Return'; count: 1 },
  ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'Call'; id: '$return' },
  ];
}>

export type funcs = {
  $return: $return;
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
