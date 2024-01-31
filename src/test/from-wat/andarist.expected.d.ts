import { Func } from '../../types.ts'
import { runProgram } from '../../program.ts'

type $andarist<
  RESULT extends Func = {
    kind: 'func';
    params: ['$x'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$x' },
      { kind: 'Const'; value: 12 },
      { kind: 'Const'; value: 10 },
      { kind: 'LocalGet'; id: '$x' },
      { kind: 'Const'; value: -5 },
      { kind: 'GreaterThan' },
      { kind: 'Select' },
      { kind: 'Add' },
      { kind: 'Const'; value: 7 },
      { kind: 'Add' },
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
      { kind: 'Call'; id: '$andarist' },
    ];
  }
> = RESULT

export type entry<
  arguments extends number[] = [],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $andarist: $andarist;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
