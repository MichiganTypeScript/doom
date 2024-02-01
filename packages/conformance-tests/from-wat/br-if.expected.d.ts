import type { Func, runProgram } from 'wasm-to-typescript-types'

type $brif<
  RESULT extends Func = {
    kind: 'func';
    params: ['$x'];
    result: number;
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
  }
> = RESULT

type $entry<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'Call'; id: '$brif' },
    ];
  }
> = RESULT

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
