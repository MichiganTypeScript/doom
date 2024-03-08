import type { ProgramState } from "../types"
import type { State } from '../state'
import * as TypeMath from "ts-type-math"
import { WasmValue, Satisfies } from "ts-type-math"

export type IAbsoluteValue = {
  kind: "AbsoluteValue"
}

export type INegate = {
  kind: "Negate"
}

export type FloatingPointInstruction =
  | IAbsoluteValue
  | INegate


export type HandleFloatingPointInstructions<
  instruction extends FloatingPointInstruction,
  state extends ProgramState
> = Satisfies<ProgramState,
  instruction extends IAbsoluteValue
  ? AbsoluteValue<instruction, state>

  : instruction extends INegate
  ? Negate<instruction, state>

  : never
>

export type AbsoluteValue<
  instruction extends IAbsoluteValue,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.unimplemented<instruction, state>
>

export type Negate<
  instruction extends INegate,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.unimplemented<instruction, state>
>