import type { Entry, ProgramState } from "../types.js";
import type { State } from '../state.js'
import * as TypeMath from "ts-type-math"

export type IAnd = {
  kind: "And"
}

export type IOr = {
  kind: "Or"
}

export type IXor = {
  kind: "Xor"
}

export type IShiftLeft = {
  kind: "ShiftLeft"
}

export type IShiftRight = {
  kind: "ShiftRight"
}

export type IRotateLeft = {
  kind: "RotateLeft"
}

export type IRotateRight = {
  kind: "RotateRight"
}

export type BitwiseInstruction =
  | IAnd
  | IOr
  | IXor
  | IShiftLeft
  | IShiftRight
  | IRotateLeft
  | IRotateRight

export type HandleBitwiseInstructions<
  instruction extends BitwiseInstruction,
  state extends ProgramState,

  RESULT extends ProgramState =
    instruction extends IAnd
    ? And<instruction, state>

    : instruction extends IOr
    ? Or<instruction, state>

    : instruction extends IXor
    ? Xor<instruction, state>

    : instruction extends IShiftLeft
    ? ShiftLeft<instruction, state>

    : instruction extends IShiftRight
    ? ShiftRight<instruction, state>

    : instruction extends IRotateLeft
    ? RotateLeft<instruction, state>

    : instruction extends IRotateRight
    ? RotateRight<instruction, state>

    : never
> = RESULT

export type And<
  instruction extends IAnd, // unused
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
          TypeMath.BitwiseAnd<a, b>
        ],
        state
      >
    : never
> = RESULT

export type Or<
  instruction extends IOr, // unused
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
          TypeMath.BitwiseOr<b, a>
        ],

        state
      >
    : never
> = RESULT

export type Xor<
  instruction extends IXor, // unused
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
          TypeMath.BitwiseXor<b, a>
        ],

        state
      >
    : never
> = RESULT

export type ShiftLeft<
  instruction extends IShiftLeft,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type ShiftRight<
  instruction extends IShiftRight,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type RotateLeft<
  instruction extends IRotateLeft,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type RotateRight<
  instruction extends IRotateRight,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT