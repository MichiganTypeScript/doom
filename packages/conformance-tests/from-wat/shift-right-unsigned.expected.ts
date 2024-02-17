import type { Func, runProgram } from 'wasm-to-typescript-types'

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$num', '$by'];
  result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$num' },
      { kind: 'LocalGet'; id: '$by' },
      { kind: 'ShiftRight', signed: false },
    ];
}>

export type entry<
  arguments extends [number, number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
