import type { Entry, ProgramState } from "../types.ts";
import type { State } from '../state.d.ts'
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
  signed: boolean
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
  state extends ProgramState
> = Satisfies<ProgramState,
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
>

export type And<
  instruction extends IAnd, // unused
  state extends ProgramState
> = Satisfies<ProgramState,
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
>

export type Or<
  instruction extends IOr, // unused
  state extends ProgramState
> = Satisfies<ProgramState,
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
>

export type Xor<
  instruction extends IXor, // unused
  state extends ProgramState
> = Satisfies<ProgramState,
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
>

export type ShiftLeft<
  instruction extends IShiftLeft,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends Entry[],
    infer b extends Entry,
    infer a extends Entry,
  ]
  ? State.Stack.set<
      [
        ...remaining, 
        TypeMath.ShiftLeft<b, a>
      ],

      state
    >
  : never
>

export type ShiftRight<
  instruction extends IShiftRight,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends Entry[],
    infer b extends Entry,
    infer a extends Entry,
  ]
  ? State.Stack.set<
      [
        ...remaining, 
        TypeMath.ShiftRight<b, a, instruction['signed']>
      ],

      state
    >
  : never
>

export type RotateLeft<
  instruction extends IRotateLeft,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Instructions.unimplemented<
    instruction,
    state
  >
>

export type RotateRight<
  instruction extends IRotateRight,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Instructions.unimplemented<
    instruction,
    state
  >
>