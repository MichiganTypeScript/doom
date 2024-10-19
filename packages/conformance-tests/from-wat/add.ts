import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $add = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'LocalGet'; id: '$b' },
    { kind: 'Add', type: 'i32' },
  ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'LocalGet'; id: '$b' },
    { kind: 'Call'; id: '$add' },
  ];
}>

export type funcs = {
  $add: $add;
  $entry: $entry;
}

export type entry<
  arguments extends [number, number],
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
