import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a'];
  paramsTypes: ['i32'];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'CountLeadingZeros', type: 'i32' },
  ];
}>

export type funcs = {
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
