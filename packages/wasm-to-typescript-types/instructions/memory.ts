import type { MemoryAddress, ProgramState } from "../types"
import type { State } from '../state'
import { WasmValue, Wasm, Pad } from "ts-type-math"
import type * as TypeMath from 'ts-type-math'

export type IMemorySize = {
  kind: "MemorySize"
}

export type ILoad = {
  kind: "Load"
  offset: WasmValue
  subkind: string
}

export type IStore = {
  kind: "Store"
  offset: WasmValue
  subkind: string
}

export type MemoryInstruction =
  | IMemorySize
  | ILoad
  | IStore

export type HandleMemoryInstructions<
  instruction extends MemoryInstruction,
  state extends ProgramState
> = Satisfies<ProgramState,
  instruction extends IMemorySize
  ? MemorySize<instruction, state>

  : instruction extends ILoad
  ? Load<instruction, state>

  : instruction extends IStore
  ? Store<instruction, state>

  : never
>

export type MemorySize<
  instruction extends IMemorySize, // unused
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.push<
    state['memorySize'],
    state
  >
>

export type Load<
  instruction extends ILoad,
  state extends ProgramState
> = Satisfies<ProgramState,
  instruction['subkind'] extends 'I32Load' ?   I32Load<instruction, state> :
  instruction['subkind'] extends 'I32Load8u' ? I32Load8U<instruction, state> :
  State.unimplemented<instruction, state>
>

export type I32Load<
  instruction extends ILoad,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends WasmValue[],
    infer address extends WasmValue
  ]
  ? State.Stack.set<
      [
        ...remaining,
        TypeMath.Load.Read4Bytes<
          State.Memory.get<state>,
          Wasm.I32Add<address, instruction['offset']>
        >
      ],

      state
    >
  : State.Error<"stack exhausted", instruction, state>
>

type I32Load8U<
  instruction extends ILoad,
  state extends ProgramState,
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends WasmValue[],
    infer address extends WasmValue
  ]
  ? State.Stack.set<
      [
        ...remaining,

        Pad.StartWith24Zeros<
          TypeMath.Load.Read1Byte<
            State.Memory.get<state>,
            Wasm.I32Add<address, instruction['offset']>
          >
        >
      ],

      state
    >
  : State.Error<"stack exhausted", instruction, state>
>

export type Store<
  instruction extends IStore,
  state extends ProgramState
> = Satisfies<ProgramState,
  instruction['subkind'] extends 'I32Store' ? I32Store<instruction, state> :
  instruction['subkind'] extends 'I32Store8' ? I32Store8<instruction, state> :

  State.unimplemented<instruction, state>
>

type I32Store<
  instruction extends IStore,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends WasmValue[],
    infer address extends MemoryAddress,
    infer value extends WasmValue,
  ]
  ? State.Stack.set<
      remaining,

      State.Memory.insert<
        Wasm.I32Add<address, instruction['offset']>,
        TypeMath.SplitToBytes<value>,
        state
      >
    >
  : State.Error<"stack exhausted", instruction, state>
>

type I32Store8<
  instruction extends IStore,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends WasmValue[],
    infer address extends MemoryAddress,
    infer value extends WasmValue,
  ]
  ? State.Stack.set<
      remaining,

      State.Memory.insert<
        Wasm.I32Add<address, instruction['offset']>,
        TypeMath.Store.GetLSB<value>,
        state
      >
    >
  : State.Error<"stack exhausted", instruction, state>
>
