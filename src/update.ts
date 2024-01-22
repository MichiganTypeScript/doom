import { Entry, Instruction } from "./instructions.js";
import { ProgramState, ExecutionContext } from "./program.js";

export namespace Update {

  /** Helpers for Instruction manipulation */
  export namespace Instructions {
    export type set<
      state extends ProgramState,
      instructions extends Instruction[],
  
      RESULT extends ProgramState = {
        instructions: instructions;
  
        executionContext: state['executionContext'];
        module: state['module'];
        stack: state['stack'];
      }
    > = RESULT
  
    export type push<
    state extends ProgramState,
    instructions extends Instruction[],
  
    RESULT extends ProgramState =
      set<
        state,
        [
          ...instructions,
          ...state['instructions'],
        ]
      >
  > = RESULT
  }


  /** Helpers for Stack manipulation */
  export namespace Stack {
    export type set<
      state extends ProgramState,
      stack extends Entry[],

      RESULT extends ProgramState = {
        stack: stack;

        executionContext: state['executionContext'];
        instructions: state['instructions'];
        module: state['module'];
      }
    > = RESULT


    export type push<
      state extends ProgramState,
      entry extends Entry,

      RESULT extends ProgramState = 
        set<
          state,
          [
            ...state['stack'],
            entry
          ]
        >
    > = RESULT
  }

  /** Helpers for ExecutionContext manipulation */
  export namespace ExecutionContext {
    export type set<
      state extends ProgramState,
      executionContext extends ExecutionContext,

      RESULT extends ProgramState = {
        executionContext: executionContext;
        
        instructions: state['instructions'];
        module: state['module'];
        stack: state['stack'];
      }
    > = RESULT


    // export type push<
    //   state extends ProgramState,
    //   executionContext extends ExecutionContext,

    //   RESULT extends ProgramState = 
    //     set<
    //       state,
    //       [
    //         ...state['executionContext'],
    //         executionContext
    //       ]
    //     >
    // > = RESULT
  }

}
