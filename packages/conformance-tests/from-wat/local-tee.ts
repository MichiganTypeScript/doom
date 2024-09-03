import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $localTee = Satisfies<Func, {
  kind: 'func';
  params: ['$x'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: ['$y'];
    instructions: [
      { kind: 'LocalGet'; id: '$x' },
      { kind: 'LocalTee'; id: '$y' },
      { kind: 'LocalGet'; id: '$y' },
      { kind: 'Add', type: 'i32' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'Call'; id: '$localTee' },
    ];
}>

export type funcs = {
  $localTee: $localTee;
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
