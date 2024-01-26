import { Func, runProgram } from '../../program.ts'

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
  input extends number[] = [],
  debugMode extends boolean = false
> = runProgram<
  {
    stack: input;
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
