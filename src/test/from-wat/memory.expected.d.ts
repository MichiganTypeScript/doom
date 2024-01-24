import { ModuleField } from '../../module.ts'
import { runProgram } from '../../program.ts'

type $storeValue<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: ['$index', '$value'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'Const'; value: 4 },
      { kind: 'Multiply' },
      { kind: 'LocalGet'; id: '$value' },
      { kind: 'Store'; offset: 0; align: 4 },
    ];
  }
> = RESULT

type $loadValue<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: ['$index'];
    result: number;
    locals: [];
    instructions: [
      { kind: 'LocalGet'; id: '$index' },
      { kind: 'Const'; value: 4 },
      { kind: 'Multiply' },
      { kind: 'Load'; offset: 0; align: 4 },
    ];
  }
> = RESULT

type $foo<
  RESULT extends ModuleField.Func = {
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
  RESULT extends ModuleField.Func = {
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
  input extends number[] = [],
  debugMode extends boolean = false
> = runProgram<
  {
    stack: input;
    module: {
      func: {
        $storeValue: $storeValue;
        $loadValue: $loadValue;
        $foo: $foo;
        $entry: $entry;
      };
      globals: {};
    };
    memory: {};
    memorySize: 1;
  },
  debugMode
>