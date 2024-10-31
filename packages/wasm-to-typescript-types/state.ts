import { I32AddBinary } from "../ts-type-math/add";
import type { Instruction } from "./instructions/instructions"
import { IEndFunction } from "./instructions/synthetic";
import type {
  BranchesById,
  SweepL1Every,
  ExecutionContext,
  GlobalsById,
  MemoryAddress,
  ProgramState,
  FuncId,
} from "./types"
import * as TypeMath from "ts-type-math";
import { WasmValue, WasmType, Convert, Wasm, evaluate, Satisfies } from 'ts-type-math';

/** update Source with Update */
export type Patch<Source, Update> = evaluate<
  & Omit<Source, keyof Update>
  & Update
>;

export type IDugMyselfANiceBigHoleAndNowIHaveToDebugMyWayOutOfItSomehow = true;

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

  export namespace CallHistory {
    export type record<
      funcId extends FuncId,
      state extends ProgramState
    > = Satisfies<ProgramState,
      IDugMyselfANiceBigHoleAndNowIHaveToDebugMyWayOutOfItSomehow extends true
      ? {
          count: state['count'];
          stack: state['stack'];
          activeFuncId: state['activeFuncId'];
          activeStackDepth: state['activeStackDepth'];
          activeLocals: state['activeLocals'];
          instructions: state['instructions'];
          activeBranches: state['activeBranches'];
          L1Cache: state['L1Cache'];
          memory: state['memory'];
          executionContexts: state['executionContexts'];
          funcs: state['funcs'];
          garbageCollection: state['garbageCollection'];
          globals: state['globals'];
          memorySize: state['memorySize'];
          indirect: state['indirect'];
          results: state['results'];
          callHistory: state['callHistory'] extends []
          ? [
              [funcId, state['count']] // this is the first one!
            ]
          : [
              ...state['callHistory'],
              [funcId, state['count']] // append
            ]
        }
      : state
    >
  }

  export namespace Count {
    export type increment<
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: TypeMath.Add<state['count'], 1>;  // increment the count
        // count: state['count'];
        stack: state['stack'];
        activeFuncId: state['activeFuncId'];
        activeStackDepth: state['activeStackDepth'];
        activeLocals: state['activeLocals'];
        instructions: state['instructions'];
        activeBranches: state['activeBranches'];
        L1Cache: state['L1Cache'];
        memory: state['memory'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        garbageCollection: state['garbageCollection'];
        globals: state['globals'];
        memorySize: state['memorySize'];
        indirect: state['indirect'];
        results: state['results'];
        callHistory: state['callHistory'];
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
        stack: state['stack'];
        activeFuncId: state['activeFuncId'];
        activeStackDepth: state['activeStackDepth'];
        activeLocals: state['activeLocals'];
        instructions: instructions; // use new
        activeBranches: state['activeBranches'];
        L1Cache: state['L1Cache'];
        memory: state['memory'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        garbageCollection: state['garbageCollection'];
        globals: state['globals'];
        memorySize: state['memorySize'];
        indirect: state['indirect'];
        results: state['results'];
        callHistory: state['callHistory'];
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
        stack: stack; // use new
        activeFuncId: state['activeFuncId'];
        activeStackDepth: state['activeStackDepth'];
        activeLocals: state['activeLocals'];
        instructions: state['instructions'];
        activeBranches: state['activeBranches'];
        L1Cache: state['L1Cache'];
        memory: state['memory'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        garbageCollection: state['garbageCollection'];
        globals: state['globals'];
        memorySize: state['memorySize'];
        indirect: state['indirect'];
        results: state['results'];
        callHistory: state['callHistory'];
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
        stack: state['stack'];
        activeFuncId: executionContext['funcId']; // use new
        activeStackDepth: executionContext['stackDepth']; // use new
        activeLocals: executionContext['locals']; // use new
        instructions: newInstructions; // use new
        activeBranches: executionContext['branches']; // use new
        L1Cache: state['L1Cache'];
        memory: state['memory'];
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
        garbageCollection: state['garbageCollection'];
        globals: state['globals'];
        memorySize: state['memorySize'];
        indirect: state['indirect'];
        results: state['results'];
        callHistory: state['callHistory'];
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
          stack: state['stack'];
          activeFuncId: active['funcId']; // use new
          activeStackDepth: active['stackDepth']; // use new
          activeLocals: active['locals']; // use new
          instructions: active['instructions']; // set the instruction stack to what the previous capture state contained
          activeBranches: active['branches']; // use new
          L1Cache: state['L1Cache'];
          memory: state['memory'];
          executionContexts: remaining; // use new
          funcs: state['funcs'];
          garbageCollection: state['garbageCollection'];
          globals: state['globals'];
          memorySize: state['memorySize'];
          indirect: state['indirect'];
          results: state['results'];
          callHistory: state['callHistory'];
        }
        : state['instructions'] extends IEndFunction[] // funny story: [IEndFunction] doesn't work here
        ? // we hit this case on the very last pop (i.e. when the program completes)
          {
            count: state['count'];
            stack: state['stack'];
            activeFuncId: 'hope you found what you were looking for'; // lol
            activeStackDepth: 1337; // reset
            activeLocals: {}; // reset
            instructions: state['instructions']; // this should be empty
            activeBranches: {}; // reset
            L1Cache: state['L1Cache'];
            memory: state['memory'];
            executionContexts: []; // clear
            funcs: state['funcs'];
            garbageCollection: state['garbageCollection'];
            globals: state['globals'];
            memorySize: state['memorySize'];
            indirect: state['indirect'];
            results: state['results'];
            callHistory: state['callHistory'];
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
            stack: state['stack'];
            activeFuncId: state['activeFuncId'];
            activeStackDepth: state['activeStackDepth'];
            activeLocals:
              Patch<
                state['activeLocals'],
                { [k in id]: value }
              >;
            instructions: state['instructions'];
            activeBranches: state['activeBranches'];
            L1Cache: state['L1Cache'];
            memory: state['memory'];
            executionContexts: state['executionContexts'];
            funcs: state['funcs'];
            garbageCollection: state['garbageCollection'];
            globals: state['globals'];
            memorySize: state['memorySize'];
            indirect: state['indirect'];
            results: state['results'];
            callHistory: state['callHistory'];
          }
        >
      }

      export namespace Branches {
        export type insert<
          id extends string,
          instructions extends Instruction[],
          state extends ProgramState
        > = Satisfies<ProgramState,
          {
            count: state['count']; 
            stack: state['stack'];
            activeFuncId: state['activeFuncId'];
            activeStackDepth: state['activeStackDepth'];
            activeLocals: state['activeLocals'];
            instructions: state['instructions'];
            activeBranches: Patch<
              state['activeBranches'],
              { [k in id]: instructions }
            >; // use new
            L1Cache: state['L1Cache'];
            memory: state['memory'];
            executionContexts: state['executionContexts'];
            funcs: state['funcs'];
            garbageCollection: state['garbageCollection'];
            globals: state['globals'];
            memorySize: state['memorySize'];
            indirect: state['indirect'];
            results: state['results'];
            callHistory: state['callHistory'];
          }
        >
      }
    }
  }

  /** Helpers for Globals manipulation */
  export namespace Globals {
    export type insert<
      globals extends GlobalsById,
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: state['count']; 
        stack: state['stack'];
        activeFuncId: state['activeFuncId'];
        activeStackDepth: state['activeStackDepth'];
        activeLocals: state['activeLocals'];
        instructions: state['instructions'];
        activeBranches: state['activeBranches'];
        L1Cache: state['L1Cache'];
        memory: state['memory'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        garbageCollection: state['garbageCollection'];
        globals:
          Patch<
            state['globals'],
            globals
          >;
        memorySize: state['memorySize'];
        indirect: state['indirect'];
        results: state['results'];
        callHistory: state['callHistory'];
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
        stack: state['stack'];
        activeFuncId: state['activeFuncId'];
        activeStackDepth: state['activeStackDepth'];
        activeLocals: state['activeLocals'];
        instructions: state['instructions'];
        activeBranches: state['activeBranches'];
        L1Cache: Patch<state['L1Cache'], _update>; // only update the L1 Cache.
        memory: state['memory']; // note that we don't actually update the large memory blob.  the Memory is updated during garbage collection
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        garbageCollection: state['garbageCollection'];
        globals: state['globals'];
        memorySize: state['memorySize'];
        indirect: state['indirect'];
        results: state['results'];
        callHistory: state['callHistory'];
      }
      // >
    >

    export type grow<
      state extends ProgramState,
      growBy extends WasmValue,
    > = Satisfies<ProgramState,
      {
        count: state['count']; 
        stack: state['stack'];
        activeFuncId: state['activeFuncId'];
        activeStackDepth: state['activeStackDepth'];
        activeLocals: state['activeLocals'];
        instructions: state['instructions'];
        activeBranches: state['activeBranches'];
        L1Cache: state['L1Cache'];
        memory: state['memory'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        garbageCollection: state['garbageCollection'];
        globals: state['globals'];
        memorySize: I32AddBinary<state['memorySize'], growBy>; // increment
        indirect: state['indirect'];
        results: state['results'];
        callHistory: state['callHistory'];
      }
    >
  }

  export namespace GarbageCollection {
    export type increment<
      state extends ProgramState
    > = Satisfies<ProgramState,
      {
        count: state['count'];
        stack: state['stack'];
        activeFuncId: state['activeFuncId'];
        activeStackDepth: state['activeStackDepth'];
        activeLocals: state['activeLocals'];
        instructions: state['instructions'];
        activeBranches: state['activeBranches'];
        L1Cache: state['L1Cache'];
        memory: state['memory'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        garbageCollection: TypeMath.Add<state['garbageCollection'], 1>; // increment
        globals: state['globals'];
        memorySize: state['memorySize'];
        indirect: state['indirect'];
        results: state['results'];
        callHistory: state['callHistory'];
      }
    >

    export type collect<
      state extends ProgramState,
      force extends 'force' | 'schedule' = 'schedule',

      _shoudlCollect extends boolean =
        force extends 'force'
        ? true
        : state['garbageCollection'] extends SweepL1Every
          ? true
          : false,
    > = Satisfies<ProgramState,
      _shoudlCollect extends true
      ? {
          count: state['count'];
          stack: state['stack'];
          activeFuncId: state['activeFuncId'];
          activeStackDepth: state['activeStackDepth'];
          activeLocals: state['activeLocals'];
          instructions: state['instructions'];
          activeBranches: state['activeBranches'];
          L1Cache: {}; // clear the L1Cache
          memory: TypeMath.GarbageCollect<
            Patch<
              state['memory'],
              state['L1Cache']
            >
          >; // update the memory with the L1Cache
          executionContexts: state['executionContexts'];
          funcs: state['funcs'];
          garbageCollection: 0; // reset
          globals: state['globals'];
          memorySize: state['memorySize'];
          indirect: state['indirect'];
          results: state['results'];
          callHistory: state['callHistory'];
        }
      : state
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
        stack: state['stack'];
        activeFuncId: state['activeFuncId'];
        activeStackDepth: state['activeStackDepth'];
        activeLocals: state['activeLocals'];
        instructions: state['instructions'];
        activeBranches: state['activeBranches'];
        L1Cache: state['L1Cache'];
        memory: state['memory'];
        executionContexts: state['executionContexts'];
        funcs: state['funcs'];
        garbageCollection: state['garbageCollection'];
        globals: state['globals'];
        memorySize: state['memorySize'];
        indirect: state['indirect'];
        results:
          _resultTypes['length'] extends 1
          ? WasmTypeToTSNumber<_resultTypes[0], state['stack'][0]>
          : CollectResults<state['stack'], _resultTypes>;
        callHistory: state['callHistory'];
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
