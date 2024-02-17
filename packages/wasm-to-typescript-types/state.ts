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
  evaluate,
} from "./types"
import * as TypeMath from "ts-type-math";
import { WasmValue, WasmType, Convert } from 'ts-type-math';

export namespace State {
  export type Error<
    instruction extends Instruction,
    reason extends string,

    state extends ProgramState
  > = Satisfies<ProgramState,
    State.Instructions.push<
      { kind: 'Halt', reason: reason, instruction: instruction },
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

        activeExecutionContext: state['activeExecutionContext'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        globals: state['globals'];
        indirect: state['indirect'];
        instructions: state['instructions'];
        memory: state['memory'];
        memorySize: state['memorySize'];
        result: state['result'];
        stack: state['stack'];
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
        instructions: instructions;

        activeExecutionContext: state['activeExecutionContext'];
        count: state['count'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        globals: state['globals'];
        indirect: state['indirect'];
        memory: state['memory'];
        memorySize: state['memorySize'];
        result: state['result'];
        stack: state['stack'];
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
      push<
        {
          kind: 'Halt',
          reason: "Unimplemented Instruction",
          instruction: instruction
        },
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
        result: state['result'];
      }
    >

    export type push<
      entry extends WasmValue,
      state extends ProgramState
    > = Satisfies<ProgramState,
      set<
        [
          ...get<state>,
          entry
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
          executionContexts: executionContexts;

          activeExecutionContext: state['activeExecutionContext'];
          count: state['count'];
          funcs: state['funcs'];
          globals: state['globals'];
          indirect: state['indirect'];
          instructions: state['instructions'];
          memory: state['memory'];
          memorySize: state['memorySize'];
          result: state['result'];
          stack: state['stack'];
        }
      >

    /** push a brand new execution context */
    export type push<
      executionContext extends ExecutionContext,
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
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
        result: state['result'];
        stack: state['stack'];
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
          result: state['result'];
          stack: state['stack'];
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
          activeExecutionContext: executionContext;
          
          count: state['count'];
          executionContexts: state['executionContexts']
          funcs: state['funcs'];
          globals: state['globals'];
          indirect: state['indirect'];
          instructions: state['instructions'];
          memory: state['memory'];
          memorySize: state['memorySize'];
          result: state['result'];
          stack: state['stack'];
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
                & Omit<State.ExecutionContexts.Active.Locals.get<state>, id>
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
            evaluate<
            & Omit<State.ExecutionContexts.Active.Branches.get<state>, id>
            & { [k in id]: instructions }
            >,
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
        result: state['result'];
        stack: state['stack'];
      }
    >
  }

  export namespace Memory {
    export type get<
      state extends ProgramState
    > = Satisfies<MemoryByAddress,
      state['memory']
    >

    export type getByAddress<
      address extends MemoryAddress,
      offset extends number,
      bytes extends number,

      state extends ProgramState,
    > =
      TypeMath.Load.ReadBytes<
        bytes,
        get<state>,
        TypeMath.Add<
          Convert.U32Binary.ToU32Decimal<address>,
          offset
        >
      >

    type CollectBytes<
      bytes extends WasmValue[],
      address extends number,

      _Acc extends Record<number, WasmValue> = {}
    > = Satisfies<Record<number, WasmValue>,
      bytes extends [
        infer head extends WasmValue, // WASM is little-endian so these go in first
        ...infer tail extends WasmValue[]
      ]
      ? CollectBytes<
          tail,
          TypeMath.Add<address, 1>,
          _Acc & { [k in address]: head }
        >
      : _Acc
    >

    export type insert<
      address extends MemoryAddress,
      offset extends number,
      bytes extends WasmValue[],

      state extends ProgramState,

      _update extends Record<number, number> =
        CollectBytes<
          bytes,
          TypeMath.Add<
            Convert.U32Binary.ToU32Decimal<address>,
            offset
          >
        >
    > = Satisfies<ProgramState,
      {
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
        result: state['result'];
        stack: state['stack'];
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
      id extends WasmValue
    > = Satisfies<string,
      // get<state>[id]
      'TODO lol'
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
        result:
          Convert.WasmValue.ToTSNumber<
            State.Stack.get<state>[0],
            getWasmType<state>
          >;

        activeExecutionContext: state['activeExecutionContext'];
        count: state['count'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        globals: state['globals'];
        indirect: state['indirect'];
        instructions: state['instructions'];
        memory: state['memory'];
        memorySize: state['memorySize'];
        stack: state['stack'];
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

type x = Convert.WasmValue.ToTSNumber<'1', 'i32'>
//   ^?