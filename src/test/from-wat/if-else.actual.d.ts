import { Func, runProgram } from '../../program.ts'

type $if<
  RESULT extends Func = {
    kind: 'func';
    params: ['$n', '$control'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$n' },
      { kind: 'LocalGet'; id: '$control' },
      { kind: 'Const'; value: 0 },
      { kind: 'GreaterThanOrEqual' },
      { kind: 'If';
        then: [
          { kind: 'Const'; value: 1 },
        ];
        else: [
          { kind: 'Const'; value: -1 },
        ];
      },
      { kind: 'Add' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends Func = {
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
    funcs: {
      $if: $if;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
