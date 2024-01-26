import { Entry, Instruction } from "./instructions.js";
import { ProgramState, ExecutionContext, evaluate, Mask } from "./program.js";
import { Globals as GlobalsType } from "./module.js";
import { MemoryAddress } from "./memory.js";
import { Cast } from "./utils.js";

export namespace State {

  /** Helpers for Instruction manipulation */
  export namespace Instructions {
    export type set<
      state extends ProgramState,
      instructions extends Instruction[],

      RESULT extends ProgramState = {
        instructions: instructions;
  
        executionContexts: state['executionContexts'];
        memory: state['memory'];
        memorySize: state['memorySize'];
        module: state['module'];
        stack: state['stack'];
      }
    > = RESULT

    export type get<
      state extends ProgramState
    > = state['instructions'];

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

    export type pop<
      state extends ProgramState,
    
      RESULT extends ProgramState =
        get<state> extends [
          infer discarded extends Instruction,
          ...infer remaining extends Instruction[],
        ]
        ? set<
            state,
            remaining
          >
        : never

    > = RESULT


    export namespace Active {
      export type get<
        state extends ProgramState
      > =
        State.Instructions.get<state> extends [
          infer active extends Instruction,
          ...infer remaining extends Instruction[],
        ]
        ? active
        : never;
    }
  }

  /** Helpers for Stack manipulation */
  export namespace Stack {
    export type set<
      state extends ProgramState,
      stack extends Entry[],

      RESULT extends ProgramState = {
        stack: stack;

        executionContexts: state['executionContexts'];
        instructions: state['instructions'];
        memory: state['memory'];
        memorySize: state['memorySize'];
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
  export namespace ExecutionContexts {
    /** destructively set all execution contexts at once */
    export type set<
      state extends ProgramState,
      executionContexts extends ExecutionContext[],

      RESULT extends ProgramState = {
          executionContexts: executionContexts;

          instructions: state['instructions'];
          memory: state['memory'];
          memorySize: state['memorySize'];
          module: state['module'];
          stack: state['stack'];
        }
    > = RESULT

    /** push a brand new execution context */
    export type push<
      state extends ProgramState,
      executionContext extends ExecutionContext,

      RESULT extends ProgramState = set<
        state,
        [
          ...state['executionContexts'],
          executionContext
        ]
      >
    > = RESULT

    /** pop a brand new execution context */
    export type pop<
      state extends ProgramState,

      RESULT extends ProgramState = set<
        state,
        state['executionContexts'] extends [
          ...infer remaining extends ExecutionContext[],
          infer dropped extends ExecutionContext,
        ]
        ? remaining
        : never
      >
    > = RESULT

    export namespace Active {
      export type get<
        state extends ProgramState,
      > =
        state['executionContexts'] extends [
          ...infer remaining extends ExecutionContext[],
          infer active extends ExecutionContext,
        ]
        ? active
        : never;

      export type set<
        state extends ProgramState,
        executionContext extends ExecutionContext,
      > = {
        executionContexts:
          state['executionContexts'] extends [
            ...infer remaining extends ExecutionContext[],
            infer oldActive extends ExecutionContext, // throw away the old active
          ]
          ? [
              ...remaining,
              executionContext
            ]
          : never;

        instructions: state['instructions'];
        memory: state['memory'];
        memorySize: state['memorySize'];
        module: state['module'];
        stack: state['stack'];
      }

      export namespace Locals {
        export type get<
          state extends ProgramState
        > =
          State.ExecutionContexts.Active.get<state>['locals'];

        
        export type set<
          state extends ProgramState,
          id extends string,
          value extends Entry,

          RESULT extends ProgramState = 
            State.ExecutionContexts.Active.set<
              state,
              {
                locals:
                  evaluate<
                  & State.ExecutionContexts.Active.Locals.get<state>
                  & { [k in id]: value }
                  >;

                funcId: State.ExecutionContexts.Active.get<state>['funcId'];
                masks: State.ExecutionContexts.Active.get<state>['masks'];
              }
              >
        > = RESULT
      }
    }
  }

  /** Helpers for Globals manipulation */
  export namespace Globals {
    export type insert<
      state extends ProgramState,
      globals extends GlobalsType,

      RESULT extends ProgramState = {
        module: {
          globals:
            // TODO: maybe should omit this global?
            & globals
            & state['module']['func'];

          func: state['module']['func'];
        };

        executionContexts: state['executionContexts'];
        instructions: state['instructions'];
        memory: state['memory'];
        memorySize: state['memorySize'];
        stack: state['stack'];
      }
    > = RESULT
  }

  export namespace Memory {
    export type get<
      state extends ProgramState,
      address extends keyof state['memory'],

      RESULT extends Entry =
        // no idea why this Cast is needed, but it is
        Cast<state['memory'][address], Entry>
    > = RESULT

    export type insert<
      state extends ProgramState,
      address extends MemoryAddress,
      entry extends Entry,

      RESULT extends ProgramState = {
        memory:
            & state['memory']
            & { [k in address]: entry }

        executionContexts: state['executionContexts'];
        instructions: state['instructions'];
        memorySize: state['memorySize'];
        module: state['module'];
        stack: state['stack'];
      }
    > = RESULT
  }
}
