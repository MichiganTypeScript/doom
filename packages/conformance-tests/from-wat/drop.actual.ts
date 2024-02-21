import type { Func, runProgram } from 'wasm-to-typescript-types'

type $drop = Satisfies<Func, {
  kind: 'func';
  params: ['$first_arg', '$second_arg'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$first_arg' },
      { kind: 'LocalGet'; id: '$second_arg' },
      { kind: 'Drop' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$first_arg', '$second_arg'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$second_arg' },
      { kind: 'LocalGet'; id: '$first_arg' },
      { kind: 'Call'; id: '$drop' },
    ];
}>

export type entry<
  arguments extends [number, number],
  debugMode extends boolean = false,
  stopAt extends number = number,
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $drop: $drop;
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
