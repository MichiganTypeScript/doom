import { Add, Entry, Instruction, Pop, Push, Instructions } from "./instructions.js";
import { ProgramState } from "./program.js";

export namespace Update {
  export type instructions<
    state extends ProgramState,
    instructions extends Instruction[]
  > =
    {
      instructions: instructions;
      input: state['input'];
      scope: state['scope'];
      blocks: state['blocks'];
      skipToLabel: state['skipToLabel'];
      stack: state['stack'];
    }


  export type stack<
    state extends ProgramState,
    stack extends Entry[]
  > =
    {
      instructions: state['instructions'];
      input: state['input'];
      scope: state['scope'];
      blocks: state['blocks'];
      skipToLabel: state['skipToLabel'];
      stack: stack;
    }
}

export type evaluate<t> = { [k in keyof t]: t[k] } & unknown

export type loop<s extends ProgramState> =
  s["instructions"] extends [
    infer head extends Instruction,
    ...infer tail extends Instruction[]
  ]
  ? loop<execute<Update.instructions<s, tail>, head>>
  : evaluate<s>

/** removes the first item from an array and returns the rest */
export type tail<t extends readonly number[]> =
  t extends [unknown, ...infer tail extends number[]]
  ? tail
  : never

export type execute<
    state extends ProgramState,
    instruction extends Instruction
> =
  instruction extends Push
  ? Update.stack<state, [...state["stack"], instruction["arg"]]>
    
  : instruction extends Pop
  ? Update.stack<state, tail<state["stack"]>>

  : instruction extends Add
  ? Instructions.add<state>
  
  : never