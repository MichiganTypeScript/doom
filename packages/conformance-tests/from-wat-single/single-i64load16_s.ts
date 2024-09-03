import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$value'];
  paramsTypes: ['i64'];
  result: 'i64';
    locals: [];
    instructions: [
      { kind: 'Const'; value: '00000000000000000000000000000000' },
      { kind: 'LocalGet'; id: '$value' },
      { kind: 'Store'; subkind: 'I64Store'; offset: '00000000000000000000000000000000' },
      { kind: 'Const'; value: '00000000000000000000000000000000' },
      { kind: 'Load'; subkind: 'I64Load16s'; offset: '00000000000000000000000000000000' },
    ];
}>

export type funcs = {
  $entry: $entry;
}

export type entry<
  arguments extends [bigint],
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
