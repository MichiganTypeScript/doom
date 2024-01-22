import { ModuleField } from '../../module.ts'
import { runProgram } from '../../program.ts'

type $ziltoid<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Const'; value: 10 },
      { kind: 'Const'; value: 3 },
      { kind: 'Sub' }
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
      { kind: 'Call'; id: '$ziltoid' }
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
        $ziltoid: $ziltoid;
        $entry: $entry;
      }
    }
  },
  false
>