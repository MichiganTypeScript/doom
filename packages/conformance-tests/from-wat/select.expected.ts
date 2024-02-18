import type { Func, runProgram } from 'wasm-to-typescript-types'

type $selectBranch = Satisfies<Func, {
  kind: 'func';
  params: ['$condition'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'Const'; value: '1010' },
      { kind: 'Const'; value: '10100' },
      { kind: 'LocalGet'; id: '$condition' },
      { kind: 'Select' },
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
      { kind: 'Call'; id: '$selectBranch' },
    ];
}>

export type entry<
  arguments extends [number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $selectBranch: $selectBranch;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: '0';
    indirect: [];
  },
  debugMode
>
