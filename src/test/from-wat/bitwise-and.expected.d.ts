import { Func, runProgram } from '../../program.ts'

type $and<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'And' },
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
      { kind: 'Call'; id: '$and' },
    ];
  }
> = RESULT

export type entry<
  input extends number[] = [],
  debugMode extends boolean = false
> = runProgram<
  {
    stack: input;
    funcs: {
      $and: $and;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
