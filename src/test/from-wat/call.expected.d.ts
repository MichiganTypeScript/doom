import { ModuleField } from '../../module.ts'
import { runProgram } from '../../program.ts'

type $get42<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Const'; value: 42 }
    ];
  }
> = RESULT

type $get42Plus1<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$get42' },
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
      { kind: 'Call'; id: '$get42Plus1' }
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
        $get42: $get42;
        $get42Plus1: $get42Plus1;
        $entry: $entry;
      };
      globals: {};
    };
    memory: [];
  },
  false
>