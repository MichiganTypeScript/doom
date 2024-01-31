import type { Func, runProgram } from 'wasm-to-typescript-types'

type $abs_f64<
  RESULT extends Func = {
    kind: 'func';
    params: ['$x'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$x' },
      { kind: 'AbsoluteValue' },
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
      { kind: 'Call'; id: '$abs_f64' },
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
      $abs_f64: $abs_f64;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
