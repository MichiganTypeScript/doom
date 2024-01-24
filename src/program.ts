import { Entry, Instruction, selectInstruction } from "./instructions.js"
import { Update } from "./update.js"
import { WasmModule } from "./module.js";

export type ProgramInput = {
  stack: Entry[];
  module: WasmModule;
  memory: number[];
}

export type ExecutionContext = {
  /** the current local variable values */
  locals: Record<string, number>;
}

export type ProgramState = {
  /** the WASM module itself, with all the top-level declarations */
  module: WasmModule;

  /** the linear memory of the program */
  memory: number[];

  /** the currently executing instructions */
  instructions: Instruction[];

  /** a stack of values */
  stack: Entry[];

  /** a stack of execution contexts */
  executionContext: ExecutionContext;
}

export type runProgram<
  input extends ProgramInput,
  debugMode extends boolean = false,
> =
  executeInstruction<
    {
      instructions: [
        { kind: "Call", id: "$entry" }
      ];
      memory: []
      module: input['module'];
      stack: input['stack'];
      executionContext: {
        locals: {}
      };
    },
    debugMode
  >

export type evaluate<T> = {
  [K in keyof T]: T[K]
} & unknown

export type executeInstruction<
  state extends ProgramState,
  debugMode extends boolean,
> =
  state["instructions"] extends [
    infer instruction extends Instruction,
    ...infer remainingInstructions extends Instruction[]
  ]
  ? executeInstruction<
      selectInstruction<
        Update.Instructions.set<
          state,
          remainingInstructions
        >,
        instruction
      >,
      debugMode
    >
  : debugMode extends true
    ? evaluate<state>
    : evaluate<state>['stack'][0]
