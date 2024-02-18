import type { Func, runProgram } from 'wasm-to-typescript-types'

type $storeValue = Satisfies<Func, {
  kind: 'func';
  params: ['$index', '$value'];
  paramsTypes: ['i32', 'i32'];
  result: never;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'Const'; value: '00000000000000000000000000000100' },
      { kind: 'Multiply' },
      { kind: 'LocalGet'; id: '$value' },
      { kind: 'I32Store'; offset: 0 },
    ];
}>

type $loadValue = Satisfies<Func, {
  kind: 'func';
  params: ['$index'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'Const'; value: '00000000000000000000000000000100' },
      { kind: 'Multiply' },
      { kind: 'I32Load'; offset: 0 },
    ];
}>

type $foo = Satisfies<Func, {
  kind: 'func';
  params: ['$a'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'Const'; value: '00000000000000000000000000000010' },
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'Call'; id: '$storeValue' },
      { kind: 'Const'; value: '00000000000000000000000000000010' },
      { kind: 'Call'; id: '$loadValue' },
      { kind: 'Const'; value: '00000000000000000000000000000001' },
      { kind: 'Add', type: 'i32' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$value'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$value' },
      { kind: 'Call'; id: '$foo' },
    ];
}>

export type entry<
  arguments extends [number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $storeValue: $storeValue;
      $loadValue: $loadValue;
      $foo: $foo;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: '00000000000000000000000000000001';
    indirect: [];
  },
  debugMode
>
