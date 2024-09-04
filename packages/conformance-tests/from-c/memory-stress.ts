import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $__wasm_call_ctors = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: null;
    locals: [];
    instructions: [
      { kind: 'Nop'; ziltoid: 'theOmniscient' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$p0'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: ['$l1'];
    instructions: [
      { kind: 'LocalGet'; id: '$p0' },
      { kind: 'Const'; value: '00000000000000000000000000000000' },
      { kind: 'GreaterThan', signed: true, type: 'i32' },
      { kind: 'If';
        then: [
          { kind: 'Loop';
            id: '$L1';
            instructions: [
              { kind: 'LocalGet'; id: '$l1' },
              { kind: 'Const'; value: '00000000000000000000010000000000' },
              { kind: 'Add', type: 'i32' },
              { kind: 'Const'; value: '00000000000000000000000001100001' },
              { kind: 'Store'; subkind: 'I32Store8'; offset: '00000000000000000000000000000000' },
              { kind: 'LocalGet'; id: '$p0' },
              { kind: 'LocalGet'; id: '$l1' },
              { kind: 'Const'; value: '00000000000000000000000000000001' },
              { kind: 'Add', type: 'i32' },
              { kind: 'LocalTee'; id: '$l1' },
              { kind: 'NotEqual', type: 'i32' },
              { kind: 'BranchIf'; id: '$L1' },
            ];
          },
        ];
      },
      { kind: 'LocalGet'; id: '$p0' },
      { kind: 'Const'; value: '00000000000000000000010000000000' },
      { kind: 'Add', type: 'i32' },
      { kind: 'Const'; value: '00000000000000000000000000000000' },
      { kind: 'Store'; subkind: 'I32Store8'; offset: '00000000000000000000000000000000' },
      { kind: 'Const'; value: '00000000000000000000010000000000' },
    ];
}>

export type funcs = {
  $__wasm_call_ctors: $__wasm_call_ctors;
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
    globals: {
      $__dso_handle: '00000000000000000000010000000000';
      $__data_end: '00000000000011110100011001000000';
      $__stack_low: '00000000000011110100011001000000';
      $__stack_high: '00000000000100000100011001000000';
      $__global_base: '00000000000000000000010000000000';
      $__heap_base: '00000000000100000100011001000000';
      $__heap_end: '00000000000100010000000000000000';
      $__memory_base: '00000000000000000000000000000000';
      $__table_base: '00000000000000000000000000000001';
    };
    memory: {};
    memorySize: '00000000000000000000000000010001';
    indirect: [];
  },
  debugMode,
  stopAt
>
