import { Func, runProgram } from '../../program.ts'

type $negate<
  RESULT extends Func = {
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
  RESULT extends Func = {
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
  arguments extends number[] = [],
  debugMode extends boolean = false
> = runProgram<
  {
    arguments: arguments;
    funcs: {
      $negate: $negate;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 0;
    indirect: [];
  },
  debugMode
>
