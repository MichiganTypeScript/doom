import type { Func, runProgram } from 'wasm-to-typescript-types'

type $get42 = Satisfies<Func, {
  kind: 'func';
  params: [];
  result: number;
    locals: [];
    instructions: [
      { kind: 'Const'; value: 42 },
    ];
}>

type $get42Plus1 = Satisfies<Func, {
  kind: 'func';
  params: [];
  result: number;
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$get42' },
      { kind: 'Const'; value: 1 },
      { kind: 'Add' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  result: number;
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$get42Plus1' },
    ];
}>

export type entry<
  arguments extends [],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $get42: $get42;
      $get42Plus1: $get42Plus1;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
