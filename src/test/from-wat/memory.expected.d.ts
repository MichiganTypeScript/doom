import { Func, runProgram } from '../../program.ts'

type $storeValue<
  RESULT extends Func = {
    kind: 'func';
    params: ['$index', '$value'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'Const'; value: 4 },
      { kind: 'Multiply' },
      { kind: 'LocalGet'; id: '$value' },
      { kind: 'I32Store'; offset: 0 },
    ];
  }
> = RESULT

type $loadValue<
  RESULT extends Func = {
    kind: 'func';
    params: ['$index'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'Const'; value: 4 },
      { kind: 'Multiply' },
      { kind: 'I32Load'; offset: 0 },
    ];
  }
> = RESULT

type $foo<
  RESULT extends Func = {
    kind: 'func';
    params: ['$a'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Const'; value: 2 },
      { kind: 'LocalGet'; id: '$a' },
      { kind: 'Call'; id: '$storeValue' },
      { kind: 'Const'; value: 2 },
      { kind: 'Call'; id: '$loadValue' },
      { kind: 'Const'; value: 1 },
      { kind: 'Add' },
    ];
  }
> = RESULT

type $entry<
  RESULT extends Func = {
    kind: 'func';
    params: ['$value'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$value' },
      { kind: 'Call'; id: '$foo' },
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
      $storeValue: $storeValue;
      $loadValue: $loadValue;
      $foo: $foo;
      $entry: $entry;
    };
    globals: {};
    memory: {};
    memorySize: 1;
    indirect: [];
  },
  debugMode
>
