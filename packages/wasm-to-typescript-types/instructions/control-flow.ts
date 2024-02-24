import type { Func, Param, ProgramState } from "../types"
import type { State } from '../state'
import type { Instruction } from "./instructions"
import type { Wasm, WasmValue } from 'ts-type-math'

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
  else: Instruction[]
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

  : never
>

export type Block<
  instruction extends IBlock,
  state extends ProgramState
> = Satisfies<ProgramState,
  // then push the block's instructions onto the stack
  State.Instructions.concat<
    instruction['instructions'],

    // first cache existing instructions (as they are at this moment) in the execution context for when we break to this block later
    State.ExecutionContexts.Active.Branches.merge<
      instruction['id'],
      State.Instructions.get<state>,

      state
    >
  >
>

export type Branch<
  instruction extends IBranch,
  state extends ProgramState,
> = Satisfies<ProgramState,
  State.Instructions.set<
    State.ExecutionContexts.Active.Branches.get<state>[instruction['id']],

    state
  >
>

export type BranchIf<
  instruction extends IBranchIf,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
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
        State.ExecutionContexts.Active.Branches.get<state>[instruction['id']],

        State.Stack.set<
          remaining,
          state
        >
      >

  : never
>

export type BranchTable<
  instruction extends IBranchTable,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends WasmValue[],
    infer index extends WasmValue,
  ]

  // the whole reason `BranchTable.branches` is an object instead of an array is to make it easy to check membership like we are here.  if there's a more efficient way to do this: that'd be great
  ? index extends keyof instruction['branches']

    // match found
    ?
      State.Instructions.set<
        State.ExecutionContexts.Active.Branches.get<state>[instruction['branches'][index]],

        State.Stack.set<
          remaining,
          state
        >
      >

    // no match found fallback to the default
    : State.Instructions.set<
        State.ExecutionContexts.Active.Branches.get<state>[instruction['default']],

        State.Stack.set<
          remaining,
          state
        >
      >
  : never
>

/** this function's purpose in life is to pop items off the stack according to a function's params and add them as locals */
type PopulateParams<
  funcId extends string,
  params extends Param[],
  state extends ProgramState
> = Satisfies<ProgramState,
  params extends [
    ...infer remainingParams extends Param[],
    infer param extends Param,
  ]
  ? State.Stack.get<state> extends [
      ...infer remainingStack extends WasmValue[],
      infer pop extends WasmValue,
    ]
    ? PopulateParams<
        funcId,
        remainingParams,

        // set the locals to have the values from the stack that we just popped off
        State.ExecutionContexts.Active.Locals.insert<
          param,
          pop,

          // set the stack to have remaining values only
          State.Stack.set<
            remainingStack,

            state
          >
        >
      >
    : never // should never happen because the stack should always have at least as many items as there are params
  : state // no more params, so we can jump out
>

export type Call<
  instruction extends ICall,
  state extends ProgramState,

  _func extends Func = State.Funcs.get<state>[instruction['id']],
  _funcId extends string = instruction['id']
> = Satisfies<ProgramState,
  // add the instructions from this func onto the stack
  State.Instructions.concat<
    [
      ..._func['instructions'],
      { kind: 'EndFunction', id: _funcId }
    ],

    // first, pop things off the stack to populate params
    PopulateParams<
      _funcId,
      _func['params'],

      // push a new execution context
      State.ExecutionContexts.push<
        {
          locals: {}, // even though there may be known locals for the function (in addition to params), they are added when they're set with LocalSet
          funcId: _funcId,
          branches: {},
        },
        state
      >
    >
  >
>

export type CallIndirect<
  instruction extends ICallIndirect,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remainder extends WasmValue[],
    infer index extends WasmValue, // it's sorta hard to tell because there are no MDN docs to go from on this but it does seem like the argument that comes before is in fact the index.  if instead the params come before... we'll just have to look up the count and pop accordingly.
  ]
  ?
    State.Instructions.unshift<
      {
        kind: 'Call',
        id: State.Indirect.getByIndex<state, index>
      },

      State.Stack.set<
        remainder,

        state
      >
    >
  : never // there should always at least be a single value on the stack (the index)
>

export type Drop<
  instruction extends IDrop, // unused
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends WasmValue[],
    infer drop extends WasmValue, // dropped instruction
  ]
  ? State.Stack.set<
      remaining,

      state
    >
  : never
>

export type If<
  instruction extends IIf,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
    ...infer remaining extends WasmValue[],
    infer condition extends WasmValue,
  ]
  ? // according to the WASM spec, a condition must be an i32
    Wasm.I32Eqz<condition> extends Wasm.I32True

    ? // false branch
      // pop the false branch instructions
      State.Instructions.concat<
        instruction['else'],

        // pop the condition (we're done with it now)
        State.Stack.set<
          remaining,
          state
        >
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

  : never
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
      instructions: State.Instructions.get<state>,
    }
  ]
> = Satisfies<ProgramState,
// State.debug<
//   [
//     'anything I want',
//     State.ExecutionContexts.Active.get<state>,
//   ],

  // cache this loop's following instructions for when we (more than likely) Branch to it later
  State.ExecutionContexts.Active.Branches.merge<
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
 * If there are no values left on the stack, it returns nothing/void.
 * If there are the same amount of values left on the stack as specified in the function's type signature, it returns those values.
 * If there are more values that the function's return type specifies, then the excess values are popped from the stack and discarded, and the last N values are returned.
 */
export type Return<
  instruction extends IReturn,
  state extends ProgramState,

  _Acc extends WasmValue[] = []
> = Satisfies<ProgramState,
  // have we accumulated enough values to return?
  _Acc['length'] extends instruction['count']

  // we can return now
  ?
    // set the stack to what remains in the accumulator
    State.Stack.set<
      _Acc,

      // pop instructions until we reach a matching `EndFunction` instruction
      State.Instructions.popUntil<
        { kind: 'EndFunction', id: State.ExecutionContexts.Active.get<state>['funcId'] },
        state
      >
    >

  // we need to recurse more to grab more values off the stack
  : state['stack'] extends [
      ...infer remaining extends WasmValue[],
      infer pop extends WasmValue,
    ]

    ? Return<
        instruction,

        State.Stack.set<
          remaining,
          state
        >,

        // add this value to the accumulator
        [
          ..._Acc,
          pop
        ]
      >
    : never
>

export type Select<
  instruction extends ISelect, // unused
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Stack.get<state> extends [
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
  : never
>

export type Unreachable<
  instruction extends IUnreachable,
  state extends ProgramState
> = Satisfies<ProgramState,
  State.Instructions.push<
    { kind: 'Halt', reason: "reached an Unreachable instruction.  you prolly deserve the debugging session that's coming next" },
    state
  >
>