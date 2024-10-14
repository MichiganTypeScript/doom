import type { Instruction, selectInstruction } from "./instructions/instructions"
import type { IHalt } from "./instructions/synthetic"
import type { State } from "./state"
import type { ProgramInput, ProgramState } from "./types"
import type { Convert, WasmType, WasmValue, evaluate, Satisfies } from "ts-type-math"

type _ProcessInputStack<
  args extends [number[]  | bigint[], WasmType[]],

  _Acc extends WasmValue[] = []
> = Satisfies<WasmValue[],
  args extends [
    [infer headValue extends (number | bigint), ...infer tailValue extends number[] | bigint[]],
    [infer headType extends WasmType, ...infer tailType extends WasmType[]],
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

export type bootstrap<
  input extends ProgramInput,
  debugMode extends boolean = false,
  stopAt extends number = number,
> =
  executeInstruction<
    {
      count: 0;
      result: null;
      stack: ProcessInputStack<input>; // since the stack is a stack, we need to reverse it
      instructions: [
        { kind: "Call", id: "$entry" }
      ];

      activeLocals: {};
      activeFuncId: "root";
      activeBranches: {};

      globals: input['globals'];
      memory: evaluate<input['memory']>; // copy readonly memory into memory registers
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
  State.Instructions.get<state> extends [
    infer instruction extends Instruction,
    ...infer remainingInstructions extends Instruction[]
  ]

  // `Halt` is a special instruction that tells the program to stop for debugging
  ? instruction extends IHalt
    ? state

    : stopAt extends State.Count.get<state>
    ? state
    : executeInstruction<
        selectInstruction<

          // increment the instruction counter
          State.Count.increment<state>,

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
