import type { Func, runProgram } from 'wasm-to-typescript-types'

type $example = Satisfies<Func, {
  kind: 'func';
  params: ['$n', '$control'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$control' },
      { kind: 'Const'; value: '1' },
      { kind: 'Equals' },
      { kind: 'If';
        then: [
          { kind: 'Const'; value: '1100101' },
          { kind: 'LocalGet'; id: '$n' },
          { kind: 'Add', type: 'i32' },
        ];
        else: [
          { kind: 'LocalGet'; id: '$control' },
          { kind: 'Const'; value: '10' },
          { kind: 'Equals' },
          { kind: 'If';
            then: [
              { kind: 'Const'; value: '1100110' },
              { kind: 'LocalGet'; id: '$n' },
              { kind: 'Subtract' },
            ];
            else: [
              { kind: 'LocalGet'; id: '$control' },
              { kind: 'Const'; value: '11' },
              { kind: 'GreaterThanOrEqual' },
              { kind: 'If';
                then: [
                  { kind: 'LocalGet'; id: '$control' },
                  { kind: 'Const'; value: '101' },
                  { kind: 'GreaterThan' },
                  { kind: 'If';
                    then: [
                      { kind: 'Const'; value: '1100111' },
                      { kind: 'LocalGet'; id: '$n' },
                      { kind: 'Multiply' },
                    ];
                    else: [
                      { kind: 'Const'; value: '1101000' },
                      { kind: 'LocalGet'; id: '$n' },
                      { kind: 'Add', type: 'i32' },
                    ];
                  },
                ];
                else: [
                  { kind: 'Const'; value: '1101001' },
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
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $example: $example;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: '0';
    indirect: [];
  },
  debugMode
>
