import { Func, runProgram } from 'wasm-to-typescript-types'

type $main<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: ['$var'];
    instructions: [
      { kind: 'Const'; value: 10 },
      { kind: 'LocalSet'; id: '$var' },
      { kind: 'LocalGet'; id: '$var' },
      { kind: 'Const'; value: 1 },
      { kind: 'Add' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$main' },
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
