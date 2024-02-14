import type { ProgramState } from "../types.d.ts"
import type { Instruction } from "./instructions.d.ts"
import type { State } from '../state.d.ts'

/** this isn't really a webassembly instruction, but it's a sentinel put here so that the program can understand when to cull execution contexts (i.e. after the function returns) */
export type IEndFunction = {
  kind: "EndFunction"

  /** a function identifier */
  id: string
}

/** a synthetic instruction for repeating the instructions of a loop */
export type IEndLoop = {
  kind: "EndLoop"

  id: string

  instructions: Instruction[]
}

/** not a webassembly instruction. used for debugging: tells the program to immediately Halt */
export type IHalt = {
  kind: "Halt"

  /** if Halting because of an unrecognized instruction, it's useful to append it here */
  instruction?: Instruction

  /** an optional reason for the halt */
  reason?: string
}

export type SyntheticInstruction =
  | IEndFunction
  | IEndLoop
  | IHalt

export type HandleSyntheticInstructions<
  instruction extends SyntheticInstruction,
  state extends ProgramState,

  RESULT extends ProgramState =
    instruction extends IEndLoop
    ? EndLoop<instruction, state>

    : instruction extends IEndFunction
    ? EndFunction<instruction, state>
    
    : instruction extends IHalt
    ? Halt<instruction, state>

  : never
> = RESULT

export type EndFunction<
  instruction extends IEndFunction, // unused
  state extends ProgramState,

  RESULT extends ProgramState =
    // pop the active execution context
    State.ExecutionContexts.pop<
      state
    >
> = RESULT

export type EndLoop<
  instruction extends IEndLoop,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.set<
      instruction['instructions'],
      state
    >
> = RESULT

export type Halt<
  instruction extends IHalt,
  state extends ProgramState,
> = state