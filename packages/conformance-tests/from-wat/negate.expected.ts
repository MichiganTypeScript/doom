import type { Func, runProgram } from 'wasm-to-typescript-types'

type $negate = Satisfies<Func, {
  kind: 'func';
  params: ['$theOmniscient'];
  paramsTypes: ['f64'];
  result: 'f64';
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
  result: 'f64';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$ziltoid' },
      { kind: 'Call'; id: '$negate' },
    ];
}>

export type entry<
  arguments extends [number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $negate: $negate;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: '0';
    indirect: [];
  },
  debugMode
>
