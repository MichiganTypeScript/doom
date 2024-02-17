import type { Func, runProgram } from 'wasm-to-typescript-types'

type $andarist = Satisfies<Func, {
  kind: 'func';
  params: ['$x'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$x' },
      { kind: 'Const'; value: 12 },
      { kind: 'Const'; value: 10 },
      { kind: 'LocalGet'; id: '$x' },
      { kind: 'Const'; value: -5 },
      { kind: 'GreaterThan' },
      { kind: 'Select' },
      { kind: 'Add', type: 'i32' },
      { kind: 'Const'; value: 7 },
      { kind: 'Add', type: 'i32' },
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
      { kind: 'Call'; id: '$andarist' },
    ];
}>

export type entry<
  arguments extends [number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $andarist: $andarist;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
