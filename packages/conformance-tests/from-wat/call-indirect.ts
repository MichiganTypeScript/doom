import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $add = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'LocalGet'; id: '$b' },
    { kind: 'Add', type: 'i32' },
  ];
}>

type $indirect_call = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'LocalGet'; id: '$b' },
    { kind: 'Const'; value: '00000000000000000000000000000000' },
    { kind: 'CallIndirect'; id: '$__indirect_function_table' },
  ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'LocalGet'; id: '$b' },
    { kind: 'Call'; id: '$indirect_call' },
  ];
}>

export type funcs = {
  $add: $add;
  $indirect_call: $indirect_call;
  $entry: $entry;
}

export type entry<
  arguments extends [number, number],
  debugMode extends boolean = false,
  stopAt extends number = number,
> = bootstrap<
  {
    arguments: arguments;
    funcs: funcs;
    globals: {};
    memory: {};
    memorySize: '00000000000000000000000000000000';
    indirect: {
      '00000000000000000000000000000000' : '$add';
    };
  },
  debugMode,
  stopAt
>
