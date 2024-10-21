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
  MemoryByAddress,
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
        L1Cache: state['L1Cache'];
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
        L1Cache: state['L1Cache'];
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
        L1Cache: state['L1Cache'];
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
      newInstructions extends Instruction[],
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: state['count'];
        results: state['results'];
        stack: state['stack'];
        instructions: newInstructions;

        // set the new one
        activeLocals: executionContext['locals'];
        activeFuncId: executionContext['funcId'];
        activeBranches: executionContext['branches'];
        activeStackDepth: executionContext['stackDepth'];

        globals: state['globals'];
        L1Cache: state['L1Cache'];
        memory: state['memory'];
        garbageCollection: state['garbageCollection'];
        indirect: state['indirect'];
        memorySize: state['memorySize'];

        executionContexts: [
          ...state['executionContexts'],
          // archive the previous active execution context
          {
            locals: state['activeLocals'];
            funcId: state['activeFuncId'];
            branches: state['activeBranches'];
            stackDepth: state['activeStackDepth'];

            // store the current state of the instructions with this one
            instructions: state['instructions'];
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

          // set the instruction stack to what the previous capture state contained
          instructions: active['instructions'];

          // set the new one
          activeLocals: active['locals'];
          activeFuncId: active['funcId'];
          activeBranches: active['branches'];
          activeStackDepth: active['stackDepth'];

          globals: state['globals'];
          L1Cache: state['L1Cache'];
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
            instructions: state['instructions']; // this should be empty
            
            // set the new one
            activeLocals: {};
            activeFuncId: 'hope you found what you were looking for';
            activeBranches: {};
            activeStackDepth: 9001;

            globals: state['globals'];
            L1Cache: state['L1Cache'];
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
            L1Cache: state['L1Cache'];
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
            L1Cache: state['L1Cache'];
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
            L1Cache: state['L1Cache'];
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

        L1Cache: state['L1Cache'];
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

        // only update the L1 Cache.
        // the Memory is updated via the garbage collector
        L1Cache: Patch<
          state['L1Cache'],
          _update
        >;

        // note that we don't actually update the large memory blob
        memory: state['memory'];

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
        L1Cache: state['L1Cache'];

        garbageCollection: TypeMath.Add<state['garbageCollection'], 1>;

        indirect: state['indirect'];
        memorySize: state['memorySize'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];

      }
    >

    export type collect<
      state extends ProgramState,
      force extends 'force' | 'schedule' = 'schedule',

      // increment first, then check for collection
      _next extends ProgramState = increment<state>,

      _shoudlCollect extends boolean =
        force extends 'force'
        ? true
        : _next['garbageCollection'] extends CollectAt
          ? true
          : false,
    > = Satisfies<ProgramState,
      _shoudlCollect extends true
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

          L1Cache: {}; // clear the L1Cache

          memory: Patch<
            state['memory'],
            TypeMath.GarbageCollect<state['L1Cache']>
          >;

          garbageCollection: 0;

          indirect: state['indirect'];
          memorySize: state['memorySize'];
          executionContexts: state['executionContexts'];
          funcs: state['funcs'];
        }
      : _next
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
        L1Cache: state['L1Cache'];
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
        // do one final garbage collection
        set<
          State.GarbageCollection.collect<
            state,
            'force'
          >
        >['results']
      >
  }
}
