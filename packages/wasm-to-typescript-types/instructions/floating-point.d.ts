import type { Entry, ProgramState } from "../types.ts"
import type { State } from '../state.d.ts'
import * as TypeMath from "ts-type-math"

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
    ...infer remainingStack extends Entry[],
    infer a extends Entry,
  ]
  ? State.Stack.set<
      [
        ...remainingStack,
        TypeMath.AbsoluteValue<a>
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
    ...infer remaining extends Entry[],
    infer a extends Entry,
  ]
  ? State.Stack.set<
      [
        ...remaining,
        a extends 0 // this check is only necessary due to a bug in hotscript: https://github.com/gvergnaud/hotscript/issues/117
        ? 0
        : TypeMath.Negate<a>
      ],

      state
    >
  : never
>