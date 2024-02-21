import type { Instruction } from "./instructions/instructions"
import type {
  BranchesById,
  ExecutionContext,
  Func,
  FuncsById,
  GlobalsById,
  LocalsById,
  MemoryAddress,
  MemoryByAddress,
  Param,
  ProgramState,
} from "./types"
import * as TypeMath from "ts-type-math";
import { WasmValue, WasmType, Convert, Wasm } from 'ts-type-math';

export namespace State {
  export type Error<
    reason extends string,
    instruction extends Instruction,

    state extends ProgramState
  > = Satisfies<ProgramState,
    State.Instructions.unshift<
      {
        kind: 'Halt',
        reason: `ERROR(${State.Count.get<state>}): ${reason}`,
        instruction: instruction
      },
      state
    >
  >

  export type debug<
    stuff extends any,
    state extends ProgramState
  > = Satisfies<ProgramState,
    State.Instructions.unshift<
      {
        kind: "Halt",
        stuff: stuff,
      },
      state
    >
  >

  export type unimplemented<
    instruction extends Instruction,
    state extends ProgramState
  > = Satisfies<ProgramState,
    State.Instructions.unshift<
      {
        kind: 'Halt',
        reason: "Unimplemented Instruction",
        instruction: instruction
      },
      state
    >
  >

  export namespace Count {
    export type get<
      state extends ProgramState,
    > = Satisfies<number,
      state['count']
    >

    export type increment<
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: TypeMath.Add<state['count'], 1>;

        result: state['result'];
        stack: state['stack'];
        instructions: state['instructions'];
        activeExecutionContext: state['activeExecutionContext'];
        globals: state['globals'];
        memory: state['memory'];
        indirect: state['indirect'];
        memorySize: state['memorySize'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
      }
    >
  }

  /** Helpers for Instruction manipulation */
  export namespace Instructions {
    export type set<
      instructions extends Instruction[],
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: state['count'];
        result: state['result'];
        stack: state['stack'];

        instructions: instructions;

        activeExecutionContext: state['activeExecutionContext'];
        globals: state['globals'];
        memory: state['memory'];
        indirect: state['indirect'];
        memorySize: state['memorySize'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
      }
    >

    export type get<
      state extends ProgramState
    > = Satisfies<Instruction[],
      state['instructions']
    >

    export type concat<
      instructions extends Instruction[],
      state extends ProgramState
    > = Satisfies<ProgramState,
      set<
        [
          ...instructions,
          ...state['instructions'],
        ],
        state
      >
    >

    export type pop<
      state extends ProgramState
    > = Satisfies<ProgramState,
      get<state> extends [
        infer discarded extends Instruction,
        ...infer remaining extends Instruction[],
      ]
      ? set<
          remaining,
          state
        >
      : never
    >

    export type popUntil<
      instruction extends Instruction,
      state extends ProgramState
    > = Satisfies<ProgramState,
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
    >

    export type push<
      instruction extends Instruction,
      state extends ProgramState
    > = Satisfies<ProgramState,
      set<
        [
          ...state['instructions'],
          instruction,
        ],
        state
      >
    >

    export type unshift<
      instruction extends Instruction,
      state extends ProgramState
    > = Satisfies<ProgramState,
      set<
        [
          instruction,
          ...state['instructions'],
        ],
        state
      >
    >
  }

  /** Helpers for Stack manipulation */
  export namespace Stack {
    export type get<
      state extends ProgramState
    > = Satisfies<WasmValue[],
      state['stack']
    >
    
    export type set<
      stack extends WasmValue[],
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: state['count'];
        result: state['result'];

        stack: stack;

        instructions: state['instructions'];
        activeExecutionContext: state['activeExecutionContext'];
        globals: state['globals'];
        memory: state['memory'];
        indirect: state['indirect'];
        memorySize: state['memorySize'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
      }
    >

    export type push<
      value extends WasmValue,
      state extends ProgramState
    > = Satisfies<ProgramState,
      set<
        [
          ...get<state>,
          value
        ],
        state
      >
    >
  }

  /** Helpers for ExecutionContext manipulation */
  export namespace ExecutionContexts {
    /** destructively set all execution contexts at once */
    export type set<
      executionContexts extends ExecutionContext[],
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: state['count'];
        result: state['result'];
        stack: state['stack'];
        instructions: state['instructions'];
        activeExecutionContext: state['activeExecutionContext'];
        globals: state['globals'];
        memory: state['memory'];
        indirect: state['indirect'];
        memorySize: state['memorySize'];
        
        executionContexts: executionContexts;
        
        funcs: state['funcs'];
      }
    >

    /** push a brand new execution context */
    export type push<
      executionContext extends ExecutionContext,
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: state['count'];
        result: state['result'];
        stack: state['stack'];
        instructions: state['instructions'];

        // set the new one
        activeExecutionContext: executionContext;

        globals: state['globals'];
        memory: state['memory'];
        indirect: state['indirect'];
        memorySize: state['memorySize'];

        executionContexts: [
          ...state['executionContexts'],
          // add the old active execution context to the stack
          state['activeExecutionContext']
        ];

        funcs: state['funcs'];
      }
    >

    /** pop a brand new execution context */
    export type pop<
      state extends ProgramState
    > = Satisfies<ProgramState,
      state['executionContexts'] extends [
        ...infer remaining extends ExecutionContext[],
        infer active extends ExecutionContext,
      ]
      ? {
          count: state['count'];
          result: state['result'];
          stack: state['stack'];
          instructions: state['instructions'];
          
          // set the new one
          activeExecutionContext: active;
          
          globals: state['globals'];
          memory: state['memory'];
          indirect: state['indirect'];
          memorySize: state['memorySize'];
          
          executionContexts: remaining;

          funcs: state['funcs'];
        }
      : never
    >

    export namespace Active {
      export type get<
        state extends ProgramState
      > = Satisfies<ExecutionContext,
        state['activeExecutionContext']
      >

      export type set<
        executionContext extends ExecutionContext,
        state extends ProgramState
      > = Satisfies<ProgramState,
        {
          count: state['count'];
          result: state['result'];
          stack: state['stack'];
          instructions: state['instructions'];

          activeExecutionContext: executionContext;

          globals: state['globals'];
          memory: state['memory'];
          indirect: state['indirect'];
          memorySize: state['memorySize'];
          executionContexts: state['executionContexts'];
          funcs: state['funcs'];
        }
      >

      export namespace Locals {
        export type get<
          state extends ProgramState
        > = Satisfies<LocalsById,
          State.ExecutionContexts.Active.get<state>['locals']
        >

        export type insert<
          id extends string,
          value extends WasmValue,
          state extends ProgramState
        > = Satisfies<ProgramState,
          State.ExecutionContexts.Active.set<
            {
              locals:
                evaluate<
                & Omit<get<state>, id>
                // get<state>
                & { [k in id]: value }
                >;

              funcId: State.ExecutionContexts.Active.get<state>['funcId'];
              branches: State.ExecutionContexts.Active.get<state>['branches'];
            },
            state
            >
          >
      }

      export namespace Branches {
        export type get<
          state extends ProgramState
        > = Satisfies<BranchesById,
          State.ExecutionContexts.Active.get<state>['branches']
        >

        export type set<
          branches extends BranchesById,
          state extends ProgramState
        > = Satisfies<ProgramState,
          State.ExecutionContexts.Active.set<
            {
              branches: branches;
              funcId: State.ExecutionContexts.Active.get<state>['funcId'];
              locals: State.ExecutionContexts.Active.get<state>['locals'];
            },
            state
          >
        >

        export type merge<
          id extends string,
          instructions extends Instruction[],
          state extends ProgramState
        > = Satisfies<ProgramState,
          set<
            // evaluate<
            & Omit<get<state>, id>
            & { [k in id]: instructions }
            // >
            ,
            state
          >
        >
      }
    }
  }

  export namespace Funcs {
    export type get<
      state extends ProgramState
    > = Satisfies<FuncsById,
      state['funcs']
    >

    export type getById<
      id extends keyof get<state>,
      state extends ProgramState
    > = Satisfies<Func,
      get<state>[id]
    >

    /** when you call a function, you have to pop the stack some number of times depending on how many parameters and returns there are */
    export type countCallPops<
      state extends ProgramState,
      funcId extends keyof get<state>
    > = Satisfies<number,
      getById<funcId, state> extends {
        params: infer params extends Param[];
        result: infer result extends number;
      }
      ? TypeMath.Add<params['length'], result>
      : never
    >
  }

  /** Helpers for Globals manipulation */
  export namespace Globals {
    export type get<
      state extends ProgramState
    > = Satisfies<GlobalsById,
      state['globals']
    >
    
    export type insert<
      globals extends GlobalsById,
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: state['count'];
        result: state['result'];
        stack: state['stack'];
        instructions: state['instructions'];
        activeExecutionContext: state['activeExecutionContext'];

        globals:
          evaluate<
          & Omit<get<state>, keyof globals>
          & globals
          >;

        memory: state['memory'];
        indirect: state['indirect'];
        memorySize: state['memorySize'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
      }
    >
  }

  export namespace Memory {
    export type get<
      state extends ProgramState
    > = 
      state['memory']

    type CollectBytes<
      address extends WasmValue,
      bytes extends Wasm.Byte[],

      _Acc extends Record<WasmValue, Wasm.Byte> = {}
    > = Satisfies<Record<WasmValue, Wasm.Byte>,
      bytes extends [
        infer head extends Wasm.Byte, // WASM is little-endian so these go in first
        ...infer tail extends Wasm.Byte[],
      ]
      ? CollectBytes<
          Wasm.I32Add<address, Wasm.I32True>,
          tail,
          evaluate<_Acc & { [k in address]: head }>
        >
      : _Acc
    >

    export type insert<
      address extends MemoryAddress,
      bytes extends Wasm.Byte[],
      state extends ProgramState,

      _update extends Record<WasmValue, Wasm.Byte> =
        CollectBytes<
          address,
          bytes
        >
    > = Satisfies<ProgramState,
      {
        count: state['count'];
        result: state['result'];
        stack: state['stack'];
        instructions: state['instructions'];
        activeExecutionContext: state['activeExecutionContext'];
        globals: state['globals'];

        memory:
          evaluate<
          // & Omit<get<state>, keyof _update>
            & get<state>
            & _update
          >;

        indirect: state['indirect'];
        memorySize: state['memorySize'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
      }
    >
  }

  /** Helpers for indirect function lookups */
  export namespace Indirect {
    export type get<
      state extends ProgramState
    > = Satisfies<string[],
      state['indirect']
    >

    export type getByIndex<
      state extends ProgramState,
      index extends WasmValue
    > = Satisfies<string,
      get<state>[Convert.WasmValue.ToTSNumber<index, 'i32'>]
    >
  }

  export namespace Result {
    export type getWasmType<
      state extends ProgramState
    > = Satisfies<WasmType,
      state['funcs']['$entry']['result']
    >

    export type get<
      state extends ProgramState
    > = Satisfies<number | null,
      state['result']
    >

    export type set<
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: state['count'];

        result:
          Convert.WasmValue.ToTSNumber<
            State.Stack.get<state>[0],
            getWasmType<state>
          >;

        stack: state['stack'];
        instructions: state['instructions'];
        activeExecutionContext: state['activeExecutionContext'];
        globals: state['globals'];
        memory: state['memory'];
        indirect: state['indirect'];
        memorySize: state['memorySize'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
      }
    >

    export type finish<
      state extends ProgramState
    > = Satisfies<number | null,
      get<
        set<state>
      >
    >
  }
}
