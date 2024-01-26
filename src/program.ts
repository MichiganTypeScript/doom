import { Entry, IHalt, Instruction, selectInstruction } from "./instructions.js"
import { State } from "./state.js"
import { MemoryByAddress } from "./memory.js";

export type BranchId = string;
export type Globals = Record<string, Entry>;
export type Param = string;
export type Func = {
  kind: 'func';
  params: Param[];
  result: number;
  locals: string[];
  instructions: Instruction[];
}

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
  /** a stack of execution contexts */
  executionContexts: ExecutionContext[];

  funcs: Record<string, Func>

  globals: Globals;

  /** used for dynamic dispatch: maps directly to funcs */
  indirect: string[];

  /** the currently executing instructions */
  instructions: Instruction[];

  /** the linear memory of the program */
  memory: MemoryByAddress;

  memorySize: number;

  /** a stack of values */
  stack: Entry[];
}

export type ProgramInput = Pick<
  ProgramState,
  "stack" | "memory" | "memorySize" | "indirect" | "funcs" | "globals"
>

export type runProgram<
  input extends ProgramInput,
  debugMode extends boolean = false,
> =
  executeInstruction<
    {
      executionContexts: [];
      funcs: input['funcs'];
      globals: input['globals'];
      indirect: input['indirect'];
      instructions: [
        { kind: "Call", id: "$entry" }
      ];
      memory: [];
      memorySize: input['memorySize'];
      stack: input['stack'];
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
