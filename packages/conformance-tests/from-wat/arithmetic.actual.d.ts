import { Func, runProgram } from 'wasm-to-typescript-types'

type $F32Add<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Add' },
    ];
  }
> = RESULT

type $F64Add<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Add' },
    ];
  }
> = RESULT

type $I32Add<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Add' },
    ];
  }
> = RESULT

type $I64Add<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Add' },
    ];
  }
> = RESULT

type $F32Div<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Divide' },
    ];
  }
> = RESULT

type $F64Div<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Divide' },
    ];
  }
> = RESULT

type $I32DivS<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Divide' },
    ];
  }
> = RESULT

type $I64DivS<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Divide' },
    ];
  }
> = RESULT

type $I32DivU<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Divide' },
    ];
  }
> = RESULT

type $I64DivU<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Divide' },
    ];
  }
> = RESULT

type $F32Mul<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Multiply' },
    ];
  }
> = RESULT

type $F64Mul<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Multiply' },
    ];
  }
> = RESULT

type $I32Mul<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Multiply' },
    ];
  }
> = RESULT

type $I64Mul<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Multiply' },
    ];
  }
> = RESULT

type $I32RemS<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Remainder' },
    ];
  }
> = RESULT

type $I32RemU<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Remainder' },
    ];
  }
> = RESULT

type $F32Sub<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Subtract' },
    ];
  }
> = RESULT

type $F64Sub<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Subtract' },
    ];
  }
> = RESULT

type $I32Sub<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Subtract' },
    ];
  }
> = RESULT

type $I64Sub<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Subtract' },
    ];
  }
> = RESULT

type $arithmetic<
  RESULT extends Func = {
    kind: 'func';
    params: ['$F32Add_a', '$F32Add_b', '$F64Add_a', '$F64Add_b', '$I32Add_a', '$I32Add_b', '$I64Add_a', '$I64Add_b', '$F32Div_a', '$F32Div_b', '$F64Div_a', '$F64Div_b', '$I32DivS_a', '$I32DivS_b', '$I64DivS_a', '$I64DivS_b', '$I32DivU_a', '$I32DivU_b', '$I64DivU_a', '$I64DivU_b', '$F32Mul_a', '$F32Mul_b', '$F64Mul_a', '$F64Mul_b', '$I32Mul_a', '$I32Mul_b', '$I64Mul_a', '$I64Mul_b', '$I32RemS_a', '$I32RemS_b', '$I32RemU_a', '$I32RemU_b', '$F32Sub_a', '$F32Sub_b', '$F64Sub_a', '$F64Sub_b', '$I32Sub_a', '$I32Sub_b', '$I64Sub_a', '$I64Sub_b'];
    result: number;
    locals: ['$index'];
    instructions: [
      { kind: 'Const'; value: 0 },
      { kind: 'LocalSet'; id: '$index' },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$F32Add_a' },
      { kind: 'LocalGet'; id: '$F32Add_b' },
      { kind: 'Call'; id: '$F32Add' },
      { kind: 'F32Store'; offset: 0 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$F64Add_a' },
      { kind: 'LocalGet'; id: '$F64Add_b' },
      { kind: 'Call'; id: '$F64Add' },
      { kind: 'F64Store'; offset: 8 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32Add_a' },
      { kind: 'LocalGet'; id: '$I32Add_b' },
      { kind: 'Call'; id: '$I32Add' },
      { kind: 'I32Store'; offset: 16 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I64Add_a' },
      { kind: 'LocalGet'; id: '$I64Add_b' },
      { kind: 'Call'; id: '$I64Add' },
      { kind: 'I64Store'; offset: 24 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$F32Div_a' },
      { kind: 'LocalGet'; id: '$F32Div_b' },
      { kind: 'Call'; id: '$F32Div' },
      { kind: 'F32Store'; offset: 32 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$F64Div_a' },
      { kind: 'LocalGet'; id: '$F64Div_b' },
      { kind: 'Call'; id: '$F64Div' },
      { kind: 'F64Store'; offset: 40 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32DivS_a' },
      { kind: 'LocalGet'; id: '$I32DivS_b' },
      { kind: 'Call'; id: '$I32DivS' },
      { kind: 'I32Store'; offset: 48 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I64DivS_a' },
      { kind: 'LocalGet'; id: '$I64DivS_b' },
      { kind: 'Call'; id: '$I64DivS' },
      { kind: 'I64Store'; offset: 56 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32DivU_a' },
      { kind: 'LocalGet'; id: '$I32DivU_b' },
      { kind: 'Call'; id: '$I32DivU' },
      { kind: 'I32Store'; offset: 64 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I64DivU_a' },
      { kind: 'LocalGet'; id: '$I64DivU_b' },
      { kind: 'Call'; id: '$I64DivU' },
      { kind: 'I64Store'; offset: 72 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$F32Mul_a' },
      { kind: 'LocalGet'; id: '$F32Mul_b' },
      { kind: 'Call'; id: '$F32Mul' },
      { kind: 'F32Store'; offset: 80 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$F64Mul_a' },
      { kind: 'LocalGet'; id: '$F64Mul_b' },
      { kind: 'Call'; id: '$F64Mul' },
      { kind: 'F64Store'; offset: 88 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32Mul_a' },
      { kind: 'LocalGet'; id: '$I32Mul_b' },
      { kind: 'Call'; id: '$I32Mul' },
      { kind: 'I32Store'; offset: 96 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I64Mul_a' },
      { kind: 'LocalGet'; id: '$I64Mul_b' },
      { kind: 'Call'; id: '$I64Mul' },
      { kind: 'I64Store'; offset: 104 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32RemS_a' },
      { kind: 'LocalGet'; id: '$I32RemS_b' },
      { kind: 'Call'; id: '$I32RemS' },
      { kind: 'I32Store'; offset: 112 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32RemU_a' },
      { kind: 'LocalGet'; id: '$I32RemU_b' },
      { kind: 'Call'; id: '$I32RemU' },
      { kind: 'I32Store'; offset: 120 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$F32Sub_a' },
      { kind: 'LocalGet'; id: '$F32Sub_b' },
      { kind: 'Call'; id: '$F32Sub' },
      { kind: 'F32Store'; offset: 128 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$F64Sub_a' },
      { kind: 'LocalGet'; id: '$F64Sub_b' },
      { kind: 'Call'; id: '$F64Sub' },
      { kind: 'F64Store'; offset: 136 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32Sub_a' },
      { kind: 'LocalGet'; id: '$I32Sub_b' },
      { kind: 'Call'; id: '$I32Sub' },
      { kind: 'I32Store'; offset: 144 },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I64Sub_a' },
      { kind: 'LocalGet'; id: '$I64Sub_b' },
      { kind: 'Call'; id: '$I64Sub' },
      { kind: 'I64Store'; offset: 152 },
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
      $F32Add: $F32Add;
      $F64Add: $F64Add;
      $I32Add: $I32Add;
      $I64Add: $I64Add;
      $F32Div: $F32Div;
      $F64Div: $F64Div;
      $I32DivS: $I32DivS;
      $I64DivS: $I64DivS;
      $I32DivU: $I32DivU;
      $I64DivU: $I64DivU;
      $F32Mul: $F32Mul;
      $F64Mul: $F64Mul;
      $I32Mul: $I32Mul;
      $I64Mul: $I64Mul;
      $I32RemS: $I32RemS;
      $I32RemU: $I32RemU;
      $F32Sub: $F32Sub;
      $F64Sub: $F64Sub;
      $I32Sub: $I32Sub;
      $I64Sub: $I64Sub;
      $arithmetic: $arithmetic;
    };
    globals: {};
    memory: {};
    memorySize: 1;
    indirect: [];
  },
  debugMode
>
