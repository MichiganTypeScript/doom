import type { Func, runProgram } from 'wasm-to-typescript-types'

type $my_loop = Satisfies<Func, {
  kind: 'func';
  params: ['$input'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: ['$i', '$result'];
    instructions: [
      { kind: 'Const'; value: 0 },
      { kind: 'LocalSet'; id: '$i' },
      { kind: 'LocalGet'; id: '$input' },
      { kind: 'LocalSet'; id: '$result' },
      { kind: 'Loop';
        id: '$my_loop';
        instructions: [
          { kind: 'LocalGet'; id: '$i' },
          { kind: 'Const'; value: 1 },
          { kind: 'Add', type: 'i32' },
          { kind: 'LocalSet'; id: '$i' },
          { kind: 'LocalGet'; id: '$result' },
          { kind: 'Const'; value: 2 },
          { kind: 'Multiply' },
          { kind: 'LocalSet'; id: '$result' },
          { kind: 'LocalGet'; id: '$i' },
          { kind: 'Const'; value: 3 },
          { kind: 'LessThan' },
          { kind: 'BranchIf'; id: '$my_loop' },
        ];
      },
      { kind: 'LocalGet'; id: '$result' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'Call'; id: '$my_loop' },
    ];
}>

export type entry<
  arguments extends [number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $my_loop: $my_loop;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
