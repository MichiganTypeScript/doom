import type { ProgramState } from "../types.js";
import type { State } from '../state.js'

export type IConst = {
  kind: "Const"

  /** a constant value */
  value: number;
}

export type ConstInstruction = IConst;

export type Const<
  instruction extends IConst,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.push<
      instruction['value'],

      state
    >
> = RESULT

export type HandleConstInstruction<
  instruction extends ConstInstruction,
  state extends ProgramState,

  RESULT extends ProgramState =
    instruction extends IConst ? Const<instruction, state>
    : never
> = RESULT
