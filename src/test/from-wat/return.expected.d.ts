import { Func, runProgram } from '../../program.ts'

type $return<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Const'; value: 0 },
      { kind: 'Const'; value: 1 },
      { kind: 'Const'; value: 2 },
      { kind: 'Const'; value: 3 },
      { kind: 'Const'; value: 4 },
      { kind: 'Return'; count: 1 },
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
      { kind: 'Call'; id: '$return' },
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
      $return: $return;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
