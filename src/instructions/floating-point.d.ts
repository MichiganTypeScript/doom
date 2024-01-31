import type { Entry, ProgramState } from "../types.js"
import type { State } from '../state.js'
import * as TypeMath from "../ts-type-math/index.js"

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
  state extends ProgramState,

  RESULT extends ProgramState =
    instruction extends IAbsoluteValue
    ? AbsoluteValue<instruction, state>

    : instruction extends INegate
    ? Negate<instruction, state>

    : never
> = RESULT

export type AbsoluteValue<
  instruction extends IAbsoluteValue, // unused
  state extends ProgramState,

  RESULT extends ProgramState =
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
> = RESULT

export type Negate<
  instruction extends INegate, // unused
  state extends ProgramState,

  RESULT extends ProgramState =
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
> = RESULT