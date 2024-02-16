import type { Func, runProgram } from 'wasm-to-typescript-types'

type $nop = Satisfies<Func, {
  kind: 'func';
  params: [];
  result: number;
    locals: [];
    instructions: [
      { kind: 'Nop'; ziltoid: 'theOmniscient' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  result: number;
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$nop' },
    ];
}>

export type entry<
  arguments extends [],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $nop: $nop;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
