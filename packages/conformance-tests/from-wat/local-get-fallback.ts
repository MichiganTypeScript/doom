import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: ['$l1'];
    instructions: [
      { kind: 'LocalGet'; id: '$l1' },
    ];
}>

export type entry<
  arguments extends [],
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
    memorySize: '00000000000000000000000000000000';
    indirect: [];
  },
  debugMode,
  stopAt
>
