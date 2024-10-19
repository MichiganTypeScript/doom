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

type $multiply = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'LocalGet'; id: '$b' },
    { kind: 'Multiply', type: 'i32' },
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
    { kind: 'Const'; value: '00000000000000000000000000000001' },
    { kind: 'CallIndirect'; id: '$T0' },
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'LocalGet'; id: '$b' },
    { kind: 'Const'; value: '00000000000000000000000000000010' },
    { kind: 'CallIndirect'; id: '$T0' },
    { kind: 'Add', type: 'i32' },
  ];
}>

export type funcs = {
  $add: $add;
  $multiply: $multiply;
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
      '00000000000000000000000000000001' : '$add';
      '00000000000000000000000000000010' : '$multiply';
    };
  },
  debugMode,
  stopAt
>
