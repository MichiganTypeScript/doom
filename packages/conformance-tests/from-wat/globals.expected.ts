import type { Func, runProgram } from 'wasm-to-typescript-types'

type $setGlobal = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: never;
    locals: [];
    instructions: [
      { kind: 'Const'; value: '00000000000000000000000000101010' },
      { kind: 'GlobalSet'; id: '$myGlobal' },
    ];
}>

type $getGlobal = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'GlobalGet'; id: '$myGlobal' },
    ];
}>

type $entry = Satisfies<Func, {
  kind: 'func';
  params: [];
  paramsTypes: [];
  result: 'i32';
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$setGlobal' },
      { kind: 'Call'; id: '$getGlobal' },
    ];
}>

export type entry<
  arguments extends [],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $setGlobal: $setGlobal;
      $getGlobal: $getGlobal;
      $entry: $entry;
    };
    globals: {
      $myGlobal: '00000000000000000000000000000000';
    };
    memory: {};
    memorySize: '00000000000000000000000000000000';
    indirect: [];
  },
  debugMode
>
