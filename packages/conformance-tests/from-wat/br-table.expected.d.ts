import { Func, runProgram } from 'wasm-to-typescript-types'

type $switch_like<
  RESULT extends Func = {
    kind: 'func';
    params: ['$p'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Block';
        id: '$B0';
        instructions: [
          { kind: 'Block';
            id: '$B1';
            instructions: [
              { kind: 'Block';
                id: '$B2';
                instructions: [
                  { kind: 'Block';
                    id: '$B3';
                    instructions: [
                      { kind: 'LocalGet'; id: '$p' },
                      { kind: 'BranchTable';
                        branches: { 0: '$B2', 1: '$B1', 2: '$B0' };
                        default: '$B3';
                      }
                    ];
                  },
                  { kind: 'Const'; value: 100 },
                  { kind: 'Return'; count: 1 },
                ];
              },
              { kind: 'Const'; value: 101 },
              { kind: 'Return'; count: 1 },
            ];
          },
          { kind: 'Const'; value: 102 },
          { kind: 'Return'; count: 1 },
        ];
      },
      { kind: 'Const'; value: 103 },
      { kind: 'Return'; count: 1 },
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
      { kind: 'Call'; id: '$switch_like' },
    ];
  }
> = RESULT

export type entry<
  arguments extends number[] = [],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $switch_like: $switch_like;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
