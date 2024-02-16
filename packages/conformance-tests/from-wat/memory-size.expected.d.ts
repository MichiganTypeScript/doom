import type { Func, runProgram } from 'wasm-to-typescript-types'

type $foo = Satisfies<Func, {
  kind: 'func';
  params: [];
  result: number;
    locals: [];
    instructions: [
      { kind: 'MemorySize' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  result: number;
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$foo' },
    ];
}>

export type entry<
  arguments extends [],
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
