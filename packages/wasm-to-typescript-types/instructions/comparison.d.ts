import type { Entry, ProgramState } from "../types.js"
import type { State } from '../state.js'
import * as TypeMath from "ts-type-math"

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
  state extends ProgramState,

  RESULT extends ProgramState =
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
> = RESULT

export type EqualsZero<
  instruction extends IEqualsZero, // unused
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer a extends Entry,
    ]
    ? State.Stack.set<
        [
          ...remaining,
          TypeMath.Equal<a, 0> extends true ? 1 : 0
        ],

        state
      >
    : never
> = RESULT

export type Equals<
  instruction extends IEquals, // unused
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
          TypeMath.Equal<a, b> extends true ? 1 : 0
        ],

        state
      >
    : never
> = RESULT

export type NotEqual<
  instruction extends INotEqual, // unused
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
          TypeMath.NotEqual<b, a> extends true ? 1 : 0
        ],

        state
      >
    : never
> = RESULT

export type GreaterThan<
  instruction extends IGreaterThan, // unused
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer a extends Entry,
      infer b extends Entry,
    ]
    ? State.Stack.set<
        [
          ...remaining,
          TypeMath.GreaterThan<a, b> extends true ? 1 : 0
        ],

        state
      >
    : never
> = RESULT

export type LessThan<
  instruction extends ILessThan, // unused
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer a extends Entry,
      infer b extends Entry,
    ]
    ? State.Stack.set<
        [
          ...remaining,
          TypeMath.LessThan<a, b> extends true ? 1 : 0
        ],
        state
      >
    : never
> = RESULT

export type GreaterThanOrEqual<
  instruction extends IGreaterThanOrEqual, // unused
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer a extends Entry,
      infer b extends Entry,
    ]
    ? State.Stack.set<
        [
          ...remaining,
          TypeMath.GreaterThanOrEqual<a, b> extends true ? 1 : 0
        ],

        state
      >
    : never
> = RESULT

export type LessThanOrEqual<
  instruction extends ILessThanOrEqual, // unused
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer a extends Entry,
      infer b extends Entry,
    ]
    ? State.Stack.set<
        [
          ...remaining,
          TypeMath.LessThanOrEqual<a, b> extends true ? 1 : 0
        ],
        state
      >
    : never
> = RESULT
