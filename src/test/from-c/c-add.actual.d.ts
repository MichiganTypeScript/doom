import { Func } from '../../types.ts'
import { runProgram } from '../../program.ts'

type $__wasm_call_ctors<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$emscripten_stack_init' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends Func = {
    kind: 'func';
    params: ['$p0', '$p1'];
    result: number;
    locals: ['$l2', '$l3', '$l4', '$l5', '$l6', '$l7'];
    instructions: [
      { kind: 'GlobalGet'; id: '$__stack_pointer' },
      { kind: 'LocalSet'; id: '$l2' },
      { kind: 'Const'; value: 16 },
      { kind: 'LocalSet'; id: '$l3' },
      { kind: 'LocalGet'; id: '$l2' },
      { kind: 'LocalGet'; id: '$l3' },
      { kind: 'Subtract' },
      { kind: 'LocalSet'; id: '$l4' },
      { kind: 'LocalGet'; id: '$l4' },
      { kind: 'LocalGet'; id: '$p0' },
      { kind: 'I32Store'; offset: 12 },
      { kind: 'LocalGet'; id: '$l4' },
      { kind: 'LocalGet'; id: '$p1' },
      { kind: 'I32Store'; offset: 8 },
      { kind: 'LocalGet'; id: '$l4' },
      { kind: 'I32Load'; offset: 12 },
      { kind: 'LocalSet'; id: '$l5' },
      { kind: 'LocalGet'; id: '$l4' },
      { kind: 'I32Load'; offset: 8 },
      { kind: 'LocalSet'; id: '$l6' },
      { kind: 'LocalGet'; id: '$l5' },
      { kind: 'LocalGet'; id: '$l6' },
      { kind: 'Add' },
      { kind: 'LocalSet'; id: '$l7' },
      { kind: 'LocalGet'; id: '$l7' },
      { kind: 'Return'; count: 1 },
    ];
  }
> = RESULT

type $_initialize<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Block';
        id: '$B0';
        instructions: [
          { kind: 'Const'; value: 1 },
          { kind: 'EqualsZero' },
          { kind: 'BranchIf'; id: '$B0' },
          { kind: 'Call'; id: '$__wasm_call_ctors' },
        ];
      },
    ];
  }
> = RESULT

type $stackSave<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'GlobalGet'; id: '$__stack_pointer' },
    ];
  }
> = RESULT

type $stackRestore<
  RESULT extends Func = {
    kind: 'func';
    params: ['$p0'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$p0' },
      { kind: 'GlobalSet'; id: '$__stack_pointer' },
    ];
  }
> = RESULT

type $stackAlloc<
  RESULT extends Func = {
    kind: 'func';
    params: ['$p0'];
    result: number;
    locals: ['$l1', '$l2'];
    instructions: [
      { kind: 'GlobalGet'; id: '$__stack_pointer' },
      { kind: 'LocalGet'; id: '$p0' },
      { kind: 'Subtract' },
      { kind: 'Const'; value: -16 },
      { kind: 'And' },
      { kind: 'LocalTee'; id: '$l1' },
      { kind: 'GlobalSet'; id: '$__stack_pointer' },
      { kind: 'LocalGet'; id: '$l1' },
    ];
  }
> = RESULT

type $emscripten_stack_init<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Const'; value: 5243920 },
      { kind: 'GlobalSet'; id: '$__stack_base' },
      { kind: 'Const'; value: 1028 },
      { kind: 'Const'; value: 15 },
      { kind: 'Add' },
      { kind: 'Const'; value: -16 },
      { kind: 'And' },
      { kind: 'GlobalSet'; id: '$__stack_end' },
    ];
  }
> = RESULT

type $emscripten_stack_get_free<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'GlobalGet'; id: '$__stack_pointer' },
      { kind: 'GlobalGet'; id: '$__stack_end' },
      { kind: 'Subtract' },
    ];
  }
> = RESULT

type $emscripten_stack_get_base<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'GlobalGet'; id: '$__stack_base' },
    ];
  }
> = RESULT

type $emscripten_stack_get_end<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'GlobalGet'; id: '$__stack_end' },
    ];
  }
> = RESULT

type $__errno_location<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Const'; value: 1024 },
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
      $__wasm_call_ctors: $__wasm_call_ctors;
      $entry: $entry;
      $_initialize: $_initialize;
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
      $__stack_pointer: 5243920;
      $__stack_end: 0;
      $__stack_base: 0;
    };
    memory: {};
    memorySize: 256;
    indirect: ['$__wasm_call_ctors'];
  },
  debugMode
>
