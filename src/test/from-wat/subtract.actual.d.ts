import { ModuleField } from '../../module.ts'
import { runProgram } from '../../program.ts'

type $minusOne<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: ['$a'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'Const'; value: 1 },
      { kind: 'Subtract' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: ['$a'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'Call'; id: '$minusOne' },
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
        $minusOne: $minusOne;
        $entry: $entry;
      };
      globals: {};
    };
    memory: {};
    memorySize: 0;
  },
  debugMode
>