import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $foo = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'MemorySize' },
  ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'Call'; id: '$foo' },
  ];
}>

export type funcs = {
  $foo: $foo;
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
    memorySize: '00000000000000000000000000101010';
    indirect: {};
  },
  debugMode,
  stopAt
>
