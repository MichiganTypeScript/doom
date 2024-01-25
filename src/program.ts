import { Entry, IHalt, Instruction, selectInstruction } from "./instructions.js"
import { State } from "./state.js"
import { Param, WasmModule } from "./module.js";
import { MemoryByAddress } from "./memory.js";

export type Mask = 'If' | 'Else' | 'End';

export type ExecutionContext = {
  /** the current local variable values */
  locals: Record<string, number>;

  /** not really required, but really helpful for debugging */
  funcId: string;

  /**
   * a control flow mask
   * 
   * this tells the program to keep going until it reaches the desired statement
   */
  masks: Mask[];

  instructions: Instruction[];
}

export type ProgramState = {
  /** the WASM module itself, with all the top-level declarations */
  module: WasmModule;

  /** the linear memory of the program */
  memory: MemoryByAddress;

  memorySize: number;

  /** a stack of values */
  stack: Entry[];

  /** a stack of execution contexts */
  executionContexts: ExecutionContext[];
}

export type ProgramInput = Pick<
  ProgramState,
  "stack" | "module" | "memory" | "memorySize"
>

type ParamsToLocals<
  input extends ProgramInput,
  Params extends Param[] = input['module']['func']['$entry']['params'],
  
  _Acc extends Record<string, number> = {},

  RESULT extends Record<string, number> =
    Params extends [
      infer firstParam extends Param,
      ...infer remainingParams extends Param[]
    ]
    ? input['stack'] extends [
        infer firstValue extends Entry,
        ...infer remainingValues extends Entry[]
      ]
      ? ParamsToLocals<
          {
            stack: remainingValues;
            module: input['module'];
            memory: input['memory'];
            memorySize: input['memorySize'];
          },

          remainingParams,

          evaluate<{
            [K in firstParam]: firstValue;
          } & _Acc>
        >
      : never // will happen if there's a mismatch between inputs and params
    : _Acc
> = RESULT

export type runProgram<
  input extends ProgramInput,
  debugMode extends boolean = false,
> =
  executeInstruction<
    {
      memory: [];
      memorySize: input['memorySize'];
      module: input['module'];
      stack: [];
      executionContexts: [
        {
          locals: ParamsToLocals<input>;
          funcId: '$entry';
          masks: [];
          instructions: [
            ...input['module']['func']['$entry']['instructions'],
            // { kind: 'EndFunction', id: '$entry' },
          ];
        }
      ];
    },
    debugMode
  >

export type evaluate<T> = {
  [K in keyof T]: T[K]
} & unknown

export type executeInstruction<
  state extends ProgramState,
  debugMode extends boolean = false,
> =
  State.ExecutionContexts.Active.Instructions.get<state> extends [
    infer instruction extends Instruction,
    ...infer remainingInstructions extends Instruction[]
  ]

  // `Halt` is a special instruction that tells the program to stop for debugging
  ? instruction extends IHalt
    ? state

      // first we gotta check if we need to skip this instruction because of some control flow mask
    : State.ExecutionContexts.Active.Instructions.shouldSkip<state, instruction> extends true

        // we didn't hit the instruction we want, so we pop and continue
        ? executeInstruction<
            State.ExecutionContexts.Active.Instructions.pop<state>,
            debugMode
          >

        // we hit the instruction we want so we can pop the mask and continue
        : executeInstruction<
            selectInstruction<
              state,
              remainingInstructions,
              instruction
            >,
            debugMode
          >

  // program execution is complete.  yay.
  // this is the base case of the main loop's recursion
  : debugMode extends true
    ? evaluate<state>
    : evaluate<state>['stack'][0]
