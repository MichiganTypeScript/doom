import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $andarist = Satisfies<Func, {
  kind: 'func';
  params: ['$x'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$x' },
      { kind: 'Const'; value: '00000000000000000000000000001100' },
      { kind: 'Const'; value: '00000000000000000000000000001010' },
      { kind: 'LocalGet'; id: '$x' },
      { kind: 'Const'; value: '11111111111111111111111111111011' },
      { kind: 'GreaterThan', signed: true, type: 'i32' },
      { kind: 'Select' },
      { kind: 'Add', type: 'i32' },
      { kind: 'Const'; value: '00000000000000000000000000000111' },
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
  debugMode extends boolean = false,
  stopAt extends number = number,
> = bootstrap<
  {
    arguments: arguments;
    funcs: {
      $andarist: $andarist;
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
