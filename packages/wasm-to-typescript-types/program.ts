import type { Instruction, selectInstruction } from "./instructions/instructions"
import type { IHalt } from "./instructions/synthetic"
import type { State } from "./state"
import type { ProgramState } from "./types"
import type { evaluate } from "ts-type-math"

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
    ? State.GarbageCollection.collect<
        evaluate<state>, // can't finish, because reading from memory requires access to the whole thing
        'force'
      >
    : State.Result.finish<state>
