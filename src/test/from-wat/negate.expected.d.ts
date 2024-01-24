import { ModuleField } from '../../module.ts'
import { runProgram } from '../../program.ts'

type $negate<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: ['$theOmniscient'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$theOmniscient' },
      { kind: 'Negate' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: ['$ziltoid'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$ziltoid' },
      { kind: 'Call'; id: '$negate' },
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
        $negate: $negate;
        $entry: $entry;
      };
      globals: {};
    };
    memory: {};
    memorySize: 0;
  },
  debugMode
>