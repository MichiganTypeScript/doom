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
      { kind: 'Store'; subkind: 'I64Store16'; offset: '00000000000000000000000000000000' },
      { kind: 'Const'; value: '00000000000000000000000000000000' },
      { kind: 'Load'; subkind: 'I64Load'; offset: '00000000000000000000000000000000' },
    ];
}>

export type entry<
  arguments extends [bigint],
  debugMode extends boolean = false,
  stopAt extends number = number,
> = bootstrap<
  {
    arguments: arguments;
    funcs: {
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: '00000000000000000000000000000001';
    indirect: [];
  },
  debugMode,
  stopAt
>
