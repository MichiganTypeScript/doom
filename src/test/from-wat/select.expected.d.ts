import { Func, runProgram } from '../../program.ts'

type $selectBranch<
  RESULT extends Func = {
    kind: 'func';
    params: ['$condition'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Const'; value: 10 },
      { kind: 'Const'; value: 20 },
      { kind: 'LocalGet'; id: '$condition' },
      { kind: 'Select' },
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
      { kind: 'Call'; id: '$selectBranch' },
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
      $selectBranch: $selectBranch;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
