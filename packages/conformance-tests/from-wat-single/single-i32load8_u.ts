import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$value'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'Const'; value: '00000000000000000000000000000000' },
      { kind: 'LocalGet'; id: '$value' },
      { kind: 'Store'; subkind: 'I32Store' },
      { kind: 'Const'; value: '00000000000000000000000000000000' },
      { kind: 'Load'; subkind: 'I32Load8u' },
    ];
}>

export type funcs = {
  $entry: $entry;
}

export type entry<
  arguments extends [number],
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
