import { Func, runProgram } from 'wasm-to-typescript-types'

type $drop<
  RESULT extends Func = {
    kind: 'func';
    params: ['$first_arg', '$second_arg'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$first_arg' },
      { kind: 'LocalGet'; id: '$second_arg' },
      { kind: 'Drop' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends Func = {
    kind: 'func';
    params: ['$first_arg', '$second_arg'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$second_arg' },
      { kind: 'LocalGet'; id: '$first_arg' },
      { kind: 'Call'; id: '$drop' },
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
      $drop: $drop;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
