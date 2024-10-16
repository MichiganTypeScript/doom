import { I32AddBinary } from "../ts-type-math/add";
import type { Instruction } from "./instructions/instructions"
import { IEndFunction } from "./instructions/synthetic";
import type {
  BranchesById,
  CollectAt,
  ExecutionContext,
  Func,
  GlobalsById,
  MemoryAddress,
  ProgramState,
} from "./types"
import * as TypeMath from "ts-type-math";
import { WasmValue, WasmType, Convert, Wasm, evaluate, Satisfies } from 'ts-type-math';

/** update Source with Update */
type Patch<Source, Update> = evaluate<
  & Omit<Source, keyof Update>
  & Update
>;

export namespace State {
  export type error<
    reason extends string,
    instruction extends Instruction,

    state extends ProgramState
  > = Satisfies<ProgramState,
    State.Instructions.unshift<
      {
        kind: 'Halt',
        reason: `ERROR(${state['count']}): ${reason}`,
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
    export type increment<
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: TypeMath.Add<state['count'], 1>;

        results: state['results'];
        stack: state['stack'];
        instructions: state['instructions'];
        activeLocals: state['activeLocals'];
        activeFuncId: state['activeFuncId'];
        activeBranches: state['activeBranches'];
        activeStackDepth: state['activeStackDepth'];
        globals: state['globals'];
        memory: state['memory'];
        garbageCollection: state['garbageCollection'];
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
        results: state['results'];
        stack: state['stack'];

        instructions: instructions;

        activeLocals: state['activeLocals'];
        activeFuncId: state['activeFuncId'];
        activeBranches: state['activeBranches'];
        activeStackDepth: state['activeStackDepth'];
        globals: state['globals'];
        memory: state['memory'];
        garbageCollection: state['garbageCollection'];
        indirect: state['indirect'];
        memorySize: state['memorySize'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
      }
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

    export type popUntil<
      searchingFor extends Instruction,
      state extends ProgramState
    > = Satisfies<ProgramState,
      state['instructions'] extends [
        infer discarded extends Instruction,
        ...infer remaining extends Instruction[],
      ]
      ? discarded extends searchingFor

        // we found the matching searchingFor Instruction: we can dipset
        ? state

        // we didn't find the matching searchingFor Instruction: we have to keep popping
        : popUntil<
            searchingFor,
            set<
              remaining,
              state
            >
          >
      : State.error<"stack exhausted", searchingFor, state>
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
    export type set<
      stack extends WasmValue[],
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: state['count'];
        results: state['results'];

        stack: stack;

        instructions: state['instructions'];
        activeLocals: state['activeLocals'];
        activeFuncId: state['activeFuncId'];
        activeBranches: state['activeBranches'];
        activeStackDepth: state['activeStackDepth'];
        globals: state['globals'];
        memory: state['memory'];
        garbageCollection: state['garbageCollection'];
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
          ...state['stack'],
          value
        ],
        state
      >
    >
  }

  /** Helpers for ExecutionContext manipulation */
  export namespace ExecutionContexts {
    /** push a brand new execution context */
    export type push<
      executionContext extends ExecutionContext,
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: state['count'];
        results: state['results'];
        stack: state['stack'];
        instructions: state['instructions'];

        // set the new one
        activeLocals: executionContext['locals'];
        activeFuncId: executionContext['funcId'];
        activeBranches: executionContext['branches'];
        activeStackDepth: executionContext['stackDepth'];

        globals: state['globals'];
        memory: state['memory'];
        garbageCollection: state['garbageCollection'];
        indirect: state['indirect'];
        memorySize: state['memorySize'];

        executionContexts: [
          ...state['executionContexts'],
          // add the old active execution context to the stack
          {
            locals: state['activeLocals'];
            funcId: state['activeFuncId'];
            branches: state['activeBranches'];
            stackDepth: state['activeStackDepth'];
          },
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
          results: state['results'];
          stack: state['stack'];
          instructions: state['instructions'];
          
          // set the new one
          activeLocals: active['locals'];
          activeFuncId: active['funcId'];
          activeBranches: active['branches'];
          activeStackDepth: active['stackDepth'];

          globals: state['globals'];
          memory: state['memory'];
          garbageCollection: state['garbageCollection'];
          indirect: state['indirect'];
          memorySize: state['memorySize'];
          
          executionContexts: remaining;

          funcs: state['funcs'];
        }
      : state['instructions'] extends IEndFunction[] // funny story: [IEndFunction] doesn't work here
        ? // we hit this case on the very last pop (i.e. when the program completes)
          {
            count: state['count'];
            results: state['results'];
            stack: state['stack'];
            instructions: state['instructions'];
            
            // set the new one
            activeLocals: {};
            activeFuncId: 'hope you found what you were looking for';
            activeBranches: {};
            activeStackDepth: 9001;

            globals: state['globals'];
            memory: state['memory'];
            garbageCollection: state['garbageCollection'];
            indirect: state['indirect'];
            memorySize: state['memorySize'];

            executionContexts: [];

            funcs: state['funcs'];
          }
        : State.error<"execution contexts exhausted", Instruction, state>
    >

    export namespace Active {
      export namespace Locals {
        export type insert<
          id extends string,
          value extends WasmValue,
          state extends ProgramState
        > = Satisfies<ProgramState,
          {
            count: state['count'];
            results: state['results'];
            stack: state['stack'];
            instructions: state['instructions'];

            activeLocals:
              Patch<
                state['activeLocals'],
                { [k in id]: value }
              >;

            activeFuncId: state['activeFuncId'];
            activeBranches: state['activeBranches'];
            activeStackDepth: state['activeStackDepth'];
            globals: state['globals'];
            memory: state['memory'];
            garbageCollection: state['garbageCollection'];
            indirect: state['indirect'];
            memorySize: state['memorySize'];
            executionContexts: state['executionContexts'];
            funcs: state['funcs'];
          }
        >

        export type clear<
          state extends ProgramState
        > = Satisfies<ProgramState,
          {
            count: state['count'];
            results: state['results'];
            stack: state['stack'];
            instructions: state['instructions'];

            activeLocals: {}

            activeFuncId: state['activeFuncId'];
            activeBranches: state['activeBranches'];
            activeStackDepth: state['activeStackDepth'];
            globals: state['globals'];
            memory: state['memory'];
            garbageCollection: state['garbageCollection'];
            indirect: state['indirect'];
            memorySize: state['memorySize'];
            executionContexts: state['executionContexts'];
            funcs: state['funcs'];
          }
        >
      }

      export namespace Branches {
        export type set<
          branches extends BranchesById,
          state extends ProgramState
        > = Satisfies<ProgramState,
          {
            count: state['count'];
            results: state['results'];
            stack: state['stack'];
            instructions: state['instructions'];
            activeLocals: state['activeLocals']
            activeFuncId: state['activeFuncId'];

            activeBranches: branches;

            activeStackDepth: state['activeStackDepth'];
            globals: state['globals'];
            memory: state['memory'];
            garbageCollection: state['garbageCollection'];
            indirect: state['indirect'];
            memorySize: state['memorySize'];
            executionContexts: state['executionContexts'];
            funcs: state['funcs'];
          }
        >

        export type insert<
          id extends string,
          instructions extends Instruction[],
          state extends ProgramState
        > = Satisfies<ProgramState,
          set<
            Patch<
              state['activeBranches'],
              { [k in id]: instructions }
            >,
            state
          >
        >
      }
    }
  }

  export namespace Funcs {
    export type getById<
      id extends keyof state['funcs'],
      state extends ProgramState
    > = Satisfies<Func,
      state['funcs'][id]
    >
  }

  /** Helpers for Globals manipulation */
  export namespace Globals {
    export type insert<
      globals extends GlobalsById,
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: state['count'];
        results: state['results'];
        stack: state['stack'];
        instructions: state['instructions'];
        activeLocals: state['activeLocals'];
        activeFuncId: state['activeFuncId'];
        activeBranches: state['activeBranches'];
        activeStackDepth: state['activeStackDepth'];

        globals:
          Patch<
            state['globals'],
            globals
          >;

        memory: state['memory'];
        garbageCollection: state['garbageCollection'];
        indirect: state['indirect'];
        memorySize: state['memorySize'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
      }
    >
  }

  export namespace Memory {
    type CollectBytes<
      address extends WasmValue,
      bytes extends Wasm.Byte[],

      _Acc extends Record<WasmValue, Wasm.Byte> = {}
    > = Satisfies<Record<WasmValue, Wasm.Byte>,
      bytes extends [
        ...infer tail extends Wasm.Byte[],
        infer head extends Wasm.Byte, // WASM is little-endian so these go in first
      ]
      ? CollectBytes<
          I32AddBinary<address, Wasm.I32True>,
          tail,
          // POTENTIAL OPTIMIZATION: if we are setting head for the first time we can just skip it entirely
          _Acc & { [k in address]: head } // note: this doesn't need Patch because we are building it up from scratch
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
      // State.debug<[_update], {
      {
        count: state['count'];
        results: state['results'];
        stack: state['stack'];
        instructions: state['instructions'];
        activeLocals: state['activeLocals'];
        activeFuncId: state['activeFuncId'];
        activeBranches: state['activeBranches'];
        activeStackDepth: state['activeStackDepth'];
        globals: state['globals'];

        memory:
          Patch<
            state['memory'],
            _update
          >;

        garbageCollection: state['garbageCollection'];
        indirect: state['indirect'];
        memorySize: state['memorySize'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
      }
      // >
    >
  }

  export namespace GarbageCollection {
    export type increment<
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: state['count'];
        results: state['results'];
        stack: state['stack'];
        instructions: state['instructions'];
        activeLocals: state['activeLocals'];
        activeFuncId: state['activeFuncId'];
        activeBranches: state['activeBranches'];
        activeStackDepth: state['activeStackDepth'];
        globals: state['globals'];
        memory: state['memory'];

        garbageCollection: TypeMath.Add<state['garbageCollection'], 1>;

        indirect: state['indirect'];
        memorySize: state['memorySize'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];

      }
    >

    export type collect<
      state extends ProgramState,

      // increment first, then check for collection
      _next extends ProgramState = increment<state>
    > = Satisfies<ProgramState,
      _next['garbageCollection'] extends CollectAt
      ? {
          count: state['count'];
          results: state['results'];
          stack: state['stack'];
          instructions: state['instructions'];
          activeLocals: state['activeLocals'];
          activeFuncId: state['activeFuncId'];
          activeBranches: state['activeBranches'];
          activeStackDepth: state['activeStackDepth'];
          globals: state['globals'];

          memory: TypeMath.GarbageCollect<state['memory']>; // garbage collection enabled
          // memory: state['memory']; // garbage collection disabled
          garbageCollection: 0;

          indirect: state['indirect'];
          memorySize: state['memorySize'];
          executionContexts: state['executionContexts'];
          funcs: state['funcs'];
        }
      : _next
    >
  }

  /** Helpers for indirect function lookups */
  export namespace Indirect {
    export type getByIndex<
      state extends ProgramState,
      index extends WasmValue
    > = Satisfies<string,
      state['indirect'][Convert.WasmValue.ToTSNumber<index, 'i32'>]
    >
  }

  export namespace Result {
    export type getResultTypes<
      state extends ProgramState
    > = Satisfies<WasmType[],
      state['funcs']['$entry']['resultTypes']
    >

    type WasmTypeToTSNumber<
      type extends WasmType,
      value extends WasmValue
    > = type extends 'i32' | 'f32' | 'f64'
      ? Convert.WasmValue.ToTSNumber<value, type>
      : Convert.WasmValue.ToTSBigInt<value>

    type CollectResults<
      stack extends WasmValue[],
      resultTypes extends WasmType[],
      _Acc extends (number | bigint)[] = []
    > = Satisfies<(number | bigint)[],
      stack extends [
        infer pop extends WasmValue,
        ...infer remainingStack extends WasmValue[]
      ]
      ? resultTypes extends [
          infer type extends WasmType,
          ...infer remainingTypes extends WasmType[]
        ]
        ? CollectResults<
            remainingStack,
            remainingTypes,
            [..._Acc, WasmTypeToTSNumber<type, pop>]
          >
        : never // should never happen because the lengths should always match
      : _Acc
    >

    export type set<
      state extends ProgramState,

      _resultTypes extends WasmType[] = getResultTypes<state>
    > = Satisfies<ProgramState,
      {
        count: state['count'];

        results:
          _resultTypes['length'] extends 1
          ? WasmTypeToTSNumber<_resultTypes[0], state['stack'][0]>
          : CollectResults<state['stack'], _resultTypes>;

        stack: state['stack'];
        instructions: state['instructions'];
        activeLocals: state['activeLocals'];
        activeFuncId: state['activeFuncId'];
        activeBranches: state['activeBranches'];
        activeStackDepth: state['activeStackDepth'];
        globals: state['globals'];
        memory: state['memory'];
        garbageCollection: state['garbageCollection'];
        indirect: state['indirect'];
        memorySize: state['memorySize'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
      }
    >

    export type finish<
      state extends ProgramState
    > = Satisfies<(number | bigint)[] | (number | bigint) | null,
        set<state>['results']
      >
  }
}
