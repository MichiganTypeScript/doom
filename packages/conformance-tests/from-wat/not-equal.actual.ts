import type { Func, runProgram } from 'wasm-to-typescript-types'

type $main = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'NotEqual' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Call'; id: '$main' },
    ];
}>

export type entry<
  arguments extends [number, number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $main: $main;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
