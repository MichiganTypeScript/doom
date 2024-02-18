import type { Func, runProgram } from 'wasm-to-typescript-types'

type $switch_like = Satisfies<Func, {
  kind: 'func';
  params: ['$p'];
  paramsTypes: ['i32'];
  result: 'i32';
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
                  { kind: 'Const'; value: '00000000000000000000000001100100' },
                  { kind: 'Return'; count: 1 },
                ];
              },
              { kind: 'Const'; value: '00000000000000000000000001100101' },
              { kind: 'Return'; count: 1 },
            ];
          },
          { kind: 'Const'; value: '00000000000000000000000001100110' },
          { kind: 'Return'; count: 1 },
        ];
      },
      { kind: 'Const'; value: '00000000000000000000000001100111' },
      { kind: 'Return'; count: 1 },
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
      { kind: 'Call'; id: '$switch_like' },
    ];
}>

export type entry<
  arguments extends [number],
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
    memorySize: '00000000000000000000000000000000';
    indirect: [];
  },
  debugMode
>
