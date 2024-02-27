import type { ProgramState } from "../types"
import type { State } from '../state'
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

  type: WasmType

  signed: boolean
}

export type ILessThan = {
  kind: "LessThan"

  type: WasmType

  signed: boolean
}

export type IGreaterThanOrEqual = {
  kind: "GreaterThanOrEqual"

  type: WasmType

  signed: boolean
}

export type ILessThanOrEqual = {
  kind: "LessThanOrEqual"

  type: WasmType

  signed: boolean
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
  instruction extends IEqualsZero,
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
        never //  TODO(float)
      ],

      state
    >
  : never
>

export type Equals<
  instruction extends IEquals,
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
        never //  TODO(float)
      ],

      state
    >
  : never
>

export type NotEqual<
  instruction extends INotEqual,
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
        never //  TODO(float)
      ],

      state
    >
  : never
>

export type GreaterThan<
  instruction extends IGreaterThan,
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
          ? Wasm.I32GtS<a, b>
          : Wasm.I32GtU<a, b>
        : never // Todo add i64, f32, f64
      ],

      state
    >
  : never
>

export type LessThan<
  instruction extends ILessThan,
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
          ? Wasm.I32LtS<a, b>
          : Wasm.I32LtU<a, b>
        : never // Todo add i64, f32, f64
      ],
      state
    >
  : never
>

export type GreaterThanOrEqual<
  instruction extends IGreaterThanOrEqual,
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
          ? Wasm.I32GeS<a, b>
          : Wasm.I32GeU<a, b>
        : never // Todo add i64, f32, f64
      ],

      state
    >
  : never
>

export type LessThanOrEqual<
  instruction extends ILessThanOrEqual,
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
          ? Wasm.I32LeS<a, b>
          : Wasm.I32LeU<a, b>
        : never // Todo add i64, f32, f64
      ],
      state
    >
  : never
>
