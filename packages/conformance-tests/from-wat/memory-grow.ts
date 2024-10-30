import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  resultTypes: ['i32', 'i32', 'i32'];
  locals: [];
  instructions: [
    { kind: 'MemorySize' },
    { kind: 'Const'; value: '00000000000000000000000000011011' },
    { kind: 'MemoryGrow' },
    { kind: 'MemorySize' },
  ];
}>

export type funcs = {
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
