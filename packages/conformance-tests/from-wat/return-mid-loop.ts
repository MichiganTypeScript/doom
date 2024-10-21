import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $f5 = Satisfies<Func, {
  kind: 'func';
  params: ['$p0', '$p1'];
  paramsTypes: ['i32', 'i32'];
  resultTypes: [];
  locals: ['$l2', '$l3', '$l4'];
  instructions: [
    { kind: 'Loop';
      id: '$L0';
      instructions: [
        { kind: 'LocalGet'; id: '$p0' },
        { kind: 'LocalGet'; id: '$l2' },
        { kind: 'Add', type: 'i32' },
        { kind: 'LocalSet'; id: '$l3' },
        { kind: 'Block';
          id: '$B1';
          instructions: [
            { kind: 'LocalGet'; id: '$l2' },
            { kind: 'Const'; value: '00000000000000000000000000001000' },
            { kind: 'NotEqual', type: 'i32' },
            { kind: 'If';
              then: [
                { kind: 'LocalGet'; id: '$p1' },
                { kind: 'LocalGet'; id: '$l2' },
                { kind: 'Add', type: 'i32' },
                { kind: 'Load'; subkind: 'I32Load8u' },
                { kind: 'LocalTee'; id: '$l4' },
                { kind: 'BranchIf'; id: '$B1' },
              ];
            },
            { kind: 'Const'; value: '00000000000000000000000000001000' },
            { kind: 'LocalGet'; id: '$l2' },
            { kind: 'Subtract', type: 'i32' },
            { kind: 'LocalSet'; id: '$p0' },
            { kind: 'Const'; value: '00000000000000000000000000000000' },
            { kind: 'LocalSet'; id: '$l2' },
            { kind: 'Loop';
              id: '$L3';
              instructions: [
                { kind: 'LocalGet'; id: '$p0' },
                { kind: 'LocalGet'; id: '$l2' },
                { kind: 'NotEqual', type: 'i32' },
                { kind: 'If';
                  then: [
                    { kind: 'LocalGet'; id: '$l2' },
                    { kind: 'LocalGet'; id: '$l3' },
                    { kind: 'Add', type: 'i32' },
                    { kind: 'Const'; value: '00000000000000000000000000000000' },
                    { kind: 'Store'; subkind: 'I32Store8' },
                    { kind: 'LocalGet'; id: '$l2' },
                    { kind: 'Const'; value: '00000000000000000000000000000001' },
                    { kind: 'Add', type: 'i32' },
                    { kind: 'LocalSet'; id: '$l2' },
                    { kind: 'Branch'; id: '$L3' },
                  ];
                },
              ];
            },
            { kind: 'Return'; count: 0 },
          ];
        },
        { kind: 'LocalGet'; id: '$l3' },
        { kind: 'LocalGet'; id: '$l4' },
        { kind: 'Store'; subkind: 'I32Store8' },
        { kind: 'LocalGet'; id: '$l2' },
        { kind: 'Const'; value: '00000000000000000000000000000001' },
        { kind: 'Add', type: 'i32' },
        { kind: 'LocalSet'; id: '$l2' },
        { kind: 'Branch'; id: '$L0' },
      ];
    },
    { kind: 'Unreachable' },
  ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  resultTypes: ['i32'];
  locals: [];
  instructions: [
    { kind: 'Const'; value: '00000000000000001110110010001000' },
    { kind: 'Const'; value: '00000000000000000000000001010000' },
    { kind: 'Store'; subkind: 'I32Store8' },
    { kind: 'Const'; value: '00000000000001100000001000001000' },
    { kind: 'Const'; value: '00000000000000000000000001010000' },
    { kind: 'Store'; subkind: 'I32Store8' },
    { kind: 'LocalGet'; id: '$a' },
    { kind: 'LocalGet'; id: '$b' },
    { kind: 'Call'; id: '$f5' },
    { kind: 'Const'; value: '00000000000000000000000000001010' },
  ];
}>

export type funcs = {
  $f5: $f5;
  $entry: $entry;
}

export type entry<
  arguments extends [number, number],
  debugMode extends boolean = false,
  stopAt extends number = number,
> = bootstrap<
  {
    arguments: arguments;
    funcs: funcs;
    globals: {};
    memory: {};
    memorySize: '00000000000000000000000000000111';
    indirect: {};
  },
  debugMode,
  stopAt
>
