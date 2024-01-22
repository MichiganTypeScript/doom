import { Entry, Instruction } from "./instructions.js";
import { ProgramState } from "./program.js";

export namespace Update {
  export type setInstructions<
    state extends ProgramState,
    instructions extends Instruction[],

    RESULT extends ProgramState = {
      instructions: instructions;

      module: state['module'];
      stack: state['stack'];
    }
  > = RESULT

  export type pushInstructions<
  state extends ProgramState,
  instructions extends Instruction[],

  RESULT extends ProgramState =
    setInstructions<
      state,
      [
        ...state['instructions'],
        ...instructions
      ]
    >
> = RESULT


  export type setStack<
    state extends ProgramState,
    stack extends Entry[],

    RESULT extends ProgramState = {
      stack: stack;

      instructions: state['instructions'];
      module: state['module'];
    }
  > = RESULT


  export type pushStack<
    state extends ProgramState,
    entry extends Entry,

    RESULT extends ProgramState = 
      setStack<
        state,
        [
          ...state['stack'],
          entry
        ]
      >
  > = RESULT
}
