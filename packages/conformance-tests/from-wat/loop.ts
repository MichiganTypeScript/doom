import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $my_loop = Satisfies<Func, {
  kind: 'func';
  params: ['$input'];
  paramsTypes: ['i32'];
  resultTypes: ['i32'];
  locals: ['$i', '$result'];
  instructions: [
    { kind: 'Const'; value: '00000000000000000000000000000000' },
    { kind: 'LocalSet'; id: '$i' },
    { kind: 'LocalGet'; id: '$input' },
    { kind: 'LocalSet'; id: '$result' },
    { kind: 'Loop';
      id: '$my_loop';
      instructions: [
        { kind: 'LocalGet'; id: '$i' },
        { kind: 'Const'; value: '00000000000000000000000000000001' },
        { kind: 'Add', type: 'i32' },
        { kind: 'LocalSet'; id: '$i' },
        { kind: 'LocalGet'; id: '$result' },
        { kind: 'Const'; value: '00000000000000000000000000000010' },
        { kind: 'Multiply', type: 'i32' },
        { kind: 'LocalSet'; id: '$result' },
        { kind: 'LocalGet'; id: '$i' },
        { kind: 'Const'; value: '00000000000000000000000000000011' },
        { kind: 'LessThan', signed: true, type: 'i32' },
        { kind: 'BranchIf'; id: '$my_loop' },
      ];
    },
    { kind: 'LocalGet'; id: '$result' },
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
    { kind: 'Call'; id: '$my_loop' },
  ];
}>

export type funcs = {
  $my_loop: $my_loop;
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
    indirect: [];
  },
  debugMode,
  stopAt
>
