import type { Func, runProgram } from 'wasm-to-typescript-types'

type $main = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: ['$var'];
    instructions: [
      { kind: 'Const'; value: 10 },
      { kind: 'LocalSet'; id: '$var' },
      { kind: 'LocalGet'; id: '$var' },
      { kind: 'Const'; value: 1 },
      { kind: 'Add', type: 'i32' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$main' },
    ];
}>

export type entry<
  arguments extends [],
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
