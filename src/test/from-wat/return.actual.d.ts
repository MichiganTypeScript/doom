import { ModuleField } from '../../module.ts'
import { runProgram } from '../../program.ts'

type $return<
  RESULT extends ModuleField.Func = {
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
  RESULT extends ModuleField.Func = {
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
    module: {
      func: {
        $return: $return;
        $entry: $entry;
      };
      globals: {};
    };
    memory: {};
    memorySize: 0;
  },
  debugMode
>