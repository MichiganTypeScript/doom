import type { ProgramState } from "../types"
import type { State } from '../state'
import * as TypeMath from "ts-type-math"
import { WasmValue, WasmInt } from "ts-type-math"

export type IAnd = {
  kind: "And"

  type: WasmInt
}

export type IOr = {
  kind: "Or"

  type: WasmInt
}

export type IXor = {
  kind: "Xor"

  type: WasmInt
}

export type IShiftLeft = {
  kind: "ShiftLeft"

  type: WasmInt
}

export type IShiftRight = {
  kind: "ShiftRight"
  signed: boolean

  type: WasmInt
}

export type IRotateLeft = {
  kind: "RotateLeft"

  type: WasmInt
}

export type IRotateRight = {
  kind: "RotateRight"

  type: WasmInt
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
    ...infer remaining extends WasmValue[],
    infer b extends WasmValue,
    infer a extends WasmValue,
  ]
  ? State.Stack.set<
      [
        ...remaining,
        // TypeMath.BitwiseAnd<a, b> // TODO Broken
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
    ...infer remaining extends WasmValue[],
    infer b extends WasmValue,
    infer a extends WasmValue,
  ]
  ? State.Stack.set<
      [
        ...remaining,
        // TypeMath.BitwiseOr<b, a> // TODO Broken
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
    ...infer remaining extends WasmValue[],
    infer b extends WasmValue,
    infer a extends WasmValue,
  ]
  ? State.Stack.set<
      [
        ...remaining,
        // TypeMath.BitwiseXor<b, a> // TODO Broken
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
    ...infer remaining extends WasmValue[],
    infer a extends WasmValue,
    infer b extends WasmValue,
  ]
  ? State.Stack.set<
      [
        ...remaining,
        instruction['type'] extends 'i32' ? TypeMath.Wasm.I32Shl<a, b> :
        never // TODO i64
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
    ...infer remaining extends WasmValue[],
    infer a extends WasmValue,
    infer b extends WasmValue,
  ]
  ? State.Stack.set<
      [
        ...remaining,

        instruction['type'] extends 'i32'
          ? instruction['signed'] extends true
              ? TypeMath.Wasm.I32ShrS<a, b>
              : TypeMath.Wasm.I32ShrU<a, b>
          : never // TODO i64
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