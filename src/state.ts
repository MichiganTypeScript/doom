import { Entry, Instruction } from "./instructions.js";
import { ProgramState, ExecutionContext, evaluate, Mask } from "./program.js";
import { Globals as GlobalsType } from "./module.js";
import { MemoryAddress } from "./memory.js";
import { Cast } from "./utils.js";

export namespace State {
  /** Helpers for Stack manipulation */
  export namespace Stack {
    export type get<
      state extends ProgramState
    > = state['stack']
    
    export type set<
      state extends ProgramState,
      stack extends Entry[],

      RESULT extends ProgramState = {
        stack: stack;

        executionContexts: state['executionContexts'];
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

        memory: state['memory'];
        memorySize: state['memorySize'];
        module: state['module'];
        stack: state['stack'];
      }


      export namespace Instructions {
        export type get<
          state extends ProgramState,
        > =
          State.ExecutionContexts.Active.get<state>['instructions'];

        export type set<
          state extends ProgramState,
          instructions extends Instruction[],

          RESULT extends ProgramState = 
            State.ExecutionContexts.Active.set<
              state,
              {
                instructions: instructions;

                funcId: State.ExecutionContexts.Active.get<state>['funcId'];
                locals: State.ExecutionContexts.Active.get<state>['locals'];
                masks: State.ExecutionContexts.Active.get<state>['masks'];
              }
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

        export type push<
          state extends ProgramState,
          instructions extends Instruction[],
        
          RESULT extends ProgramState =
            set<
              state,
              [
                ...instructions,
                ...get<state>,
              ]
            >
        > = RESULT

      /** in a control flow situation where we are trying to (effectively) match up parenthesis of control flow structures (like If, Else, End, etc.) we may need to skip instructions and continue until we find what our heart desires */
      export type shouldSkip<
        state extends ProgramState,
        instruction extends Instruction,
      > =
        State.ExecutionContexts.Active.Masks.isEmpty<state> extends true

        // we should not skip because the execution context mask is empty which means we can freely execute the next instruction
        ? false

        // there is at least some mask, so we should check whether it matches instruction
        : instruction['kind'] extends State.ExecutionContexts.Active.Masks.Active.get<state>

          // we should not skip because we hit the instruction we want
          // the instruction itself will handle resolving things
          ? false

          // we
          : true

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
                instructions: State.ExecutionContexts.Active.get<state>['instructions'];
                masks: State.ExecutionContexts.Active.get<state>['masks'];
              }
              >
        > = RESULT
      }


      export namespace Masks {
        export type get<
          state extends ProgramState
        > =
          State.ExecutionContexts.Active.get<state>['masks'];

        export type isEmpty<
          state extends ProgramState
        > =
          get<state>['length'] extends 0
          ? true
          : false;

        export type set<
          state extends ProgramState,
          mask extends Mask[],

          RESULT extends ProgramState = 
            State.ExecutionContexts.Active.set<
              state,
              {
                masks: mask;

                funcId: State.ExecutionContexts.Active.get<state>['funcId'];
                instructions: State.ExecutionContexts.Active.get<state>['instructions'];
                locals: State.ExecutionContexts.Active.get<state>['locals'];
              }
              >
        > = RESULT
      
        export type push<
          state extends ProgramState,
          mask extends Mask,

          RESULT extends ProgramState = 
            State.ExecutionContexts.Active.set<
              state,
              {
                masks: [
                  ...get<state>,
                  mask
                ];

                funcId: State.ExecutionContexts.Active.get<state>['funcId'];
                instructions: State.ExecutionContexts.Active.get<state>['instructions'];
                locals: State.ExecutionContexts.Active.get<state>['locals'];
              }
              >
        > = RESULT

        export namespace Active {
          export type get<
            state extends ProgramState
          > =
            State.ExecutionContexts.Active.Masks.get<state> extends [
              ...infer remaining extends Mask[],
              infer active extends Mask,
            ]
            ? active
            : never

          export type pop<
            state extends ProgramState
          > =
            State.ExecutionContexts.Active.Masks.get<state> extends [
              ...infer remaining extends Mask[],
              infer active extends Mask,
            ]
            ? State.ExecutionContexts.Active.Masks.set<state, remaining>
            : never

          export type replace<
            state extends ProgramState,
            mask extends Mask,
          > =
            State.ExecutionContexts.Active.Masks.get<state> extends [
              ...infer remaining extends Mask[],
              infer discarded extends Mask,
            ]
            ? State.ExecutionContexts.Active.Masks.set<
                state,
                [
                  ...remaining,
                  mask
                ]
              >
            : never
        }
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
        memorySize: state['memorySize'];
        module: state['module'];
        stack: state['stack'];
      }
    > = RESULT
  }
}
