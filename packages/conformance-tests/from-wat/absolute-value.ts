import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $abs_f64 = Satisfies<Func, {
  kind: 'func';
  params: ['$x'];
  paramsTypes: ['f64'];
  resultTypes: ['f64'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$x' },
    { kind: 'AbsoluteValue' },
  ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a'];
  paramsTypes: ['f64'];
  resultTypes: ['f64'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'Call'; id: '$abs_f64' },
  ];
}>

export type funcs = {
  $abs_f64: $abs_f64;
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
