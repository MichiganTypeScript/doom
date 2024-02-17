import type { Entry, ProgramState } from "../types.ts"
import type { State } from '../state.d.ts'

export type ILocalGet = {
  kind: "LocalGet"

  /** a local identifier */
  id: string
}

export type ILocalSet = {
  kind: "LocalSet"

  /** a local identifier */
  id: string
}

export type ILocalTee = {
  kind: "LocalTee"

  /** a local identifier */
  id: string
}

export type IGlobalGet = {
  kind: "GlobalGet"

  /** a local identifier */
  id: string
}

export type IGlobalSet = {
  kind: "GlobalSet"

  /** a local identifier */
  id: string
}

export type VariableInstruction =
  | ILocalGet
  | ILocalSet
  | ILocalTee
  | IGlobalGet
  | IGlobalSet

export type HandleVariableInstructions<
  instruction extends VariableInstruction,
  state extends ProgramState
> = Satisfies<ProgramState,
  instruction extends ILocalGet
  ? LocalGet<instruction, state>

  : instruction extends ILocalSet
  ? LocalSet<instruction, state>

  : instruction extends ILocalTee
  ? LocalTee<instruction, state>

  : instruction extends IGlobalGet
  ? GlobalGet<instruction, state>

  : instruction extends IGlobalSet
  ? GlobalSet<instruction, state>

  : never
>

export type LocalGet<
  instruction extends ILocalGet,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.push<
    State.ExecutionContexts.Active.Locals.get<state>[instruction['id']],
    state
  >
>

export type LocalSet<
  instruction extends ILocalSet,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends Entry[],
    infer entry extends Entry,
  ]
  ? State.Stack.set<
      remaining,

      State.ExecutionContexts.Active.Locals.insert<
        instruction['id'],
        entry,
        state
      >
    >
  : never
>

export type LocalTee<
  instruction extends ILocalTee,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends Entry[],
    infer entry extends Entry
  ]
  ? State.ExecutionContexts.Active.Locals.insert<
      instruction['id'],
      entry,
      state
    >
  : never
>

export type GlobalGet<
  instruction extends IGlobalGet,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.push<
    State.Globals.get<state>[instruction['id']],
    state
  >
>

export type GlobalSet<
  instruction extends IGlobalSet,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends Entry[],
    infer a extends Entry,
  ]
  ? State.Stack.set<
      remaining,

      State.Globals.insert<
        Record<instruction['id'], a>,
        state
      >
    >
  : never
>
