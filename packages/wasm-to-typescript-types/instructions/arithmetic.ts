import type { ProgramState } from "../types"
import type { State } from '../state'
import * as TypeMath from "ts-type-math"
import { WasmType, WasmValue, Wasm, WasmInt } from "ts-type-math"

export type IAdd = {
  kind: "Add"

  type: WasmType
}

export type ISubtract = {
  kind: "Subtract"

  type: WasmType
}

export type IMultiply = {
  kind: "Multiply"

  type: WasmType
}

export type IDivide = {
  kind: "Divide"

  signed: boolean

  type: WasmType
}

export type IRemainder = {
  kind: "Remainder"

  signed: boolean

  type: WasmInt
}

export type ArithmeticInstruction =
  | IAdd
  | ISubtract
  | IMultiply
  | IDivide
  | IRemainder

export type HandleArithmeticInstructions<
  instruction extends ArithmeticInstruction,
  state extends ProgramState
> = Satisfies<ProgramState,
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
>

export type Add<
  instruction extends IAdd,
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
        instruction['type'] extends 'i32' ? Wasm.I32Add<a, b> :
        never // Todo i64, f32, f64
      ],
      state
    >
  : never
>

export type Subtract<
  instruction extends ISubtract,
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
        instruction['type'] extends 'i32' ? Wasm.I32Sub<a, b> :
        never // Todo i64, f32, f64
      ],

      state
    >
  : never
>

export type Multiply<
  instruction extends IMultiply,
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
        // TypeMath.Multiply<a, b>// TODO Broken
      ],

      state
    >
  : never
>

export type Divide<
  instruction extends IDivide,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Instructions.unimplemented<
    instruction,
    state
  >
>

export type Remainder<
  instruction extends IRemainder,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Instructions.unimplemented<
    instruction,
    state
  >
>