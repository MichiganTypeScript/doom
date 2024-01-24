import { Entry, Instruction } from "./instructions.js";
import { ProgramState, ExecutionContext } from "./program.js";
import { Globals as GlobalsType } from "./module.js";

export namespace Update {

  /** Helpers for Instruction manipulation */
  export namespace Instructions {
    export type set<
      state extends ProgramState,
      instructions extends Instruction[],

      RESULT extends ProgramState = {
        instructions: instructions;
  
        executionContext: state['executionContext'];
        memory: state['memory'];
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
        memory: state['memory'];
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
        memory: state['memory'];
        module: state['module'];
        stack: state['stack'];
      }
    > = RESULT

    export type updateActive<
      state extends ProgramState,
      executionContext extends ExecutionContext,

      RESULT extends ProgramState = 
        set<
          state,
          {
            locals: state['executionContext']['locals']
            & executionContext['locals']
          }
        >
    > = RESULT
  }

  /** Helpers for Globals manipulation */
  export namespace Globals {
    export type insert<
      state extends ProgramState,
      globals extends GlobalsType,

      RESULT extends ProgramState = {
        module: {
          // TODO: maybe should omit this global?
          globals: state['module']['func'] & globals;

          func: state['module']['func'];
        };

        executionContext: state['executionContext'];
        instructions: state['instructions'];
        memory: state['memory'];
        stack: state['stack'];
      }
    > = RESULT
  }

  // TODO
  export namespace Memory {
    export type set<
      state extends ProgramState,
      index extends number,
      value extends number,

      RESULT extends ProgramState = state
    > = RESULT
  }
}
