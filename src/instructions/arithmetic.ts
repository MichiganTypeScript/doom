import { Entry, ProgramState } from "../program.js";
import { State } from '../state.js'
import * as TypeMath from "../ts-type-math/index.js"

export type IAdd = {
  kind: "Add"
}

export type ISubtract = {
  kind: "Subtract"
}

export type IMultiply = {
  kind: "Multiply"
}

export type IDivide = {
  kind: "Divide"
}

export type IRemainder = {
  kind: "Remainder"
}

export type ArithmeticInstruction =
  | IAdd
  | ISubtract
  | IMultiply
  | IDivide
  | IRemainder

export type HandleArithmeticInstructions<
  instruction extends ArithmeticInstruction,
  state extends ProgramState,

  RESULT extends ProgramState =
    instruction extends IAdd
    ? Add<instruction, state>
    
    : instruction extends ISubtract
    ? Subtract<instruction, state>
    
    : instruction extends IMultiply
    ? Multiply<instruction, state>
    
    : instruction extends IDivide
    ? Divide<instruction, state>
    
    : instruction extends IRemainder
    ? Remainder<instruction, state>

    : never
> = RESULT

export type Add<
  instruction extends IAdd, // unused
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry,
    ]
    ? State.Stack.set<
        [
          ...remaining,
          TypeMath.Add<a, b>
        ],
        state
      >
    : never
> = RESULT

export type Subtract<
  instruction extends ISubtract, // unused
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry,
    ]
    ? State.Stack.set<
        [
          ...remaining,
          TypeMath.Subtract<b, a>
        ],

        state
      >
    : never
> = RESULT

export type Multiply<
  instruction extends IMultiply, // unused
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry,
    ]
    ? State.Stack.set<
        [
          ...remaining,
          TypeMath.Multiply<a, b>
        ],

        state
      >
    : never
> = RESULT

export type Divide<
  instruction extends IDivide,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type Remainder<
  instruction extends IRemainder,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT