import type { Func, runProgram } from 'wasm-to-typescript-types'

type $return = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'Const'; value: 0 },
      { kind: 'Const'; value: 1 },
      { kind: 'Const'; value: 2 },
      { kind: 'Const'; value: 3 },
      { kind: 'Const'; value: 4 },
      { kind: 'Return'; count: 1 },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$return' },
    ];
}>

export type entry<
  arguments extends [],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $return: $return;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
