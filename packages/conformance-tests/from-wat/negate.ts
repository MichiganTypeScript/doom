import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $negate = Satisfies<Func, {
  kind: 'func';
  params: ['$theOmniscient'];
  paramsTypes: ['f64'];
  resultTypes: ['f64'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$theOmniscient' },
    { kind: 'Negate' },
  ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$ziltoid'];
  paramsTypes: ['f64'];
  resultTypes: ['f64'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$ziltoid' },
    { kind: 'Call'; id: '$negate' },
  ];
}>

export type funcs = {
  $negate: $negate;
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
