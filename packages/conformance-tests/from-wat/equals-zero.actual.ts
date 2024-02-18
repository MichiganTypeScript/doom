import type { Func, runProgram } from 'wasm-to-typescript-types'

type $isZero = Satisfies<Func, {
  kind: 'func';
  params: ['$x'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$x' },
      { kind: 'EqualsZero' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'Call'; id: '$isZero' },
    ];
}>

export type entry<
  arguments extends [number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $isZero: $isZero;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: '0';
    indirect: [];
  },
  debugMode
>
