import { executeInstruction } from "./program"
import type { Func, LocalsById, ProgramInput } from "./types"
import type { Convert, WasmType, WasmValue, evaluate, Satisfies } from "ts-type-math"

type _ProcessInputStack<
  args extends [number[]  | bigint[], WasmType[]],

  _Acc extends WasmValue[] = []
> = Satisfies<WasmValue[],
  args extends [
    [
      infer headValue extends (number | bigint),
      ...infer tailValue extends number[] | bigint[]
    ],
    [
      infer headType extends WasmType,
      ...infer tailType extends WasmType[]
    ],
  ]
  ? _ProcessInputStack<
      [tailValue, tailType],
      [
        ..._Acc,
        headValue extends bigint
        ? Convert.TSBigInt.ToWasmValue<headValue>
        : headValue extends number
          ? headType extends 'i32'
            ? Convert.TSNumber.ToWasmValue<headValue, headType>
            : never
          : never
      ]
    >
  : _Acc
>

export type ProcessInputStack<
  input extends ProgramInput
> = Satisfies<WasmValue[],
  _ProcessInputStack<[
    input['arguments'],
    input['funcs']['$entry']['paramsTypes'],
  ]>
>

type PopLocals<
  params extends string[],
  stack extends WasmValue[],

  _Acc extends {
    stack: WasmValue[];
    activeLocals: LocalsById;
  } = {
    stack: stack;
    activeLocals: {}
  }
> = Satisfies<{ stack: WasmValue[]; activeLocals: LocalsById; },
  params extends [
    ...infer remainingParams extends string[],
    infer param extends string,
  ]
  ? stack extends [
      ...infer remainingStack extends WasmValue[],
      infer pop extends WasmValue,
    ]
    ? PopLocals<
        remainingParams,
        remainingStack,
        {
          stack: remainingStack;

          // append the new local to the activeLocals
          activeLocals: _Acc['activeLocals'] & {
            [k in param]: pop;
          }
        }
      >
    : never
  : _Acc
>

export type bootstrap<
  input extends ProgramInput,
  debugMode extends boolean = false,
  stopAt extends number = number, // defaulting to `number` ensures it'll always keep executing unless an explicit value is provided
  _$entry extends Func = input['funcs']['$entry'],

  _freshStack extends WasmValue[] = ProcessInputStack<input>,
  _startData extends {
    stack: WasmValue[];
    activeLocals: LocalsById;
  } = PopLocals<_$entry['params'], _freshStack>
> =
  executeInstruction<
    {
      count: 0;
      stack: _startData['stack'];
      activeFuncId: "$entry";
      activeStackDepth: _startData['stack']['length']; // BUG
      activeLocals: _startData['activeLocals'];
      instructions: [
        ..._$entry['instructions'],
        { kind: 'EndFunction', id: '$entry' },
      ];
      activeBranches: {};
      L1Cache: {};
      memory: evaluate<input['memory']>; // copy readonly memory into memory registers
      executionContexts: [];
      funcs: input['funcs'];
      garbageCollection: 0;
      globals: input['globals'];
      memorySize: input['memorySize'];
      indirect: input['indirect'];
      results: null;
    },
    debugMode,
    stopAt
  >
