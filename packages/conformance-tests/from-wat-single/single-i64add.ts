import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i64', 'i64'];
  resultTypes: ['i64'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'LocalGet'; id: '$b' },
    { kind: 'Add', type: 'i64' },
  ];
}>

export type funcs = {
  $entry: $entry;
}

export type entry<
  arguments extends [bigint, bigint],
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
