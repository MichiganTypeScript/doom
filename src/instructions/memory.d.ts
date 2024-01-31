import type { Entry, MemoryAddress, ProgramState } from "../types.js";
import type { State } from '../state.js'
import * as TypeMath from "../ts-type-math/index.js"


export type IMemorySize = {
  kind: "MemorySize"
}

export type II32Load = {
  kind: "I32Load";
  offset: number
}

export type II64Load = {
  kind: "I64Load";
  offset: number
}

export type IF32Load = {
  kind: "F32Load";
  offset: number
}

export type IF64Load = {
  kind: "F64Load";
  offset: number
}

export type II32Load8s = {
  kind: "I32Load8s";
  offset: number
}

export type II32Load8u = {
  kind: "I32Load8u";
  offset: number
}

export type II32Load16s = {
  kind: "I32Load16s";
  offset: number
}

export type II32Load16u = {
  kind: "I32Load16u";
  offset: number
}

export type II64Load8s = {
  kind: "I64Load8s";
  offset: number
}

export type II64Load8u = {
  kind: "I64Load8u";
  offset: number
}

export type II64Load16s = {
  kind: "I64Load16s";
  offset: number
}

export type II64Load16u = {
  kind: "I64Load16u";
  offset: number
}

export type II64Load32s = {
  kind: "I64Load32s";
  offset: number
}

export type II64Load32u = {
  kind: "I64Load32u";
  offset: number
}

export type II32Store = {
  kind: "I32Store";
  offset: number
}

export type II64Store = {
  kind: "I64Store";
  offset: number
}

export type IF32Store = {
  kind: "F32Store";
  offset: number
}

export type IF64Store = {
  kind: "F64Store";
  offset: number
}

export type II32Store8 = {
  kind: "I32Store8";
  offset: number
}

export type II32Store16 = {
  kind: "I32Store16";
  offset: number
}

export type II64Store8 = {
  kind: "I64Store8";
  offset: number
}

export type II64Store16 = {
  kind: "I64Store16";
  offset: number
}

export type II64Store32 = {
  kind: "I64Store32";
  offset: number
}

export type MemoryInstruction =
  | IMemorySize
  | II32Load
  | II64Load
  | IF32Load
  | IF64Load
  | II32Load8s
  | II32Load8u
  | II32Load16s
  | II32Load16u
  | II64Load8s
  | II64Load8u
  | II64Load16s
  | II64Load16u
  | II64Load32s
  | II64Load32u
  | II32Store
  | II64Store
  | IF32Store
  | IF64Store
  | II32Store8
  | II32Store16
  | II64Store8
  | II64Store16
  | II64Store32

export type HandleMemoryInstructions<
  instruction extends MemoryInstruction,
  state extends ProgramState,

  RESULT extends ProgramState =
    instruction extends IMemorySize
    ? MemorySize<instruction, state>

    : instruction extends II32Load
    ? I32Load<instruction, state>

    : instruction extends II64Load
    ? I64Load<instruction, state>

    : instruction extends IF32Load
    ? F32Load<instruction, state>

    : instruction extends IF64Load
    ? F64Load<instruction, state>

    : instruction extends II32Load8s
    ? I32Load8s<instruction, state>

    : instruction extends II32Load8u
    ? I32Load8u<instruction, state>

    : instruction extends II32Load16s
    ? I32Load16s<instruction, state>

    : instruction extends II32Load16u
    ? I32Load16u<instruction, state>

    : instruction extends II64Load8s
    ? I64Load8s<instruction, state>

    : instruction extends II64Load8u
    ? I64Load8u<instruction, state>

    : instruction extends II64Load16s
    ? I64Load16s<instruction, state>

    : instruction extends II64Load16u
    ? I64Load16u<instruction, state>

    : instruction extends II64Load32s
    ? I64Load32s<instruction, state>

    : instruction extends II64Load32u
    ? I64Load32u<instruction, state>

    : instruction extends II32Store
    ? I32Store<instruction, state>

    : instruction extends II64Store
    ? I64Store<instruction, state>

    : instruction extends IF32Store
    ? F32Store<instruction, state>

    : instruction extends IF64Store
    ? F64Store<instruction, state>

    : instruction extends II32Store8
    ? I32Store8<instruction, state>

    : instruction extends II32Store16
    ? I32Store16<instruction, state>

    : instruction extends II64Store8
    ? I64Store8<instruction, state>

    : instruction extends II64Store16
    ? I64Store16<instruction, state>

    : instruction extends II64Store32
    ? I64Store32<instruction, state>

    : never
> = RESULT

export type MemorySize<
  instruction extends IMemorySize,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.push<
      state['memorySize'],
      state
    >
> = RESULT

export type I32Load<
  instruction extends II32Load,
  state extends ProgramState,

  RESULT extends ProgramState =
    state['stack'] extends [
      ...infer remaining extends Entry[],
      infer address extends MemoryAddress
    ]
    ? State.Stack.set<
        [
          ...remaining,

          State.Memory.getByAddress<
            address,
            instruction['offset'],
            state
          >
        ],

        state
      >
    : never
> = RESULT

export type I64Load<
  instruction extends II64Load,
  state extends ProgramState,

  RESULT extends ProgramState =
    state['stack'] extends [
      ...infer remaining extends Entry[],
      infer address extends MemoryAddress
    ]
    ? State.Stack.set<
        [
          ...remaining,

          State.Memory.getByAddress<
            address,
            instruction['offset'],
            state
          >
        ],

        state
      >
    : never
> = RESULT

export type F32Load<
  instruction extends IF32Load,
  state extends ProgramState,

  RESULT extends ProgramState =
    state['stack'] extends [
      ...infer remaining extends Entry[],
      infer address extends MemoryAddress
    ]
    ? State.Stack.set<
        [
          ...remaining,

          State.Memory.getByAddress<
            address,
            instruction['offset'],
            state
          >
        ],

        state
      >
    : never
> = RESULT

export type F64Load<
  instruction extends IF64Load,
  state extends ProgramState,

  RESULT extends ProgramState =
    state['stack'] extends [
      ...infer remaining extends Entry[],
      infer address extends MemoryAddress
    ]
    ? State.Stack.set<
        [
          ...remaining,

          State.Memory.getByAddress<
            address,
            instruction['offset'],
            state
          >
        ],

        state
      >
    : never
> = RESULT

export type I32Load8s<
  instruction extends II32Load8s,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type I32Load8u<
  instruction extends II32Load8u,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer address extends MemoryAddress,
    ]
    ? State.Stack.set<
        [
          ...remaining,
          State.Memory.getByAddress<
            address,
            instruction['offset'],
            state
          >
        ],
        state
      >
    : State.Error<instruction, "insufficient stack", state>

    // check if it's negative and less than 256 because if so we can just grab it as is
> = RESULT

export type I32Load16s<
  instruction extends II32Load16s,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type I32Load16u<
  instruction extends II32Load16u,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type I64Load8s<
  instruction extends II64Load8s,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type I64Load8u<
  instruction extends II64Load8u,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type I64Load16s<
  instruction extends II64Load16s,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type I64Load16u<
  instruction extends II64Load16u,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type I64Load32s<
  instruction extends II64Load32s,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type I64Load32u<
  instruction extends II64Load32u,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

// TODO this is wrong
export type I32Store<
  instruction extends II32Store,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer address extends MemoryAddress,
      infer entry extends Entry,
    ]
    ? State.Stack.set<
        remaining,

        State.Memory.insert<
          address,
          instruction['offset'],
          [entry], // WRONG!
          state
        >
      >
    : State.Error<
        instruction,
        "I32Store: stack is empty",
        state
      >
> = RESULT

// TODO this is wrong
export type I64Store<
  instruction extends II64Store,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer address extends MemoryAddress,
      infer entry extends Entry,
    ]
    ? State.Stack.set<
        remaining,

        State.Memory.insert<
          address,
          instruction['offset'],
          [entry], // WRONG!
          state
        >
      >
    : never
> = RESULT

// TODO this is wrong
export type F32Store<
  instruction extends IF32Store,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer address extends MemoryAddress,
      infer entry extends Entry,
    ]
    ? State.Stack.set<
        remaining,

        State.Memory.insert<
          address,
          instruction['offset'],
          [entry], // WRONG!
          state
        >
      >
    : never
> = RESULT

// TODO this is wrong
export type F64Store<
  instruction extends IF64Store,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer address extends MemoryAddress,
      infer entry extends Entry,
    ]
    ? State.Stack.set<
        remaining,

        State.Memory.insert<
          address,
          instruction['offset'],
          [entry], // WRONG!
          state
        >
      >
    : never
> = RESULT

export type I32Store8<
  instruction extends II32Store8,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer address extends MemoryAddress,
      infer entry extends Entry,
    ]
    ? // if it happens to already be less than 256 (i.e. a u8), then we can store it as is and skip all the bitwise conversion nonsense
      TypeMath.LessThan<entry, 256> extends true
      ? State.Stack.set<
          remaining,

          State.Memory.insert<
            address,
            instruction['offset'],
            [entry],
            state
          >
        >
      : State.Instructions.Unimplemented<instruction, state>
    : State.Error<instruction, "insufficient stack", state>
> = RESULT

export type I32Store16<
  instruction extends II32Store16,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type I64Store8<
  instruction extends II64Store8,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type I64Store16<
  instruction extends II64Store16,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT

export type I64Store32<
  instruction extends II64Store32,
  state extends ProgramState,

  RESULT extends ProgramState =
    State.Instructions.Unimplemented<
      instruction,
      state
    >
> = RESULT