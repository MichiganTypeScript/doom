import { ModuleField } from '../../module.ts'
import { runProgram } from '../../program.ts'

type $isZero<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: ['$x'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$x' },
      { kind: 'EqualsZero' }
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
      { kind: 'Call'; id: '$isZero' }
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
        $isZero: $isZero;
        $entry: $entry;
      };
      globals: {};
    }
  },
  false
>