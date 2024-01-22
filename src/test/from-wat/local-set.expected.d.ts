import { ModuleField } from '../../module.ts'
import { runProgram } from '../../program.ts'

type $main<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: ['$var'];
    instructions: [
      { kind: 'Const'; value: 10 },
      { kind: 'LocalSet'; id: '$var' },
      { kind: 'LocalGet'; id: '$var' },
      { kind: 'Const'; value: 1 },
      { kind: 'Add' }
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
      { kind: 'Call'; id: '$main' }
    ];
  }
> = RESULT

export type entry<
  input extends number[] = []
> = runProgram<
  {
    stack: input;
    module: {
      func: {
        $main: $main;
        $entry: $entry;
      };
      globals: {};
    }
  },
  false
>