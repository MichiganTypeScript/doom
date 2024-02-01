import type { Func, runProgram } from 'wasm-to-typescript-types'

type $main<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'NotEqual' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Call'; id: '$main' },
    ];
  }
> = RESULT

export type entry<
  arguments extends [number, number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $main: $main;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
