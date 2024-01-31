import { Instruction } from "./instructions.js";
import {
  BranchesById,
  ExecutionContext,
  Entry,
  Func,
  FuncsById,
  GlobalsById,
  LocalsById,
  MemoryAddress,
  MemoryByAddress,
  Param,
  ProgramState,
  evaluate,
} from "./program.js";
import { U8Decimal } from "./ts-type-math/conversion.js";
import * as TypeMath from "./ts-type-math/index.js";

export namespace State {
  export type Error<
    instruction extends Instruction,
    reason extends string,

    state extends ProgramState,

    RESULT extends ProgramState =
      State.Instructions.push<
        { kind: 'Halt', reason: reason, instruction: instruction },
        state
      >
  > = RESULT

  export namespace Count {
    export type get<
      state extends ProgramState,

      RESULT extends number =
        state['count']
    > = RESULT

    export type increment<
      state extends ProgramState,

      RESULT extends ProgramState = {
        count: TypeMath.Add<state['count'], 1>;

        activeExecutionContext: state['activeExecutionContext'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        globals: state['globals'];
        indirect: state['indirect'];
        instructions: state['instructions'];
        memory: state['memory'];
        memorySize: state['memorySize'];
        stack: state['stack'];
      }
    > = RESULT
  }


  /** Helpers for Instruction manipulation */
  export namespace Instructions {
    export type set<
      instructions extends Instruction[],
      state extends ProgramState,

      RESULT extends ProgramState = {
        instructions: instructions;

        activeExecutionContext: state['activeExecutionContext'];
        count: state['count'];
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

    export type popUntil<
      instruction extends Instruction,
      state extends ProgramState,

      RESULT extends ProgramState =
        get<state> extends [
          infer discarded extends Instruction,
          ...infer remaining extends Instruction[],
        ]
        ? discarded extends instruction

          // we found the matching instruction: we can dipset
          ? state

          // we didn't find the matching instruction: we have to keep popping
          : popUntil<
              instruction,
              set<
                remaining,
                state
              >
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

    export type Unimplemented<
      instruction extends Instruction,
      state extends ProgramState,
      
      RESULT extends ProgramState =
        push<
        { kind: 'Halt', reason: "Unimplemented Instruction", instruction: instruction },
          state
        >
    > = RESULT
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

        activeExecutionContext: state['activeExecutionContext'];
        count: state['count'];
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
            ...get<state>,
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

          activeExecutionContext: state['activeExecutionContext'];
          count: state['count'];
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

      RESULT extends ProgramState = {
        executionContexts: [
          ...state['executionContexts'],
          // add the old active execution context to the stack
          state['activeExecutionContext']
        ];

        // set the new one
        activeExecutionContext: executionContext;
        count: state['count'];
        funcs: state['funcs'];
        globals: state['globals'];
        indirect: state['indirect'];
        instructions: state['instructions'];
        memory: state['memory'];
        memorySize: state['memorySize'];
        stack: state['stack'];
      }
    > = RESULT

    /** pop a brand new execution context */
    export type pop<
      state extends ProgramState,

      RESULT extends ProgramState = 
      state['executionContexts'] extends [
        ...infer remaining extends ExecutionContext[],
        infer active extends ExecutionContext,
      ]
      ? {
          executionContexts: remaining;

          // set the new one
          activeExecutionContext: active;
          count: state['count'];
          funcs: state['funcs'];
          globals: state['globals'];
          indirect: state['indirect'];
          instructions: state['instructions'];
          memory: state['memory'];
          memorySize: state['memorySize'];
          stack: state['stack'];
        }
      : never
    > = RESULT

    export namespace Active {
      export type get<
        state extends ProgramState,

        RESULT extends ExecutionContext =
          state['activeExecutionContext']
      > = RESULT

      export type set<
        executionContext extends ExecutionContext,
        state extends ProgramState,

        RESULT extends ProgramState = {
          activeExecutionContext: executionContext;
          
          count: state['count'];
          executionContexts: state['executionContexts']
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

          RESULT extends LocalsById =
            State.ExecutionContexts.Active.get<state>['locals']
        > = RESULT;

        
        export type insert<
          id extends string,
          value extends Entry,
          state extends ProgramState,

          RESULT extends ProgramState = 
            State.ExecutionContexts.Active.set<
              {
                locals:
                  evaluate<
                  & Omit<State.ExecutionContexts.Active.Locals.get<state>, id>
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

          RESULT extends BranchesById =
            State.ExecutionContexts.Active.get<state>['branches']
        > = RESULT

        export type set<
          branches extends BranchesById,
          state extends ProgramState,

          RESULT extends ProgramState =
            State.ExecutionContexts.Active.set<
              {
                branches: branches;
                funcId: State.ExecutionContexts.Active.get<state>['funcId'];
                locals: State.ExecutionContexts.Active.get<state>['locals'];
              },
              state
            >
        > = RESULT

        
        export type merge<
          id extends string,
          instructions extends Instruction[],
          state extends ProgramState,

          RESULT extends ProgramState = 
            set<
              evaluate<
              & Omit<State.ExecutionContexts.Active.Branches.get<state>, id>
              & { [k in id]: instructions }
              >,
              state
            >
        > = RESULT
      }
    }
  }

  export namespace Funcs {
    export type get<
      state extends ProgramState,

      RESULT extends FuncsById =
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
        ? TypeMath.Add<params['length'], result>
        : never
    > = RESULT
  }

  /** Helpers for Globals manipulation */
  export namespace Globals {
    export type get<
      state extends ProgramState,

      RESULT extends GlobalsById =
        state['globals']
    > = RESULT
    
    export type insert<
      globals extends GlobalsById,
      state extends ProgramState,

      RESULT extends ProgramState = {

        globals:
          evaluate<
          & Omit<get<state>, keyof globals>
          & globals
          >;

        activeExecutionContext: state['activeExecutionContext'];
        count: state['count'];
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

      RESULT extends MemoryByAddress =
        state['memory']
    > = RESULT

    export type getByAddress<
      address extends MemoryAddress,
      offset extends number,
      state extends ProgramState,

      RESULT extends Entry =
        get<state>[TypeMath.Add<address, offset>]
    > = RESULT

    type CollectBytes<
      bytes extends number[],
      address extends number,

      _Acc extends Record<number, number> = {},

      RESULT extends Record<number, number> =
        bytes extends [
          infer head extends number, // WASM is little-endian so these go in first
          ...infer tail extends number[]
        ]
        ? CollectBytes<
            tail,
            TypeMath.Add<address, 1>,
            _Acc & { [k in address]: head }
          >
        : _Acc
    > = RESULT

    export type insert<
      address extends MemoryAddress,
      offset extends number,
      bytes extends number[],

      state extends ProgramState,

      _update extends Record<number, number> =
        CollectBytes<
          bytes,
          TypeMath.Add<address, offset>
        >,

      RESULT extends ProgramState = {
        memory:
            // & Omit<state['memory'], keyof _update>
            evaluate<
            & state['memory']
            & _update
            >;

        activeExecutionContext: state['activeExecutionContext'];
        count: state['count'];
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
