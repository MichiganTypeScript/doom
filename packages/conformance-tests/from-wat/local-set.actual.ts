import type { Func, runProgram } from 'wasm-to-typescript-types'

type $main = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: ['$var'];
    instructions: [
      { kind: 'Const'; value: '00000000000000000000000000001010' },
      { kind: 'LocalSet'; id: '$var' },
      { kind: 'LocalGet'; id: '$var' },
      { kind: 'Const'; value: '00000000000000000000000000000001' },
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
  debugMode extends boolean = false,
  stopAt extends number = number,
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $main: $main;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: '00000000000000000000000000000000';
    indirect: [];
  },
  debugMode,
  stopAt
>
