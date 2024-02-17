import type { Func, runProgram } from 'wasm-to-typescript-types'

type $storeValue = Satisfies<Func, {
  kind: 'func';
  params: ['$index', '$value'];
  result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'Const'; value: 4 },
      { kind: 'Multiply' },
      { kind: 'LocalGet'; id: '$value' },
      { kind: 'I32Store'; offset: 0 },
    ];
}>

type $loadValue = Satisfies<Func, {
  kind: 'func';
  params: ['$index'];
  result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'Const'; value: 4 },
      { kind: 'Multiply' },
      { kind: 'I32Load'; offset: 0 },
    ];
}>

type $foo = Satisfies<Func, {
  kind: 'func';
  params: ['$a'];
  result: number;
    locals: [];
    instructions: [
      { kind: 'Const'; value: 2 },
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'Call'; id: '$storeValue' },
      { kind: 'Const'; value: 2 },
      { kind: 'Call'; id: '$loadValue' },
      { kind: 'Const'; value: 1 },
      { kind: 'Add' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$value'];
  result: number;
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
    memorySize: 1;
    indirect: [];
  },
  debugMode
>
