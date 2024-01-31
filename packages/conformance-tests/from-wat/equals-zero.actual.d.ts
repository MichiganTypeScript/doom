import type { Func, runProgram } from 'wasm-to-typescript-types'

type $isZero<
  RESULT extends Func = {
    kind: 'func';
    params: ['$x'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$x' },
      { kind: 'EqualsZero' },
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
      { kind: 'Call'; id: '$isZero' },
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
      $isZero: $isZero;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
