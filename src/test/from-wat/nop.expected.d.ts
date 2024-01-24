import { ModuleField } from '../../module.ts'
import { runProgram } from '../../program.ts'

type $nop<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Nop'; ziltoid: 'theOmniscient' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Call'; id: '$nop' },
    ];
  }
> = RESULT

export type entry<
  input extends number[] = [],
  debugMode extends boolean = false
> = runProgram<
  {
    stack: input;
    module: {
      func: {
        $nop: $nop;
        $entry: $entry;
      };
      globals: {};
    };
    memory: {};
    memorySize: 0;
  },
  debugMode
>