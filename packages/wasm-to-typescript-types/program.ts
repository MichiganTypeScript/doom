import type { Instruction, selectInstruction } from "./instructions/instructions"
import type { IHalt } from "./instructions/synthetic"
import type { State } from "./state"
import type { Func, LocalsById, ProgramInput, ProgramState } from "./types"
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

export type PopLocals<
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
      results: null;
      stack: _startData['stack'];
      instructions: [
        ..._$entry['instructions'],
        { kind: 'EndFunction', id: '$entry' },
      ];

      activeLocals: _startData['activeLocals'];
      activeFuncId: "$entry";
      activeBranches: {};
      activeStackDepth: _startData['stack']['length']; // BUG

      globals: input['globals'];
      memory: evaluate<input['memory']>; // copy readonly memory into memory registers
      garbageCollection: 0;
      indirect: input['indirect'];
      memorySize: input['memorySize'];
      executionContexts: [];
      funcs: input['funcs'];
    },
    debugMode,
    stopAt
  >

export type executeInstruction<
  state extends ProgramState,
  debugMode extends boolean = false,
  stopAt extends number = number,
> =
  state['instructions'] extends [
    infer instruction extends Instruction,
    ...infer remainingInstructions extends Instruction[]
  ]

  // `Halt` is a special instruction that tells the program to stop for debugging
  ? instruction extends IHalt
    ? state

    : stopAt extends state['count']
    ? state
    : executeInstruction<
        selectInstruction<
          State.GarbageCollection.collect<
            State.Count.increment<state>
          >,
          remainingInstructions,
          instruction
        >,
        debugMode,
        stopAt
      >

  // program execution is complete.  yay.
  // this is the base case of the main loop's recursion
  : debugMode extends true
    ? evaluate<state> // can't finish, because reading from memory requires access to the whole thing
    : State.Result.finish<state>
