import { Func, runProgram } from '../../program.ts'

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
    params: ['$a', '$b'];
    result: number;
    locals: ['$stack_pointer', '$stack_size', '$this_stack', '$stack_a', '$stack_b', '$result'];
    instructions: [
      { kind: 'GlobalGet'; id: '$__stack_pointer' },
      { kind: 'LocalSet'; id: '$stack_pointer' },
      { kind: 'Const'; value: 16 },
      { kind: 'LocalSet'; id: '$stack_size' },
      { kind: 'LocalGet'; id: '$stack_pointer' },
      { kind: 'LocalGet'; id: '$stack_size' },
      { kind: 'Subtract' },
      { kind: 'LocalSet'; id: '$this_stack' },
      { kind: 'LocalGet'; id: '$this_stack' },
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'I32Store'; offset: 12 },
      { kind: 'LocalGet'; id: '$this_stack' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'I32Store'; offset: 8 },
      { kind: 'LocalGet'; id: '$this_stack' },
      { kind: 'I32Load'; offset: 12 },
      { kind: 'LocalSet'; id: '$stack_a' },
      { kind: 'LocalGet'; id: '$this_stack' },
      { kind: 'I32Load'; offset: 8 },
      { kind: 'LocalSet'; id: '$stack_b' },
      { kind: 'LocalGet'; id: '$stack_a' },
      { kind: 'LocalGet'; id: '$stack_b' },
      { kind: 'Add' },
      { kind: 'LocalSet'; id: '$result' },
      { kind: 'LocalGet'; id: '$result' },
      { kind: 'Return'; count: 1 },
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

export type entry<
  arguments extends number[] = [],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $__wasm_call_ctors: $__wasm_call_ctors;
      $entry: $entry;
      $emscripten_stack_init: $emscripten_stack_init;
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
