import { IAdd, ICall, Entry, Instruction, ILocalGet } from "./instructions.js"
import { Update } from "./update.js"
import { Instructions } from "./instructions.js"
import { ModuleField, WasmModule } from "./module.js";

export type ProgramInput = {
  input: unknown[];
  module: WasmModule;
}

export type ProgramState = {
  input: unknown[]

  module: WasmModule;

  /** the currently executing instructions */
  instructions: Instruction[];

  stack: Entry[];
}

export type runProgram<input extends ProgramInput> = loop<
  input & {
    instructions: [
      { kind: "Call", id: "entry" }
    ]
    stack: [];
  }
>

export type evaluate<T> = {
  [K in keyof T]: T[K]
} & unknown

export type loop<state extends ProgramState> =
  state["instructions"] extends [
    infer currentInstruction extends Instruction,
    ...infer remainingInstructions extends Instruction[]
  ]
  ? loop<
      executeInstruction<
        Update.setInstructions<
          state,
          remainingInstructions
        >,
        currentInstruction
      >
    >
  : evaluate<state>

/** removes the first item from an array and returns the rest */
export type tail<T extends readonly number[]> =
  T extends [unknown, ...infer tail extends number[]]
  ? tail
  : never

export type executeInstruction<
  state extends ProgramState,
  instruction extends Instruction
> =
  instruction extends IAdd
  ? Instructions.Add<state, instruction>
    
  : instruction extends ILocalGet
  ? Instructions.LocalGet<state, instruction>

  : instruction extends ICall
  ? Instructions.CallInst<state, instruction>
  
  : never