import { Func, runProgram } from '../../program.ts'

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
  input extends number[] = [],
  debugMode extends boolean = false
> = runProgram<
  {
    stack: input;
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