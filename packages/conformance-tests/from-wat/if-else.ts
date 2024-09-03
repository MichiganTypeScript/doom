import type { Func, bootstrap } from 'wasm-to-typescript-types'

type $if = Satisfies<Func, {
  kind: 'func';
  params: ['$n', '$control'];
  paramsTypes: ['i32', 'i32'];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$n' },
      { kind: 'LocalGet'; id: '$control' },
      { kind: 'Const'; value: '00000000000000000000000000000000' },
      { kind: 'GreaterThanOrEqual', signed: true, type: 'i32' },
      { kind: 'If';
        then: [
          { kind: 'Const'; value: '00000000000000000000000000000001' },
        ];
        else: [
          { kind: 'Const'; value: '11111111111111111111111111111111' },
        ];
      },
      { kind: 'Add', type: 'i32' },
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
      { kind: 'Call'; id: '$if' },
    ];
}>

export type funcs = {
  $if: $if;
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
    memorySize: '00000000000000000000000000000000';
    indirect: [];
  },
  debugMode,
  stopAt
>
