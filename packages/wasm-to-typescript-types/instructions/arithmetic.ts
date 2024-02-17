import type { ProgramState } from "../types"
import type { State } from '../state'
import * as TypeMath from "ts-type-math"
import { WasmType, WasmValue, Wasm } from "ts-type-math"

export type IAdd = {
  kind: "Add"

  type: WasmType
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
  instruction extends IAdd, // unused
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
        Wasm.I32Add<a, b>
        // TypeMath.Add<a, b>// TODO Broken
      ],
      state
    >
  : never
>

export type Subtract<
  instruction extends ISubtract, // unused
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
        // TypeMath.Subtract<b, a> // TODO Broken
      ],

      state
    >
  : never
>

export type Multiply<
  instruction extends IMultiply, // unused
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