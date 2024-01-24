import { ModuleField } from '../../module.ts'
import { runProgram } from '../../program.ts'
import { MemoryPages } from '../../memory.ts'

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
      { kind: 'Store'; offset: 0; align: 4 }
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
      { kind: 'Load'; offset: 0; align: 4 }
    ];
  }
> = RESULT

type $foo<
  RESULT extends ModuleField.Func = {
    kind: 'func';
    params: [];
    result: number;
    locals: [];
    instructions: [
      { kind: 'Const'; value: 2 },
      { kind: 'Const'; value: 42 },
      { kind: 'Call'; id: '$storeValue' },
      { kind: 'Const'; value: 2 },
      { kind: 'Call'; id: '$loadValue' }
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
      { kind: 'Call'; id: '$foo' }
    ];
  }
> = RESULT

export type entry<
  input extends number[] = []
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
    memory: MemoryPages<1>;
  },
  false
>