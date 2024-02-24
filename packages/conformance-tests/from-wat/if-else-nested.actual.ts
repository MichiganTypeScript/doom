import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $example = Satisfies<Func, {
  kind: 'func';
  params: ['$n', '$control'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$control' },
      { kind: 'Const'; value: '00000000000000000000000000000001' },
      { kind: 'Equals', type: 'i32' },
      { kind: 'If';
        then: [
          { kind: 'Const'; value: '00000000000000000000000001100101' },
          { kind: 'LocalGet'; id: '$n' },
          { kind: 'Add', type: 'i32' },
        ];
        else: [
          { kind: 'LocalGet'; id: '$control' },
          { kind: 'Const'; value: '00000000000000000000000000000010' },
          { kind: 'Equals', type: 'i32' },
          { kind: 'If';
            then: [
              { kind: 'Const'; value: '00000000000000000000000001100110' },
              { kind: 'LocalGet'; id: '$n' },
              { kind: 'Subtract', type: 'i32' },
            ];
            else: [
              { kind: 'LocalGet'; id: '$control' },
              { kind: 'Const'; value: '00000000000000000000000000000011' },
              { kind: 'GreaterThanOrEqual', signed: true, type: 'i32' },
              { kind: 'If';
                then: [
                  { kind: 'LocalGet'; id: '$control' },
                  { kind: 'Const'; value: '00000000000000000000000000000101' },
                  { kind: 'GreaterThan', signed: true, type: 'i32' },
                  { kind: 'If';
                    then: [
                      { kind: 'Const'; value: '00000000000000000000000001100111' },
                      { kind: 'LocalGet'; id: '$n' },
                      { kind: 'Multiply', type: 'i32' },
                    ];
                    else: [
                      { kind: 'Const'; value: '00000000000000000000000001101000' },
                      { kind: 'LocalGet'; id: '$n' },
                      { kind: 'Add', type: 'i32' },
                    ];
                  },
                ];
                else: [
                  { kind: 'Const'; value: '00000000000000000000000001101001' },
                  { kind: 'LocalGet'; id: '$n' },
                  { kind: 'Add', type: 'i32' },
                ];
              },
            ];
          },
        ];
      },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: ['$a', '$b'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'Call'; id: '$example' },
    ];
}>

export type entry<
  arguments extends [number, number],
  debugMode extends boolean = false,
  stopAt extends number = number,
> = bootstrap<
  {
    arguments: arguments;
    funcs: {
      $example: $example;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: '00000000000000000000000000000000';
    indirect: [];
  },
  debugMode,
  stopAt
>
