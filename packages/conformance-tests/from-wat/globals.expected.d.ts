import type { Func, runProgram } from 'wasm-to-typescript-types'

type $setGlobal<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Const'; value: 42 },
      { kind: 'GlobalSet'; id: '$myGlobal' },
    ];
  }
> = RESULT

type $getGlobal<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'GlobalGet'; id: '$myGlobal' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$setGlobal' },
      { kind: 'Call'; id: '$getGlobal' },
    ];
  }
> = RESULT

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
      $myGlobal: 0;
    };
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
