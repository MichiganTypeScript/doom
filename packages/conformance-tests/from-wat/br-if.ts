import type { Func, bootstrap } from 'wasm-to-typescript-types'

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
                  { kind: 'EqualsZero', type: 'i32' },
                  { kind: 'BranchIf'; id: '$inner_block' },
                  { kind: 'LocalGet'; id: '$x' },
                  { kind: 'Const'; value: '00000000000000000000000000000001' },
                  { kind: 'Equals', type: 'i32' },
                  { kind: 'BranchIf'; id: '$middle_block' },
                  { kind: 'Const'; value: '00000000000000000000000000000111' },
                  { kind: 'LocalSet'; id: '$result' },
                  { kind: 'Branch'; id: '$outer_block' },
                ];
              },
              { kind: 'Const'; value: '00000000000000000000000000101010' },
              { kind: 'LocalSet'; id: '$result' },
              { kind: 'Branch'; id: '$outer_block' },
            ];
          },
          { kind: 'Const'; value: '00000000000000000000000001100011' },
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

export type funcs = {
  $brif: $brif;
  $entry: $entry;
}

export type entry<
  arguments extends [number],
  debugMode extends boolean = false,
  stopAt extends number = number,
> = bootstrap<
  {
    arguments: arguments;
    funcs: funcs;
    globals: {};
    memory: {};
    memorySize: '00000000000000000000000000000000';
    indirect: [];
  },
  debugMode,
  stopAt
>
