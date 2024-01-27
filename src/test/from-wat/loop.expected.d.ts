import { Func, runProgram } from '../../program.ts'

type $my_loop<
  RESULT extends Func = {
    kind: 'func';
    params: ['$input'];
    result: number;
    locals: ['$i', '$result'];
    instructions: [
      { kind: 'Const'; value: 0 },
      { kind: 'LocalSet'; id: '$i' },
      { kind: 'LocalGet'; id: '$input' },
      { kind: 'LocalSet'; id: '$result' },
      { kind: 'Loop';
        id: '$my_loop';
        instructions: [
          { kind: 'LocalGet'; id: '$i' },
          { kind: 'Const'; value: 1 },
          { kind: 'Add' },
          { kind: 'LocalSet'; id: '$i' },
          { kind: 'LocalGet'; id: '$result' },
          { kind: 'Const'; value: 2 },
          { kind: 'Multiply' },
          { kind: 'LocalSet'; id: '$result' },
          { kind: 'LocalGet'; id: '$i' },
          { kind: 'Const'; value: 10 },
          { kind: 'LessThan' },
          { kind: 'BranchIf'; id: '$my_loop' },
        ];
      },
      { kind: 'LocalGet'; id: '$result' },
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
      { kind: 'Call'; id: '$my_loop' },
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
      $my_loop: $my_loop;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
