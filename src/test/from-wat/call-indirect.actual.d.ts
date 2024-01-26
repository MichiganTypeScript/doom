import { Func, runProgram } from '../../program.ts'

type $add<
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

type $indirect_call<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a', '$b'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Const'; value: 0 },
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'LocalGet'; id: '$b' },
      { kind: 'CallIndirect'; id: '$__indirect_function_table' },
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
      $add: $add;
      $indirect_call: $indirect_call;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: ["$add"];
  },
  debugMode
>