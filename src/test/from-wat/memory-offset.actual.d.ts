import { Func, runProgram } from '../../program.ts'

type $foo<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b', '$c'];
    result: number;
    locals: ['$start'];
    instructions: [
      { kind: 'Const'; value: 0 },
      { kind: 'LocalSet'; id: '$start' },
      { kind: 'LocalGet'; id: '$start' },
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'Store'; offset: 0; align: 4 },
      { kind: 'LocalGet'; id: '$start' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Store'; offset: 4; align: 4 },
      { kind: 'LocalGet'; id: '$start' },
      { kind: 'LocalGet'; id: '$c' },
      { kind: 'Store'; offset: 8; align: 4 },
      { kind: 'LocalGet'; id: '$start' },
      { kind: 'Load'; offset: 8; align: 4 },
      { kind: 'LocalGet'; id: '$start' },
      { kind: 'Load'; offset: 4; align: 4 },
      { kind: 'LocalGet'; id: '$start' },
      { kind: 'Load'; offset: 0; align: 4 },
      { kind: 'Subtract' },
      { kind: 'Add' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b', '$c'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'LocalGet'; id: '$c' },
      { kind: 'Call'; id: '$foo' },
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
      $foo: $foo;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 1;
    indirect: [];
  },
  debugMode
>
