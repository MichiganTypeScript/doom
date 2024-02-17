import type { Func, runProgram } from 'wasm-to-typescript-types'

type $throw = Satisfies<Func, {
  kind: 'func';
  params: [];
  result: number;
    locals: [];
    instructions: [
      { kind: 'Unreachable' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  result: number;
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$throw' },
    ];
}>

export type entry<
  arguments extends [],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $throw: $throw;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
