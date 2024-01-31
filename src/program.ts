import { IHalt, Instruction, selectInstruction } from "./instructions.js"
import { State } from "./state.js";

/** an item on the stack */
export type Entry = number;
export type MemoryAddress = number;
export type MemoryByAddress = Record<MemoryAddress, number>
export type BranchId = string;
export type GlobalsById = Record<string, Entry>;
export type Param = string;
export type Func = {
  kind: 'func';
  params: Param[];
  result: number;
  locals: string[];
  instructions: Instruction[];
}
export type LocalsById = Record<string, number>;
export type BranchesById = Record<BranchId, Instruction[]>;
export type FuncsById = Record<string, Func>;
export type Reverse<T extends any[]> =
  T extends [infer head, ...infer tail]
  ? [...Reverse<tail>, head]
  : []
export type CorePrimitive = 'i32' | 'i64' | 'f32' | 'f64';
export type StorageBits = 8 | 16 | 32 | 64;

export type ExecutionContext = {
  /** the current local variable values */
  locals: LocalsById;

  /** not really required, but really helpful for debugging */
  funcId: string;

  /**
   * a control flow helper that tells the program how to interpret the next when it hits a branch
   */
  branches: BranchesById;
}

export type ProgramState = {
  /** the number of instructions we've executed, useful for debugging */
  count: number;

  /** a stack of execution contexts */
  executionContexts: ExecutionContext[];

  activeExecutionContext: ExecutionContext;

  funcs: FuncsById;

  globals: GlobalsById;

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
  | "memory" | "memorySize" | "indirect" | "funcs" | "globals"
> & {
  arguments: number[];
}

export type runProgram<
  input extends ProgramInput,
  debugMode extends boolean = false,
> =
  executeInstruction<
    {
      activeExecutionContext: {
        locals: {};
        funcId: "root";
        branches: {};
      };
      count: 0;
      executionContexts: [];
      funcs: input['funcs'];
      globals: input['globals'];
      indirect: input['indirect'];
      instructions: [
        { kind: "Call", id: "$entry" }
      ];

      // copy readonly memory into memory registers
      memory: input['memory'];
      memorySize: input['memorySize'];

      // since the stack is a stack, we need to reverse it
      stack: input['arguments'];
    },
    debugMode
  >

export type evaluate<T> = {
  [K in keyof T]: T[K]
} & unknown

// set to `number` to disable
export type StopAt = 21

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

    : StopAt extends State.Count.get<state>
    ? state
    : executeInstruction<
        selectInstruction<

          // increment the instruction counter
          State.Count.increment<state>,
          
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
