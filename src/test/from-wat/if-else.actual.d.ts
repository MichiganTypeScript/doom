import { ModuleField } from '../../module.ts'
import { runProgram } from '../../program.ts'

type $if<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: ['$n', '$control'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$n' },
      { kind: 'LocalGet'; id: '$control' },
      { kind: 'Const'; value: 0 },
      { kind: 'GreaterThanOrEqual' },
      { kind: 'Halt' },
      { kind: 'If' },
      { kind: 'Const'; value: 1 },
      { kind: 'Else' },
      { kind: 'Const'; value: -1 },
      { kind: 'End' },
      { kind: 'Add' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Call'; id: '$if' },
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
        $if: $if;
        $entry: $entry;
      };
      globals: {};
    };
    memory: {};
    memorySize: 0;
  },
  debugMode
>