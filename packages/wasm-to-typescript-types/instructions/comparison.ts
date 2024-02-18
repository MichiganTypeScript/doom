import type { ProgramState } from "../types"
import type { State } from '../state'
import * as TypeMath from "ts-type-math"
import { WasmValue, WasmType, Wasm } from "ts-type-math"

export type IEqualsZero = {
  kind: "EqualsZero"

  type: WasmType
}

export type IEquals = {
  kind: "Equals"

  type: WasmType
}

export type INotEqual = {
  kind: "NotEqual"

  type: WasmType
}

export type IGreaterThan = {
  kind: "GreaterThan"
}

export type ILessThan = {
  kind: "LessThan"
}

export type IGreaterThanOrEqual = {
  kind: "GreaterThanOrEqual"
}

export type ILessThanOrEqual = {
  kind: "LessThanOrEqual"
}

export type ComparisonInstruction =
  | IEqualsZero
  | IEquals
  | INotEqual
  | IGreaterThan
  | ILessThan
  | IGreaterThanOrEqual
  | ILessThanOrEqual

export type HandleComparisonInstruction<
  instruction extends ComparisonInstruction,
  state extends ProgramState
> = Satisfies<ProgramState,
  instruction extends IEquals
  ? Equals<instruction, state>

  : instruction extends IEqualsZero
  ? EqualsZero<instruction, state>
  
  : instruction extends INotEqual
  ? NotEqual<instruction, state>
  
  : instruction extends IGreaterThan
  ? GreaterThan<instruction, state>
  
  : instruction extends ILessThan
  ? LessThan<instruction, state>
  
  : instruction extends IGreaterThanOrEqual
  ? GreaterThanOrEqual<instruction, state>
  
  : instruction extends ILessThanOrEqual
  ? LessThanOrEqual<instruction, state>

  : never
>

export type EqualsZero<
  instruction extends IEqualsZero, // unused
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends WasmValue[],
    infer a extends WasmValue,
  ]
  ? State.Stack.set<
      [
        ...remaining,
        
        instruction['type'] extends 'i32' ? Wasm.I32Eqz<a> :
        instruction['type'] extends 'i64' ? Wasm.I64Eqz<a> :
        never //  TODO Add f32, f64
      ],

      state
    >
  : never
>

export type Equals<
  instruction extends IEquals, // unused
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
        
        instruction['type'] extends 'i32' ? Wasm.I32Eq<a, b> :
        instruction['type'] extends 'i64' ? Wasm.I64Eq<a, b> :
        never //  TODO Add f32, f64
      ],

      state
    >
  : never
>

export type NotEqual<
  instruction extends INotEqual, // unused
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
        
        instruction['type'] extends 'i32' ? Wasm.I32Neq<a, b> :
        instruction['type'] extends 'i64' ? Wasm.I64Neq<a, b> :
        never //  TODO Add f32, f64
      ],

      state
    >
  : never
>

export type GreaterThan<
  instruction extends IGreaterThan, // unused
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
        // TypeMath.GreaterThan<a, b> extends true ? 1 : 0 // TODO Broken
      ],

      state
    >
  : never
>

export type LessThan<
  instruction extends ILessThan, // unused
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
        // TypeMath.LessThan<a, b> extends true ? 1 : 0 // TODO Broken
      ],
      state
    >
  : never
>

export type GreaterThanOrEqual<
  instruction extends IGreaterThanOrEqual, // unused
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
        // TypeMath.GreaterThanOrEqual<a, b> extends true ? 1 : 0 // TODO Broken
      ],

      state
    >
  : never
>

export type LessThanOrEqual<
  instruction extends ILessThanOrEqual, // unused
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
        // TypeMath.LessThanOrEqual<a, b> extends true ? 1 : 0 // TODO Broken
      ],
      state
    >
  : never
>
