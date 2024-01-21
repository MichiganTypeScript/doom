import { ProgramState } from "./program.js"
import { Call, Numbers } from "hotscript"
import { Update } from "./update.js"

export type Block = {
  kind: "block"
  label: string
  instructions: Instruction[]
}

export type Push = {
  kind: "push"
  arg: number
}

export type Pop = {
  kind: "pop"
}

export type Add = {
  kind: "add"
}

export type Define = {
  kind: "define"
  instructions: Instruction[]
}

/** an item on the stack */
export type Entry = number;

export type Instruction = Block | Push | Pop | Add | Define

export namespace Instructions {
  export type add<state extends ProgramState> =
    state["stack"] extends [
      ...infer remaining extends number[],
      infer b extends number,
      infer a extends number
    ]
    ? Update.stack<
        state,
        [
          ...remaining,
          Call<Numbers.Add<b, a>>
        ]
      >
    : never
}