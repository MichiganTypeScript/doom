import { ProgramState } from "./program.js"
import { Call, Numbers } from "hotscript"
import { Update } from "./update.js"

export type IAdd = {
  kind: "add"
}

export type ICall = {
  kind: "Call"

  /** a function identifier */
  id: string;
}

export type ILocalGet = {
  kind: "LocalGet"

  /** a local identifier */
  id: string
}

export type IConst = {
  kind: "Const"

  /** a constant value */
  value: number;
}

/** an item on the stack */
export type Entry = number;

export type Instruction = ILocalGet | IAdd | ICall

export namespace Instructions {

  /** this encapsulates I32Add, I64Add, F32Add, F64Add */
  export type Add<
    state extends ProgramState,
    instruction extends IAdd // unused
  > =
    state["stack"] extends [
      ...infer remaining extends number[],
      infer b extends number,
      infer a extends number
    ]
    ? Update.pushStack<
        state,
        Call<Numbers.Add<a, b>>
      >
    : never

  export type LocalGet<
    state extends ProgramState,
    instruction extends ILocalGet
  > =
    state

  export type CallInst<
    state extends ProgramState,
    instruction extends ICall,

    _id extends instruction['id'] = instruction['id']
  > =
    Update.pushInstructions<
      state,
      state["module"]['func'][_id]['instructions']
    >
}
