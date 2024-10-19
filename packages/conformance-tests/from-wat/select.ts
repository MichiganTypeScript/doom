import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $selectBranch = Satisfies<Func, {
  kind: 'func';
  params: ['$condition'];
  paramsTypes: ['i32'];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'Const'; value: '00000000000000000000000000001010' },
    { kind: 'Const'; value: '00000000000000000000000000010100' },
    { kind: 'LocalGet'; id: '$condition' },
    { kind: 'Select' },
  ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a'];
  paramsTypes: ['i32'];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'Call'; id: '$selectBranch' },
  ];
}>

export type funcs = {
  $selectBranch: $selectBranch;
  $entry: $entry;
}

export type entry<
  arguments extends [number],
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
