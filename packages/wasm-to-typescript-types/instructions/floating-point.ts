import type { ProgramState } from "../types"
import type { State } from '../state'
import * as TypeMath from "ts-type-math"
import { WasmValue } from "ts-type-math"

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
  instruction extends IAbsoluteValue, // unused
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remainingStack extends WasmValue[],
    infer a extends WasmValue,
  ]
  ? State.Stack.set<
      [
        ...remainingStack,
        // TypeMath.AbsoluteValue<a> // TODO Broken
      ],
      state
    >
  : never
>

export type Negate<
  instruction extends INegate, // unused
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends WasmValue[],
    infer a extends WasmValue,
  ]
  ? State.Stack.set<
      [
        ...remaining,
        // a extends 0 // this check is only necessary due to a bug in hotscript: https://github.com/gvergnaud/hotscript/issues/117
        // ? 0
        // : TypeMath.Negate<a> // TODO Broken
      ],

      state
    >
  : never
>