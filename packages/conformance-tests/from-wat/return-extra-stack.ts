import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $f0 = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'Const'; value: '00000000000000000000000000000001' },
    { kind: 'Const'; value: '00000000000000000000000000000010' },
    { kind: 'Const'; value: '00000000000000000000000000000011' },
    { kind: 'Const'; value: '00000000000000000000000000000100' },
    { kind: 'Const'; value: '00000000000000000000000000000101' },
    { kind: 'Const'; value: '00000000000000000000000000000110' },
    { kind: 'Const'; value: '00000000000000000000000000000111' },
    { kind: 'Return'; count: 1 },
  ];
}>

type $f1 = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  resultTypes: ['i32', 'i32'];
  locals: [];
  instructions: [
    { kind: 'Const'; value: '00000000000000000000000000001000' },
    { kind: 'Const'; value: '00000000000000000000000000001001' },
    { kind: 'Const'; value: '00000000000000000000000000001010' },
    { kind: 'Return'; count: 2 },
  ];
}>

type $f2 = Satisfies<Func, {
  kind: 'func';
  params: ['$a'];
  paramsTypes: ['i32'];
  resultTypes: ['i32', 'i32'];
  locals: [];
  instructions: [
    { kind: 'Const'; value: '00000000000000000000000000001011' },
    { kind: 'Const'; value: '00000000000000000000000000001100' },
    { kind: 'Const'; value: '00000000000000000000000000001101' },
    { kind: 'Return'; count: 2 },
  ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  resultTypes: ['i32', 'i32', 'i32'];
  locals: [];
  instructions: [
    { kind: 'Const'; value: '00000000000000000000000000000000' },
    { kind: 'Call'; id: '$f0' },
    { kind: 'Call'; id: '$f1' },
    { kind: 'Call'; id: '$f2' },
    { kind: 'Return'; count: 3 },
  ];
}>

export type funcs = {
  $f0: $f0;
  $f1: $f1;
  $f2: $f2;
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
    indirect: [];
  },
  debugMode,
  stopAt
>
