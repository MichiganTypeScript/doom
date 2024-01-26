import { Entry, Instruction } from "./instructions.js";
import {
  Branches as BranchesType,
  ExecutionContext,
  Func,
  Funcs as FuncsType,
  Globals as GlobalsType,
  Locals as LocalsType,
  Param,
  ProgramState,
  evaluate,
} from "./program.js";
import { MemoryAddress } from "./memory.js";
import { Cast } from "./utils.js";
import { Call, Numbers } from "hotscript";

export namespace State {

  /** Helpers for Instruction manipulation */
  export namespace Instructions {
    export type set<
      instructions extends Instruction[],
      state extends ProgramState,

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
      state extends ProgramState,

      RESULT extends Instruction[] =
        state['instructions']
    > = RESULT;

    export type concat<
      instructions extends Instruction[],
      state extends ProgramState,
    
      RESULT extends ProgramState =
        set<
          [
            ...instructions,
            ...state['instructions'],
          ],
          state
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
            remaining,
            state
          >
        : never

    > = RESULT

    export type push<
      instruction extends Instruction,
      state extends ProgramState,

      RESULT extends ProgramState =
        set<
          [
            ...state['instructions'],
            instruction,
          ],
          state
        >

    > = RESULT

    export type unshift<
      instruction extends Instruction,
      state extends ProgramState,

      RESULT extends ProgramState =
        set<
          [
            instruction,
            ...state['instructions'],
          ],
          state
        >
    > = RESULT


    export namespace Active {
      export type get<
        state extends ProgramState,

        RESULT extends Instruction =
          State.Instructions.get<state> extends [
            infer active extends Instruction,
            ...infer remaining extends Instruction[],
          ]
          ? active
          : never
      > = RESULT
    }
  }

  /** Helpers for Stack manipulation */
  export namespace Stack {
    export type get<
      state extends ProgramState,

      RESULT extends Entry[] =
        state['stack']
    > = RESULT
    
    export type set<
      stack extends Entry[],
      state extends ProgramState,

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
      entry extends Entry,
      state extends ProgramState,

      RESULT extends ProgramState = 
        set<
          [
            ...state['stack'],
            entry
          ],
          state
        >
    > = RESULT
  }

  /** Helpers for ExecutionContext manipulation */
  export namespace ExecutionContexts {
    /** destructively set all execution contexts at once */
    export type set<
      executionContexts extends ExecutionContext[],
      state extends ProgramState,

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
      executionContext extends ExecutionContext,
      state extends ProgramState,

      RESULT extends ProgramState = set<
        [
          ...state['executionContexts'],
          executionContext
        ],

        state
      >
    > = RESULT

    /** pop a brand new execution context */
    export type pop<
      state extends ProgramState,

      RESULT extends ProgramState = set<
        state['executionContexts'] extends [
          ...infer remaining extends ExecutionContext[],
          infer dropped extends ExecutionContext,
        ]
        ? remaining
        : never,

        state
      >
    > = RESULT

    export namespace Active {
      export type get<
        state extends ProgramState,

        RESULT extends ExecutionContext =
          state['executionContexts'] extends [
            ...infer remaining extends ExecutionContext[],
            infer active extends ExecutionContext,
          ]
          ? active
          : never
      > = RESULT

      export type set<
        executionContext extends ExecutionContext,
        state extends ProgramState,

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
          state extends ProgramState,

          RESULT extends LocalsType =
            State.ExecutionContexts.Active.get<state>['locals']
        > = RESULT;

        
        export type set<
          id extends string,
          value extends Entry,
          state extends ProgramState,

          RESULT extends ProgramState = 
            State.ExecutionContexts.Active.set<
              {
                locals:
                  evaluate<
                  & State.ExecutionContexts.Active.Locals.get<state>
                  & { [k in id]: value }
                  >;

                funcId: State.ExecutionContexts.Active.get<state>['funcId'];
                branches: State.ExecutionContexts.Active.get<state>['branches'];
              },
              state
              >
        > = RESULT
      }

      export namespace Branches {
        export type get<
          state extends ProgramState,

          RESULT extends BranchesType =
            State.ExecutionContexts.Active.get<state>['branches']
        > = RESULT

        
        export type set<
          id extends string,
          instructions extends Instruction[],
          state extends ProgramState,

          RESULT extends ProgramState = 
            State.ExecutionContexts.Active.set<
              {
                branches:
                  evaluate<
                  & State.ExecutionContexts.Active.Branches.get<state>
                  & { [k in id]: instructions }
                  >;

                funcId: State.ExecutionContexts.Active.get<state>['funcId'];
                locals: State.ExecutionContexts.Active.get<state>['locals'];
              },

              state
              >
        > = RESULT
      }
    }
  }

  export namespace Funcs {
    export type get<
      state extends ProgramState,

      RESULT extends FuncsType =
        state['funcs']
    > = RESULT

    export type getById<
      id extends keyof get<state>,
      state extends ProgramState,

      RESULT extends Func = get<state>[id]
    > = RESULT

    /** when you call a function, you have to pop the stack some number of times depending on how many parameters and returns there are */
    export type countCallPops<
      state extends ProgramState,
      funcId extends keyof get<state>,

      RESULT extends number =
        getById<funcId, state> extends {
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

      RESULT extends GlobalsType =
        state['globals']
    > = RESULT
    
    export type insert<
      globals extends GlobalsType,
      state extends ProgramState,

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
      address extends keyof state['memory'],
      state extends ProgramState,

      RESULT extends Entry =
        // no idea why this Cast is needed, but it is
        Cast<state['memory'][address], Entry>
    > = RESULT

    export type insert<
      address extends MemoryAddress,
      entry extends Entry,
      state extends ProgramState,

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

      RESULT extends string[] =
        state['indirect']
    > = RESULT

    export type getByIndex<
      state extends ProgramState,
      id extends number,

      RESULT extends string = get<state>[id]
    > = RESULT
  }
}
