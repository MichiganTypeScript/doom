import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $foo = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b', '$c'];
  paramsTypes: ['i32', 'i32', 'i32'];
  resultTypes: ['i32'];
  locals: ['$start'];
  instructions: [
    { kind: 'Const'; value: '00000000000000000000000000000000' },
    { kind: 'LocalSet'; id: '$start' },
    { kind: 'LocalGet'; id: '$start' },
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'Store'; subkind: 'I32Store' },
    { kind: 'LocalGet'; id: '$start' },
    { kind: 'LocalGet'; id: '$b' },
    { kind: 'Store'; subkind: 'I32Store'; offset: '00000000000000000000000000000100' },
    { kind: 'LocalGet'; id: '$start' },
    { kind: 'LocalGet'; id: '$c' },
    { kind: 'Store'; subkind: 'I32Store'; offset: '00000000000000000000000000001000' },
    { kind: 'LocalGet'; id: '$start' },
    { kind: 'Load'; subkind: 'I32Load'; offset: '00000000000000000000000000001000' },
    { kind: 'LocalGet'; id: '$start' },
    { kind: 'Load'; subkind: 'I32Load'; offset: '00000000000000000000000000000100' },
    { kind: 'LocalGet'; id: '$start' },
    { kind: 'Load'; subkind: 'I32Load' },
    { kind: 'Subtract', type: 'i32' },
    { kind: 'Add', type: 'i32' },
  ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b', '$c'];
  paramsTypes: ['i32', 'i32', 'i32'];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'LocalGet'; id: '$b' },
    { kind: 'LocalGet'; id: '$c' },
    { kind: 'Call'; id: '$foo' },
  ];
}>

export type funcs = {
  $foo: $foo;
  $entry: $entry;
}

export type entry<
  arguments extends [number, number, number],
  debugMode extends boolean = false,
  stopAt extends number = number,
> = bootstrap<
  {
    arguments: arguments;
    funcs: funcs;
    globals: {};
    memory: {};
    memorySize: '00000000000000000000000000000001';
    indirect: [];
  },
  debugMode,
  stopAt
>
