import { ModuleField } from '../../module.ts'
import { runProgram } from '../../program.ts'

type $setGlobal<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Const'; value: 42 },
      { kind: 'GlobalSet'; id: '$myGlobal' }
    ];
  }
> = RESULT

type $getGlobal<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'GlobalGet'; id: '$myGlobal' }
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
      { kind: 'Call'; id: '$setGlobal' },
      { kind: 'Call'; id: '$getGlobal' }
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
        $setGlobal: $setGlobal;
        $getGlobal: $getGlobal;
        $entry: $entry;
      };
      globals: {
        $myGlobal: 0;
      };
    };
    memory: [];
  },
  false
>