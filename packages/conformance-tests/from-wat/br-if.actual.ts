import type { Func, runProgram } from 'wasm-to-typescript-types'

type $brif = Satisfies<Func, {
  kind: 'func';
  params: ['$x'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: ['$result'];
    instructions: [
      { kind: 'Block';
        id: '$outer_block';
        instructions: [
          { kind: 'Block';
            id: '$middle_block';
            instructions: [
              { kind: 'Block';
                id: '$inner_block';
                instructions: [
                  { kind: 'LocalGet'; id: '$x' },
                  { kind: 'EqualsZero' },
                  { kind: 'BranchIf'; id: '$inner_block' },
                  { kind: 'LocalGet'; id: '$x' },
                  { kind: 'Const'; value: 1 },
                  { kind: 'Equals' },
                  { kind: 'BranchIf'; id: '$middle_block' },
                  { kind: 'Const'; value: 7 },
                  { kind: 'LocalSet'; id: '$result' },
                  { kind: 'Branch'; id: '$outer_block' },
                ];
              },
              { kind: 'Const'; value: 42 },
              { kind: 'LocalSet'; id: '$result' },
              { kind: 'Branch'; id: '$outer_block' },
            ];
          },
          { kind: 'Const'; value: 99 },
          { kind: 'LocalSet'; id: '$result' },
        ];
      },
      { kind: 'LocalGet'; id: '$result' },
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
      { kind: 'Call'; id: '$brif' },
    ];
}>

export type entry<
  arguments extends [number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $brif: $brif;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
