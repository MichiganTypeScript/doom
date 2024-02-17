import type { Func, runProgram } from 'wasm-to-typescript-types'

type $xor = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Xor' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Call'; id: '$xor' },
    ];
}>

export type entry<
  arguments extends [number, number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $xor: $xor;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
