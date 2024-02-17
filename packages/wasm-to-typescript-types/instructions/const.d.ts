import type { ProgramState } from "../types.ts"
import type { State } from '../state.d.ts'

export type IConst = {
  kind: "Const"

  /** a constant value */
  value: number
}

export type ConstInstruction = IConst

export type Const<
  instruction extends IConst,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.push<
    instruction['value'],

    state
  >
>

export type HandleConstInstruction<
  instruction extends ConstInstruction,
  state extends ProgramState
> = Satisfies<ProgramState,
  instruction extends IConst
  ? Const<instruction, state>
  : never
>
