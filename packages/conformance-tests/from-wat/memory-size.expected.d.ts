import type { Func, runProgram } from 'wasm-to-typescript-types'

type $foo<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'MemorySize' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
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
    memorySize: 42;
    indirect: [];
  },
  debugMode
>
