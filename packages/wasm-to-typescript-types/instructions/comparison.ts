import type { ProgramState } from "../types"
import type { State } from '../state'
import * as TypeMath from "ts-type-math"
import { WasmValue } from "ts-type-math"

export type IEqualsZero = {
  kind: "EqualsZero"
}

export type IEquals = {
  kind: "Equals"
}

export type INotEqual = {
  kind: "NotEqual"
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
        // TypeMath.Equal<a, 0> extends true ? 1 : 0 // TODO Broken
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
        // TypeMath.Equal<a, b> extends true ? 1 : 0 // TODO Broken
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
        // TypeMath.NotEqual<b, a> extends true ? 1 : 0 // TODO Broken
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
