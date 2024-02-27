import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'GreaterThan', signed: true, type: 'i32' },
    ];
}>

export type entry<
  arguments extends [number, number],
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
