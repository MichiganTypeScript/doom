import type { Func, runProgram } from 'wasm-to-typescript-types'

type $__wasm_call_ctors = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: never;
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$emscripten_stack_init' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$p0'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: ['$l1', '$l2', '$l3', '$l4', '$l5', '$l6', '$l7', '$l8', '$l9', '$l10', '$l11', '$l12', '$l13', '$l14'];
    instructions: [
      { kind: 'GlobalGet'; id: '$__stack_pointer' },
      { kind: 'LocalSet'; id: '$l1' },
      { kind: 'Const'; value: '00000000000000000000000000010000' },
      { kind: 'LocalSet'; id: '$l2' },
      { kind: 'LocalGet'; id: '$l1' },
      { kind: 'LocalGet'; id: '$l2' },
      { kind: 'Subtract', type: 'i32' },
      { kind: 'LocalSet'; id: '$l3' },
      { kind: 'LocalGet'; id: '$l3' },
      { kind: 'GlobalSet'; id: '$__stack_pointer' },
      { kind: 'LocalGet'; id: '$l3' },
      { kind: 'LocalGet'; id: '$p0' },
      { kind: 'I32Store8'; offset: '00000000000000000000000000001111' },
      { kind: 'LocalGet'; id: '$l3' },
      { kind: 'I32Load8u'; offset: '00000000000000000000000000001111' },
      { kind: 'LocalSet'; id: '$l4' },
      { kind: 'Const'; value: '00000000000000000000000000011000' },
      { kind: 'LocalSet'; id: '$l5' },
      { kind: 'LocalGet'; id: '$l4' },
      { kind: 'LocalGet'; id: '$l5' },
      { kind: 'ShiftLeft', type: 'i32' },
      { kind: 'LocalSet'; id: '$l6' },
      { kind: 'LocalGet'; id: '$l6' },
      { kind: 'LocalGet'; id: '$l5' },
      { kind: 'ShiftRight', signed: true, type: 'i32' },
      { kind: 'LocalSet'; id: '$l7' },
      { kind: 'LocalGet'; id: '$l7' },
      { kind: 'Call'; id: '$toupper' },
      { kind: 'LocalSet'; id: '$l8' },
      { kind: 'Const'; value: '00000000000000000000000000000000' },
      { kind: 'LocalSet'; id: '$l9' },
      { kind: 'LocalGet'; id: '$l9' },
      { kind: 'LocalGet'; id: '$l8' },
      { kind: 'I32Store8'; offset: '00000000000000000000010000000000' },
      { kind: 'Const'; value: '00000000000000000000000000000000' },
      { kind: 'LocalSet'; id: '$l10' },
      { kind: 'Const'; value: '00000000000000000000000000000000' },
      { kind: 'LocalSet'; id: '$l11' },
      { kind: 'LocalGet'; id: '$l11' },
      { kind: 'LocalGet'; id: '$l10' },
      { kind: 'I32Store8'; offset: '00000000000000000000010000000001' },
      { kind: 'Const'; value: '00000000000000000000010000000000' },
      { kind: 'LocalSet'; id: '$l12' },
      { kind: 'Const'; value: '00000000000000000000000000010000' },
      { kind: 'LocalSet'; id: '$l13' },
      { kind: 'LocalGet'; id: '$l3' },
      { kind: 'LocalGet'; id: '$l13' },
      { kind: 'Add', type: 'i32' },
      { kind: 'LocalSet'; id: '$l14' },
      { kind: 'LocalGet'; id: '$l14' },
      { kind: 'GlobalSet'; id: '$__stack_pointer' },
      { kind: 'LocalGet'; id: '$l12' },
      { kind: 'Return'; count: 1 },
    ];
}>

type $_initialize = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: never;
    locals: [];
    instructions: [
      { kind: 'Block';
        id: '$B0';
        instructions: [
          { kind: 'Const'; value: '00000000000000000000000000000001' },
          { kind: 'EqualsZero', type: 'i32' },
          { kind: 'BranchIf'; id: '$B0' },
          { kind: 'Call'; id: '$__wasm_call_ctors' },
        ];
      },
    ];
}>

type $islower = Satisfies<Func, {
  kind: 'func';
  params: ['$p0'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$p0' },
      { kind: 'Const'; value: '11111111111111111111111110011111' },
      { kind: 'Add', type: 'i32' },
      { kind: 'Const'; value: '00000000000000000000000000011010' },
      { kind: 'LessThan', signed: false, type: 'i32' },
    ];
}>

type $toupper = Satisfies<Func, {
  kind: 'func';
  params: ['$p0'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$p0' },
      { kind: 'Const'; value: '00000000000000000000000001011111' },
      { kind: 'And', type: 'i32' },
      { kind: 'LocalGet'; id: '$p0' },
      { kind: 'LocalGet'; id: '$p0' },
      { kind: 'Call'; id: '$islower' },
      { kind: 'Select' },
    ];
}>

type $stackSave = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'GlobalGet'; id: '$__stack_pointer' },
    ];
}>

type $stackRestore = Satisfies<Func, {
  kind: 'func';
  params: ['$p0'];
  paramsTypes: ['i32'];
  result: never;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$p0' },
      { kind: 'GlobalSet'; id: '$__stack_pointer' },
    ];
}>

type $stackAlloc = Satisfies<Func, {
  kind: 'func';
  params: ['$p0'];
  paramsTypes: ['i32'];
  result: 'i32';
    locals: ['$l1', '$l2'];
    instructions: [
      { kind: 'GlobalGet'; id: '$__stack_pointer' },
      { kind: 'LocalGet'; id: '$p0' },
      { kind: 'Subtract', type: 'i32' },
      { kind: 'Const'; value: '11111111111111111111111111110000' },
      { kind: 'And', type: 'i32' },
      { kind: 'LocalTee'; id: '$l1' },
      { kind: 'GlobalSet'; id: '$__stack_pointer' },
      { kind: 'LocalGet'; id: '$l1' },
    ];
}>

type $emscripten_stack_init = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: never;
    locals: [];
    instructions: [
      { kind: 'Const'; value: '00000000010100000000010000010000' },
      { kind: 'GlobalSet'; id: '$__stack_base' },
      { kind: 'Const'; value: '00000000000000000000010000001000' },
      { kind: 'Const'; value: '00000000000000000000000000001111' },
      { kind: 'Add', type: 'i32' },
      { kind: 'Const'; value: '11111111111111111111111111110000' },
      { kind: 'And', type: 'i32' },
      { kind: 'GlobalSet'; id: '$__stack_end' },
    ];
}>

type $emscripten_stack_get_free = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'GlobalGet'; id: '$__stack_pointer' },
      { kind: 'GlobalGet'; id: '$__stack_end' },
      { kind: 'Subtract', type: 'i32' },
    ];
}>

type $emscripten_stack_get_base = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'GlobalGet'; id: '$__stack_base' },
    ];
}>

type $emscripten_stack_get_end = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'GlobalGet'; id: '$__stack_end' },
    ];
}>

type $__errno_location = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'Const'; value: '00000000000000000000010000000100' },
    ];
}>

export type entry<
  arguments extends [number],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $__wasm_call_ctors: $__wasm_call_ctors;
      $entry: $entry;
      $_initialize: $_initialize;
      $islower: $islower;
      $toupper: $toupper;
      $stackSave: $stackSave;
      $stackRestore: $stackRestore;
      $stackAlloc: $stackAlloc;
      $emscripten_stack_init: $emscripten_stack_init;
      $emscripten_stack_get_free: $emscripten_stack_get_free;
      $emscripten_stack_get_base: $emscripten_stack_get_base;
      $emscripten_stack_get_end: $emscripten_stack_get_end;
      $__errno_location: $__errno_location;
    };
    globals: {
      $__stack_pointer: '00000000010100000000010000010000';
      $__stack_end: '00000000000000000000000000000000';
      $__stack_base: '00000000000000000000000000000000';
    };
    memory: {};
    memorySize: '00000000000000000000000100000000';
    indirect: ['$__wasm_call_ctors'];
  },
  debugMode
>
