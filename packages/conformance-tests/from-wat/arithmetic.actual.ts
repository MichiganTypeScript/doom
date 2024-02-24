import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $I32Add = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Add', type: 'i32' },
    ];
}>

type $I64Add = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i64', 'i64'];
  result: 'i64';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Add', type: 'i64' },
    ];
}>

type $I32DivS = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Divide', signed: true, type: 'i32' },
    ];
}>

type $I64DivS = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i64', 'i64'];
  result: 'i64';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Divide', signed: true, type: 'i64' },
    ];
}>

type $I32DivU = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Divide', signed: false, type: 'i32' },
    ];
}>

type $I64DivU = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i64', 'i64'];
  result: 'i64';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Divide', signed: false, type: 'i64' },
    ];
}>

type $I32Mul = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Multiply', type: 'i32' },
    ];
}>

type $I64Mul = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i64', 'i64'];
  result: 'i64';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Multiply', type: 'i64' },
    ];
}>

type $I32RemS = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Remainder', signed: true, type: 'i32' },
    ];
}>

type $I32RemU = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Remainder', signed: false, type: 'i32' },
    ];
}>

type $I32Sub = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Subtract', type: 'i32' },
    ];
}>

type $I64Sub = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i64', 'i64'];
  result: 'i64';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Subtract', type: 'i64' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$I32Add_a', '$I32Add_b', '$I64Add_a', '$I64Add_b', '$I32DivS_a', '$I32DivS_b', '$I64DivS_a', '$I64DivS_b', '$I32DivU_a', '$I32DivU_b', '$I64DivU_a', '$I64DivU_b', '$I32Mul_a', '$I32Mul_b', '$I64Mul_a', '$I64Mul_b', '$I32RemS_a', '$I32RemS_b', '$I32RemU_a', '$I32RemU_b', '$I32Sub_a', '$I32Sub_b', '$I64Sub_a', '$I64Sub_b'];
  paramsTypes: ['i32', 'i32', 'i64', 'i64', 'i32', 'i32', 'i64', 'i64', 'i32', 'i32', 'i64', 'i64', 'i32', 'i32', 'i64', 'i64', 'i32', 'i32', 'i32', 'i32', 'i32', 'i32', 'i64', 'i64'];
  result: null;
    locals: ['$index'];
    instructions: [
      { kind: 'Const'; value: '00000000000000000000000000000000' },
      { kind: 'LocalSet'; id: '$index' },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32Add_a' },
      { kind: 'LocalGet'; id: '$I32Add_b' },
      { kind: 'Call'; id: '$I32Add' },
      { kind: 'Store'; subkind: 'I32Store'; offset: '00000000000000000000000000010000' },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I64Add_a' },
      { kind: 'LocalGet'; id: '$I64Add_b' },
      { kind: 'Call'; id: '$I64Add' },
      { kind: 'Store'; subkind: 'I64Store'; offset: '00000000000000000000000000011000' },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32DivS_a' },
      { kind: 'LocalGet'; id: '$I32DivS_b' },
      { kind: 'Call'; id: '$I32DivS' },
      { kind: 'Store'; subkind: 'I32Store'; offset: '00000000000000000000000000110000' },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I64DivS_a' },
      { kind: 'LocalGet'; id: '$I64DivS_b' },
      { kind: 'Call'; id: '$I64DivS' },
      { kind: 'Store'; subkind: 'I64Store'; offset: '00000000000000000000000000111000' },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32DivU_a' },
      { kind: 'LocalGet'; id: '$I32DivU_b' },
      { kind: 'Call'; id: '$I32DivU' },
      { kind: 'Store'; subkind: 'I32Store'; offset: '00000000000000000000000001000000' },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I64DivU_a' },
      { kind: 'LocalGet'; id: '$I64DivU_b' },
      { kind: 'Call'; id: '$I64DivU' },
      { kind: 'Store'; subkind: 'I64Store'; offset: '00000000000000000000000001001000' },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32Mul_a' },
      { kind: 'LocalGet'; id: '$I32Mul_b' },
      { kind: 'Call'; id: '$I32Mul' },
      { kind: 'Store'; subkind: 'I32Store'; offset: '00000000000000000000000001100000' },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I64Mul_a' },
      { kind: 'LocalGet'; id: '$I64Mul_b' },
      { kind: 'Call'; id: '$I64Mul' },
      { kind: 'Store'; subkind: 'I64Store'; offset: '00000000000000000000000001101000' },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32RemS_a' },
      { kind: 'LocalGet'; id: '$I32RemS_b' },
      { kind: 'Call'; id: '$I32RemS' },
      { kind: 'Store'; subkind: 'I32Store'; offset: '00000000000000000000000001110000' },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32RemU_a' },
      { kind: 'LocalGet'; id: '$I32RemU_b' },
      { kind: 'Call'; id: '$I32RemU' },
      { kind: 'Store'; subkind: 'I32Store'; offset: '00000000000000000000000001111000' },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I32Sub_a' },
      { kind: 'LocalGet'; id: '$I32Sub_b' },
      { kind: 'Call'; id: '$I32Sub' },
      { kind: 'Store'; subkind: 'I32Store'; offset: '00000000000000000000000010010000' },
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'LocalGet'; id: '$I64Sub_a' },
      { kind: 'LocalGet'; id: '$I64Sub_b' },
      { kind: 'Call'; id: '$I64Sub' },
      { kind: 'Store'; subkind: 'I64Store'; offset: '00000000000000000000000010011000' },
    ];
}>

export type entry<
  arguments extends [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number],
  debugMode extends boolean = false,
  stopAt extends number = number,
> = bootstrap<
  {
    arguments: arguments;
    funcs: {
      $I32Add: $I32Add;
      $I64Add: $I64Add;
      $I32DivS: $I32DivS;
      $I64DivS: $I64DivS;
      $I32DivU: $I32DivU;
      $I64DivU: $I64DivU;
      $I32Mul: $I32Mul;
      $I64Mul: $I64Mul;
      $I32RemS: $I32RemS;
      $I32RemU: $I32RemU;
      $I32Sub: $I32Sub;
      $I64Sub: $I64Sub;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: '00000000000000000000000000000001';
    indirect: [];
  },
  debugMode,
  stopAt
>
