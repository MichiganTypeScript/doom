import { Entry, IHalt, Instruction, selectInstruction } from "./instructions.js"
import { State } from "./state.js"
import { WasmModule } from "./module.js";
import { MemoryByAddress } from "./memory.js";

export type BranchId = string;

export type ExecutionContext = {
  /** the current local variable values */
  locals: Record<string, number>;

  /** not really required, but really helpful for debugging */
  funcId: string;

  /**
   * a control flow helper that tells the program how to interpret the next when it hits a branch
   */
  branches: Record<BranchId, Instruction[]>;
}

export type ProgramState = {
  /** the WASM module itself, with all the top-level declarations */
  module: WasmModule;

  /** the linear memory of the program */
  memory: MemoryByAddress;

  memorySize: number;

  /** the currently executing instructions */
  instructions: Instruction[];

  /** a stack of values */
  stack: Entry[];

  /** a stack of execution contexts */
  executionContexts: ExecutionContext[];
}

export type ProgramInput = Pick<
  ProgramState,
  "stack" | "module" | "memory" | "memorySize"
>

export type runProgram<
  input extends ProgramInput,
  debugMode extends boolean = false,
> =
  executeInstruction<
    {
      instructions: [
        { kind: "Call", id: "$entry" }
      ];
      memory: [];
      memorySize: input['memorySize'];
      module: input['module'];
      stack: input['stack'];
      executionContexts: [];
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
  state["instructions"] extends [
    infer instruction extends Instruction,
    ...infer remainingInstructions extends Instruction[]
  ]

  // `Halt` is a special instruction that tells the program to stop for debugging
  ? instruction extends IHalt
    ? state

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
