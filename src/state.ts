import { Entry, Instruction } from "./instructions.js";
import { ProgramState, ExecutionContext, evaluate, Globals as GlobalsType, Func, Param } from "./program.js";
import { MemoryAddress } from "./memory.js";
import { Cast } from "./utils.js";
import { Call, Numbers } from "hotscript";

export namespace State {

  /** Helpers for Instruction manipulation */
  export namespace Instructions {
    export type set<
      state extends ProgramState,
      instructions extends Instruction[],

      RESULT extends ProgramState = {
        instructions: instructions;
  
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        globals: state['globals'];
        indirect: state['indirect'];
        memory: state['memory'];
        memorySize: state['memorySize'];
        stack: state['stack'];
      }
    > = RESULT

    export type get<
      state extends ProgramState
    > = state['instructions'];

    export type concat<
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

    export type push<
      state extends ProgramState,
      instruction extends Instruction,

      RESULT extends ProgramState =
        set<
          state,
          [
            ...state['instructions'],
            instruction,
          ]
        >

    > = RESULT

    export type unshift<
      state extends ProgramState,
      instruction extends Instruction,

      RESULT extends ProgramState =
        set<
          state,
          [
            instruction,
            ...state['instructions'],
          ]
        >

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
    export type get<
      state extends ProgramState,

      RESULT extends Entry[] = state['stack']
    > = RESULT
    
    export type set<
      state extends ProgramState,
      stack extends Entry[],

      RESULT extends ProgramState = {
        stack: stack;

        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        globals: state['globals'];
        indirect: state['indirect'];
        instructions: state['instructions'];
        memory: state['memory'];
        memorySize: state['memorySize'];
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

          funcs: state['funcs'];
          globals: state['globals'];
          indirect: state['indirect'];
          instructions: state['instructions'];
          memory: state['memory'];
          memorySize: state['memorySize'];
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

        RESULT extends ProgramState = {
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
  
          funcs: state['funcs'];
          globals: state['globals'];
          indirect: state['indirect'];
          instructions: state['instructions'];
          memory: state['memory'];
          memorySize: state['memorySize'];
          stack: state['stack'];
        }
      > = RESULT

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
                branches: State.ExecutionContexts.Active.get<state>['branches'];
              }
              >
        > = RESULT
      }

      export namespace Branches {
        export type get<
          state extends ProgramState
        > =
          State.ExecutionContexts.Active.get<state>['branches'];

        
        export type set<
          state extends ProgramState,
          id extends string,
          instructions extends Instruction[],

          RESULT extends ProgramState = 
            State.ExecutionContexts.Active.set<
              state,
              {
                branches:
                  evaluate<
                  & State.ExecutionContexts.Active.Branches.get<state>
                  & { [k in id]: instructions }
                  >;

                funcId: State.ExecutionContexts.Active.get<state>['funcId'];
                locals: State.ExecutionContexts.Active.get<state>['locals'];
              }
              >
        > = RESULT
      }
    }
  }

  export namespace Funcs {
    export type get<
      state extends ProgramState,

      RESULT extends Record<string, Func> = state['funcs']
    > = RESULT

    export type getById<
      state extends ProgramState,
      id extends keyof get<state>,

      RESULT extends Func = get<state>[id]
    > = RESULT

    /** when you call a function, you have to pop the stack some number of times depending on how many parameters and returns there are */
    export type countCallPops<
      state extends ProgramState,
      funcId extends keyof get<state>,

      RESULT extends number =
        getById<state, funcId> extends {
          params: infer params extends Param[];
          result: infer result extends number;
        }
        ? Call<Numbers.Add<params['length'], result>>
        : never
    > = RESULT
  }

  /** Helpers for Globals manipulation */
  export namespace Globals {
    export type get<
      state extends ProgramState,

      RESULT extends GlobalsType = state['globals']
    > = RESULT
    
    export type insert<
      state extends ProgramState,
      globals extends GlobalsType,

      RESULT extends ProgramState = {

        globals:
          evaluate<
          // TODO: maybe should omit this global?
          & Omit<get<state>, keyof globals>
          & globals
          >;

        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        indirect: state['indirect'];
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

        funcs: state['funcs'];
        globals: state['globals'];
        executionContexts: state['executionContexts'];
        indirect: state['indirect'];
        instructions: state['instructions'];
        memorySize: state['memorySize'];
        stack: state['stack'];
      }
    > = RESULT
  }

  /** Helpers for indirect function lookups */
  export namespace Indirect {
    export type get<
      state extends ProgramState,

      RESULT extends string[] = state['indirect']
    > = RESULT

    export type getByIndex<
      state extends ProgramState,
      id extends number,

      RESULT extends string = get<state>[id]
    > = RESULT
  }
}
