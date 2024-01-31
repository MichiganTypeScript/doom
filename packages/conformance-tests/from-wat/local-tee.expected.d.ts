import { Func, runProgram } from 'wasm-to-typescript-types'

type $localTee<
  RESULT extends Func = {
    kind: 'func';
    params: ['$x'];
    result: number;
    locals: ['$y'];
    instructions: [
      { kind: 'LocalGet'; id: '$x' },
      { kind: 'LocalTee'; id: '$y' },
      { kind: 'LocalGet'; id: '$y' },
      { kind: 'Add' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'Call'; id: '$localTee' },
    ];
  }
> = RESULT

export type entry<
  arguments extends number[] = [],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $localTee: $localTee;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
