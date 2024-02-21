import type { Func, runProgram } from 'wasm-to-typescript-types'

type $return = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'Const'; value: '00000000000000000000000000000000' },
      { kind: 'Const'; value: '00000000000000000000000000000001' },
      { kind: 'Const'; value: '00000000000000000000000000000010' },
      { kind: 'Const'; value: '00000000000000000000000000000011' },
      { kind: 'Const'; value: '00000000000000000000000000000100' },
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
  debugMode extends boolean = false,
  stopAt extends number = number,
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $return: $return;
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
