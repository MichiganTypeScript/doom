import type { Func, LocalsById, Param, ProgramState } from "../types"
import type { State } from '../state'
import type { Instruction } from "./instructions"
import type { Wasm, WasmValue, Satisfies } from 'ts-type-math'

export type IBlock = {
  kind: "Block"

  /** a block identifier */
  id: string

  instructions: Instruction[]
}

export type IBranch = {
  kind: "Branch"

  /** a block identifier */
  id: string
}

export type IBranchIf = {
  kind: "BranchIf"

  /** a block identifier */
  id: string
}

export type IBranchTable = {
  kind: "BranchTable"

  /** a block identifier */
  branches: Record<WasmValue, WasmValue>

  default: string
}

export type ICall = {
  kind: "Call"

  /** a function identifier */
  id: string
}

export type ICallIndirect = {
  kind: "CallIndirect"

  /** a function identifier */
  id: string
}

export type IDrop = {
  kind: "Drop"
}

export type IIf = {
  kind: "If"

  then: Instruction[]
  else?: Instruction[]
}

export type ILoop = {
  kind: "Loop"

  id: string

  instructions: Instruction[]
}

export type INop = {
  kind: "Nop"

  ziltoid: "theOmniscient"
}

export type IReturn = {
  kind: "Return"

  /** the number of items to return */
  count: number
}

export type ISelect = {
  kind: "Select"
}

export type IUnreachable = {
  kind: "Unreachable"
}

export type ControlFlowInstruction =
  | IBlock
  | IBranch
  | IBranchIf
  | IBranchTable
  | ICall
  | ICallIndirect
  | IDrop
  | IIf
  | ILoop
  | INop
  | IReturn
  | ISelect
  | IUnreachable

export type HandleControlFlowInstructions<
  instruction extends ControlFlowInstruction,
  state extends ProgramState
> = Satisfies<ProgramState,
  instruction extends IBlock
  ? Block<instruction, state>

  : instruction extends IBranch
  ? Branch<instruction, state>

  : instruction extends IBranchIf
  ? BranchIf<instruction, state>

  : instruction extends IBranchTable
  ? BranchTable<instruction, state>

  : instruction extends ICall
  ? Call<instruction, state>

  : instruction extends ICallIndirect
  ? CallIndirect<instruction, state>

  : instruction extends IDrop
  ? Drop<instruction, state>

  : instruction extends IIf
  ? If<instruction, state>

  : instruction extends ILoop
  ? Loop<instruction, state>

  : instruction extends INop
  ? Nop<instruction, state>

  : instruction extends IReturn
  ? Return<instruction, state>

  : instruction extends ISelect
  ? Select<instruction, state>

  : instruction extends IUnreachable
  ? Unreachable<instruction, state>

  : State.error<"unknown control-flow instruction", instruction, state>
>

export type Block<
  instruction extends IBlock,
  state extends ProgramState
> = Satisfies<ProgramState,
  // then push the block's instructions onto the stack
  State.Instructions.concat<
    instruction['instructions'],

    // first cache existing instructions (as they are at this moment) in the execution context for when we break to this block later
    State.ExecutionContexts.Active.Branches.insert<
      instruction['id'],
      state['instructions'],

      state
    >
  >
>

export type Branch<
  instruction extends IBranch,
  state extends ProgramState,
> = Satisfies<ProgramState,
  State.Instructions.set<
    state['activeBranches'][instruction['id']],

    state
  >
>

export type BranchIf<
  instruction extends IBranchIf,
  state extends ProgramState
> = Satisfies<ProgramState,
  state['stack'] extends [
    ...infer remaining extends WasmValue[],
    infer condition extends WasmValue,
  ]
  ? Wasm.I32Eqz<condition> extends Wasm.I32True

    // false branch
    // nothing happens. we just pop the stack and endLoop on to the next instruction
    ? State.Stack.set<
        remaining,

        state
      >

    // true branch
    // true indicates we _want_ to branch back.  so we do!
    : State.Instructions.set<
        state['activeBranches'][instruction['id']],

        State.Stack.set<
          remaining,
          state
        >
      >

  : State.error<"stack exhausted", instruction, state>
>

export type BranchTable<
  instruction extends IBranchTable,
  state extends ProgramState
> = Satisfies<ProgramState,
  state['stack'] extends [
    ...infer remaining extends WasmValue[],
    infer index extends WasmValue,
  ]

  // the whole reason `BranchTable.branches` is an object instead of an array is to make it easy to check membership like we are here.  if there's a more efficient way to do this: that'd be great
  ? index extends keyof instruction['branches']

    // match found
    ?
      State.Instructions.set<
        state['activeBranches'][instruction['branches'][index]],

        State.Stack.set<
          remaining,
          state
        >
      >

    // no match found fallback to the default
    : State.Instructions.set<
        state['activeBranches'][instruction['default']],

        State.Stack.set<
          remaining,
          state
        >
      >
  : State.error<"stack exhausted", instruction, state>
>

type Refreshment = {
  params: Param[],
  stack: WasmValue[],
  locals: LocalsById,
}

type Refresh<T extends Refreshment> =
  T['params'] extends [
    ...infer remainingParams extends Param[],
    infer param extends Param,
  ]
  ? T['stack'] extends [
      ...infer remainingStack extends WasmValue[],
      infer pop extends WasmValue,
    ]
    ? Refresh<{
        params: remainingParams,
        stack: remainingStack,
        locals: T['locals'] & {
          [k in param]: pop
        }
      }>
    : never // should never happen because the stack should always have at least as many items as there are params
  : T

export type Call<
  instruction extends ICall,
  state extends ProgramState,

  _func extends Func = state['funcs'][instruction['id']],
  _funcId extends string = instruction['id'],

  // pop things off the stack to populate params
  _refreshment extends Refreshment = Refresh<{
    params: _func['params'],
    stack: state['stack'],
    locals: {}
  }>
> = Satisfies<ProgramState,
  // push a new execution context for the old function we're just leaving
  State.ExecutionContexts.push<
    {
      locals: _refreshment['locals'], // even though there may be known locals for the function (in addition to params), they are added when they're set with LocalSet
      funcId: _funcId,
      branches: {},
      stackDepth: _refreshment['stack']['length'],
      instructions: [], // we will capture current instructions in the State.ExecutionContexts.push helper
    },
    [
      // set instructions from this func onto the instructions stack
      // it's VERY important that this happens AFTER the execution context has a chance to capture the current instructions
      ..._func['instructions'],

      // add this synthetic for when we hit the end
      { kind: 'EndFunction', id: _funcId }
    ],
    State.Stack.set<
      _refreshment['stack'],
      state
    >
  >
>

export type CallIndirect<
  instruction extends ICallIndirect,
  state extends ProgramState
> = Satisfies<ProgramState,
  state['stack'] extends [
    ...infer remainder extends WasmValue[],
    infer address extends WasmValue,
  ]
  ? state['indirect'][address] extends infer nextFunc extends WasmValue
    ? State.Instructions.unshift<
        { kind: 'Call', id: nextFunc },

        State.Stack.set<
          remainder,
          state
        >
      >
    : State.error<"CallIndirect instruction expects an address on the stack that points to a function", instruction, state>
  : State.error<"CallIndirect instruction expects an address on the stack", instruction, state>
>

export type Drop<
  instruction extends IDrop, // unused
  state extends ProgramState
> = Satisfies<ProgramState,
  state['stack'] extends [
    ...infer remaining extends WasmValue[],
    infer drop extends WasmValue, // dropped instruction
  ]
  ? State.Stack.set<
      remaining,

      state
    >
  : State.error<"stack exhausted", instruction, state>
>

export type If<
  instruction extends IIf,
  state extends ProgramState
> = Satisfies<ProgramState,
  state['stack'] extends [
    ...infer remaining extends WasmValue[],
    infer condition extends WasmValue,
  ]
  ? // according to the WASM spec, a condition must be an i32
    Wasm.I32Eqz<condition> extends Wasm.I32True

    ? // false branch
      // pop the false branch instructions
      instruction['else'] extends Instruction[]
      ? State.Instructions.concat<
          instruction['else'],
          // pop the condition (we're done with it now)
          State.Stack.set<
            remaining,
            state
          >
        >
      :
        // pop the condition (we're done with it now)
        State.Stack.set<
          remaining,
          state
        >

    : // true branch
      // pop the false branch instructions
      State.Instructions.concat<
        instruction['then'],

        // pop the condition (we're done with it now)
        State.Stack.set<
          remaining,
          state
        >
      >

  : State.error<"stack exhausted", instruction, state>
>

export type Loop<
  instruction extends ILoop,
  state extends ProgramState,

  _withEndLoop extends Instruction[] = [
    ...instruction['instructions'],
    {
      kind: 'EndLoop',
      id: instruction['id'],

      // store the instructions _for this loop_ in the endLoop instruction in case we wanna revisit again later
      instructions: state['instructions'],
    }
  ]
> = Satisfies<ProgramState,
// State.debug<
//   [
//     'anything I want',
//     state['activeBranches'],
//   ],

  // cache this loop's following instructions for when we (more than likely) Branch to it later
  State.ExecutionContexts.Active.Branches.insert<
    instruction['id'],
    _withEndLoop,
    
    State.Instructions.concat<
      _withEndLoop,

      state
    >
  >
>
// >

export type Nop<
  instruction extends INop, // unused
  state extends ProgramState
> = Satisfies<ProgramState,
  state
>

/**
 * 1. remove the number of elements from the stack that the function returns
 * 2. remove values from the stack until you get it to activeStackDepth
 *   - make sure you accumulate them with prepend logic
 * 3. append the temporary return (_Acc) to the stack
 * 4. pop instructions until you reach a `EndFunction` instruction
*/
export type Return<
  instruction extends IReturn,
  state extends ProgramState,

  _Acc extends WasmValue[] = [],
> = Satisfies<ProgramState,
  // step 1's check
  _Acc['length'] extends instruction['count']
  ? // we can proceed to step 2

    // step 2's check
    state['stack']['length'] extends state['activeStackDepth']
    ? // we can proceed to step 3

      // step 3
      State.Stack.set<
        [
          ...state['stack'],
          ..._Acc, // we already prepended, so we can put it here normally
        ],

        // step 4: unshift an `EndFunction` instruction
        State.Instructions.unshift<
          {
            kind: 'EndFunction',
            id: state['activeFuncId']
          },
          state
        >
      >
    : // we need to recurse more to grab more values off the stack
      state['stack'] extends [
        ...infer remaining extends WasmValue[],
        infer pop extends WasmValue,
      ]
      ? // add this value to the accumulator
        Return<
          instruction,
          State.Stack.set<
            remaining,
            state
          >,
          _Acc // don't need to touch step 1's stuff
        >
      : State.error<"stack exhausted", instruction, state>


  : // step 1's logic: grab more values off the stack
    state['stack'] extends [
      ...infer remaining extends WasmValue[],
      infer pop extends WasmValue,
    ]
    ? // add this value to the accumulator
      Return<
        instruction,
        State.Stack.set<
          remaining,
          state
        >,
        [
          pop, // MUCHO IMPORTANTE!! - PREPEND LOGIC!!
          ..._Acc,
        ]
      >

    : State.error<"stack exhausted", instruction, state>
>

export type Select<
  instruction extends ISelect, // unused
  state extends ProgramState
> = Satisfies<ProgramState,
  state['stack'] extends [
    ...infer remaining extends WasmValue[],
    infer b extends WasmValue,
    infer a extends WasmValue,
    infer condition extends WasmValue,
  ]
  ? Wasm.I32Eqz<condition> extends Wasm.I32True
    ? State.Stack.set<
        [
          ...remaining,
          a,
        ],

        state
      >
    : State.Stack.set<
        [
          ...remaining,
          b,
        ],
        state
      >
  : State.error<"stack exhausted", instruction, state>
>

export type Unreachable<
  instruction extends IUnreachable,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Instructions.unshift<
    {
      kind: 'Halt',
      reason: "reached an Unreachable instruction.  you prolly deserve the debugging session that's coming next"
    },
    state
  >
>