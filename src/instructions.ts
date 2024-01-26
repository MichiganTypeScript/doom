import { Func, Param, ProgramState, evaluate } from "./program.js"
import { Call as Apply, Numbers } from "hotscript"
import { State } from "./state.js"
import { MemoryAddress } from "./memory.js"
import { Cast } from "./utils.js"

type Reverse<T extends any[]> =
  T extends [infer head, ...infer tail]
  ? [...Reverse<tail>, head]
  : []

/*
 * No.
 * I'm not a Java programmer.
 * The `I` prefixing is not hungarian notation.. it's just to prevent naming collisions.
 * That's all.
 */

export type IAdd = {
  kind: "Add"
}

export type IAnd = {
  kind: "And"
}

export type IBlock = {
  kind: "Block"

  /** a block identifier */
  id: string;

  instructions: Instruction[];
}

export type IBranch = {
  kind: "Branch"

  /** a block identifier */
  id: string;
}

export type IBranchIf = {
  kind: "BranchIf"

  /** a block identifier */
  id: string;
}

export type ICall = {
  kind: "Call"

  /** a function identifier */
  id: string;
}

export type ICallIndirect = {
  kind: "CallIndirect"

  /** a function identifier */
  id: string;
}

export type IConst = {
  kind: "Const"

  /** a constant value */
  value: number;
}

/** this isn't really a webassembly instruction, but it's a sentinel put here so that the program can understand when to cull execution contexts (i.e. after the function returns) */
export type IEndFunction = {
  kind: "EndFunction"

  /** a function identifier */
  id: string;
}

export type IEquals = {
  kind: "Equals"
}

export type IEqualsZero = {
  kind: "EqualsZero"
}

export type IGlobalGet = {
  kind: "GlobalGet"

  /** a local identifier */
  id: string
}

export type IGlobalSet = {
  kind: "GlobalSet"

  /** a local identifier */
  id: string
}

export type IGreaterThan = {
  kind: "GreaterThan"
}

export type IGreaterThanOrEqual = {
  kind: "GreaterThanOrEqual"
}

/** not a webassembly instruction. used for debugging: tells the program to immediately Halt */
export type IHalt = {
  kind: "Halt"
}

export type IIf = {
  kind: "If"

  then: Instruction[];
  else: Instruction[];
}

export type ILoad = {
  kind: "Load"

  align: number;

  offset: number;
}

export type ILessThan = {
  kind: "LessThan"
}

export type ILessThanOrEqual = {
  kind: "LessThanOrEqual"
}

export type ILocalGet = {
  kind: "LocalGet"

  /** a local identifier */
  id: string
}

export type ILocalSet = {
  kind: "LocalSet"

  /** a local identifier */
  id: string
}

export type ILocalTee = {
  kind: "LocalTee"

  /** a local identifier */
  id: string
}

export type IMultiply = {
  kind: "Multiply"
}

export type INegate = {
  kind: "Negate"
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

export type ISubtract = {
  kind: "Subtract"
}

export type IStore = {
  kind: "Store"

  align: number;

  offset: number;
}

/** an item on the stack */
export type Entry = number;

export type Instruction =
  | IAdd
  | IAnd
  | IBlock
  | IBranch
  | IBranchIf
  | ICall
  | ICallIndirect
  | IConst
  | IEndFunction
  | IEquals
  | IEqualsZero
  | IGlobalGet
  | IGlobalSet
  | IGreaterThan
  | IGreaterThanOrEqual
  | IHalt
  | IIf
  | ILessThan
  | ILessThanOrEqual
  | ILoad
  | ILocalGet
  | ILocalSet
  | ILocalTee
  | IMultiply
  | INegate
  | INop
  | IReturn
  | ISelect
  | IStore
  | ISubtract


export type selectInstruction<
  initialState extends ProgramState,
  remainingInstructions extends Instruction[],
  instruction extends Instruction,

  state extends ProgramState =
    State.Instructions.set<
      initialState,
      remainingInstructions
    >
> =
  instruction extends IAdd
  ? Instructions.Add<state, instruction>

  : instruction extends IAnd
  ? Instructions.And<state, instruction>

  : instruction extends IBlock
  ? Instructions.Block<state, instruction>

  : instruction extends IBranch
  ? Instructions.Branch<state, instruction>

  : instruction extends IBranchIf
  ? Instructions.BranchIf<state, instruction>

  : instruction extends ICall
  ? Instructions.Call<state, instruction>

  : instruction extends ICallIndirect
  ? Instructions.CallIndirect<state, instruction>

  : instruction extends IConst
  ? Instructions.Const<state, instruction>

  : instruction extends IEndFunction
  ? Instructions.EndFunction<state, instruction>

  : instruction extends IEquals
  ? Instructions.Equals<state, instruction>

  : instruction extends IEqualsZero
  ? Instructions.EqualsZero<state, instruction>

  : instruction extends IGlobalGet
  ? Instructions.GlobalGet<state, instruction>

  : instruction extends IGlobalSet
  ? Instructions.GlobalSet<state, instruction>

  : instruction extends IGreaterThan
  ? Instructions.GreaterThan<state, instruction>

  : instruction extends IGreaterThanOrEqual
  ? Instructions.GreaterThanOrEqual<state, instruction>

  : instruction extends IHalt
  ? Instructions.Halt<state, instruction>

  : instruction extends IIf
  ? Instructions.If<state, instruction>

  : instruction extends ILessThan
  ? Instructions.LessThan<state, instruction>

  : instruction extends ILessThanOrEqual
  ? Instructions.LessThanOrEqual<state, instruction>

  : instruction extends ILoad
  ? Instructions.Load<state, instruction>

  : instruction extends ILocalGet
  ? Instructions.LocalGet<state, instruction>

  : instruction extends ILocalSet
  ? Instructions.LocalSet<state, instruction>

  : instruction extends ILocalTee
  ? Instructions.LocalTee<state, instruction>

  : instruction extends IMultiply
  ? Instructions.Multiply<state, instruction>

  : instruction extends INegate
  ? Instructions.Negate<state, instruction>

  : instruction extends INop
  ? Instructions.Nop<state, instruction>

  : instruction extends IReturn
  ? Instructions.Return<state, instruction>

  : instruction extends ISelect
  ? Instructions.Select<state, instruction>

  : instruction extends ISubtract
  ? Instructions.Subtract<state, instruction>

  : instruction extends IStore
  ? Instructions.Store<state, instruction>

  : 'you forgot to handle an instruction'

export namespace Instructions {
  export type Add<
    state extends ProgramState,
    instruction extends IAdd // unused
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry,
    ]
    ? State.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.Add<a, b>>
        ]
      >
    : never

  export type And<
    state extends ProgramState,
    instruction extends IAnd // unused
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry,
    ]
    ? State.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.Add<a, b>> // TODO THIS IS WRONG !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        ]
      >
    : never

  export type Block<
    state extends ProgramState,
    instruction extends IBlock,
  > =
    // then push the block's instructions onto the stack
    State.Instructions.push<

      // first cache existing instructions (as they are at this moment) in the execution context for when we break to this block later
      State.ExecutionContexts.Active.Branches.set<
        state,
        instruction['id'],
        State.Instructions.get<state>
      >,

      instruction['instructions']
    >

  export type BranchIf<
    state extends ProgramState,
    instruction extends IBranchIf,
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer condition extends Entry,
    ]
    ? condition extends 0

      // false branch
      // nothing happens. we just pop the stack and continue on to the next instruction
      ? State.Stack.set<
          state,
          remaining
        >

      // true branch
      : State.Instructions.set<
          State.Stack.set<
            state,
            remaining
          >,
          State.ExecutionContexts.Active.Branches.get<state>[instruction['id']]
        >

    : never

  export type Branch<
    state extends ProgramState,
    instruction extends IBranch,
  > = 
    State.Instructions.set<
      state,
      State.ExecutionContexts.Active.Branches.get<state>[instruction['id']]
    >

  /** this functions purpose in life is to pop items off the stack according to a function's params and add them as locals */
  type PopulateParams<
    state extends ProgramState,
    funcId extends string,
    params extends Param[],
  > =
    // HELP: params are fed in reverse order and simply switching the infer statements order below for some reason doesn't work...
    Reverse<params> extends [
      infer param extends Param,
      ...infer remainingParams extends Param[],
    ]
    ? State.Stack.get<state> extends [
        ...infer remainingStack extends Entry[],
        infer pop extends Entry,
      ]
      ? PopulateParams<
          // set the locals to have the values from the stack that we just popped off
          State.ExecutionContexts.Active.Locals.set<
            // set the stack to have remaining values only
            State.Stack.set<
              state,
              remainingStack
            >,

            param,
            pop
          >,
          funcId,
          remainingParams
        >
      : never // should never happen because the stack should always have at least as many items as there are params
    : state // no more params, so we can jump out

  export type Call<
    state extends ProgramState,
    instruction extends ICall,

    _func extends Func = State.Funcs.get<state>[instruction['id']],
  > =
    // add the instructions from this func onto the stack
    State.Instructions.push<


      // first, pop things off the stack to populate params
      PopulateParams<
        // push a new execution context
        State.ExecutionContexts.push<
          state,
          {
            locals: {},
            funcId: instruction['id'],
            branches: {},
          }
        >,
        instruction['id'],
        _func['params']
      >,

      [
        ..._func['instructions'],
        { kind: 'EndFunction', id: instruction['id'] }
      ]
    >

  export type CallIndirect<
    state extends ProgramState,
    instruction extends ICallIndirect,
  > = state;

  export type Const<
    state extends ProgramState,
    instruction extends IConst,
  > =
    State.Stack.push<
      state,
      instruction['value']
    >

  export type Equals<
    state extends ProgramState,
    instruction extends IEquals // unused
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry,
    ]
    ? State.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.Equal<a, b>> extends true ? 1 : 0
        ]
      >
    : never

  export type EqualsZero<
    state extends ProgramState,
    instruction extends IEqualsZero // unused
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer a extends Entry,
    ]
    ? State.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.Equal<a, 0>> extends true ? 1 : 0
        ]
      >
    : never

  export type EndFunction<
    state extends ProgramState,
    instruction extends IEndFunction,
  > =
    // pop the active execution context
    State.ExecutionContexts.pop<
      state
    >

  export type GlobalGet<
    state extends ProgramState,
    instruction extends IGlobalGet,
  > =
    State.Stack.push<
      state,
      State.Globals.get<state>[instruction['id']]
    >

  export type GlobalSet<
    state extends ProgramState,
    instruction extends IGlobalSet,
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer a extends Entry,
    ]
    ? State.Stack.set<
        State.Globals.insert<
          state,
          Record<instruction['id'], a>
        >,
        remaining
      >
    : never

  export type GreaterThan<
    state extends ProgramState,
    instruction extends IGreaterThan // unused
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer a extends Entry,
      infer b extends Entry,
    ]
    ? State.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.GreaterThan<a, b>> extends true ? 1 : 0
        ]
      >
    : never

  export type GreaterThanOrEqual<
    state extends ProgramState,
    instruction extends IGreaterThanOrEqual // unused
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer a extends Entry,
      infer b extends Entry,
    ]
    ? State.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.GreaterThanOrEqual<a, b>> extends true ? 1 : 0
        ]
      >
    : never

  export type Halt<
    state extends ProgramState,
    instruction extends IHalt
  > = state;

  export type If<
    state extends ProgramState,
    instruction extends IIf,
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer condition extends Entry,
    ]
    ? condition extends 0

      ? // false branch
        // pop the false branch instructions
        State.Instructions.push<
          // pop the condition (we're done with it now)
          State.Stack.set<
            state,
            remaining
          >,
          instruction['else']
        >

      : // true branch
        // pop the false branch instructions
        State.Instructions.push<
          // pop the condition (we're done with it now)
          State.Stack.set<
            state,
            remaining
          >,
          instruction['then']
        >

    : never

  export type LessThan<
    state extends ProgramState,
    instruction extends ILessThan // unused
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer a extends Entry,
      infer b extends Entry,
    ]
    ? State.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.LessThan<a, b>> extends true ? 1 : 0
        ]
      >
    : never

  export type LessThanOrEqual<
    state extends ProgramState,
    instruction extends ILessThanOrEqual // unused
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer a extends Entry,
      infer b extends Entry,
    ]
    ? State.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.LessThanOrEqual<a, b>> extends true ? 1 : 0
        ]
      >
    : never

  export type Load<
    state extends ProgramState,
    instruction extends ILoad,
  > =
    state['stack'] extends [
      ...infer remaining extends Entry[],
      infer address extends keyof state['memory'],
    ]
    ? State.Stack.set<
        state,
        [
          ...remaining,
          // no idea why this Cast is needed, but it is
          Cast<state['memory'][address], Entry>,
        ]
      >
    : never

  export type LocalGet<
    state extends ProgramState,
    instruction extends ILocalGet,
  > =
    State.Stack.push<
      state,
      State.ExecutionContexts.Active.Locals.get<state>[instruction['id']]
    >

  export type LocalSet<
    state extends ProgramState,
    instruction extends ILocalSet,
  > =
    state['stack'] extends [
      ...infer remaining extends Entry[],
      infer entry extends Entry,
    ]
    ? State.Stack.set<
        State.ExecutionContexts.Active.Locals.set<
          state,
          instruction['id'],
          entry
        >,
        remaining
      >
    : never

  export type LocalTee<
    state extends ProgramState,
    instruction extends ILocalTee,
  > =
    state['stack'] extends [
      ...infer remaining extends Entry[],
      infer entry extends Entry
    ]
    ? State.ExecutionContexts.Active.Locals.set<
        state,
        instruction['id'],
        entry
      >
    : never

  export type Multiply<
    state extends ProgramState,
    instruction extends IMultiply // unused
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry,
    ]
    ? State.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.Mul<a, b>>
        ]
      >
    : never


  export type Negate<
    state extends ProgramState,
    instruction extends INegate // unused
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer a extends Entry,
    ]
    ? State.Stack.set<
        state,
        [
          ...remaining,
          a extends 0 // this check is only necessary due to a bug in hotscript: https://github.com/gvergnaud/hotscript/issues/117
          ? 0
          : Apply<Numbers.Negate<a>>
        ]
      >
    : never

  export type Nop<
    state extends ProgramState,
    instruction extends INop // unused
  > = state;

  /**
   * If there are no values left on the stack, it returns nothing/void.
   * If there are the same amount of values left on the stack as specified in the function's type signature, it returns those values.
   * If there are more values that the function's return type specifies, then the excess values are popped from the stack and discarded, and the last N values are returned.
   */
  export type Return<
    state extends ProgramState,
    instruction extends IReturn,

    _stack extends Entry[] = [],
  > =
    _stack['length'] extends instruction['count']
    ? State.Stack.set<
        state,
        _stack
      >
    : state['stack'] extends [
        ...infer remaining extends Entry[],
        infer pop extends Entry,
      ]
      ? Return<
          State.Stack.set<
            state,
            remaining
          >,
          instruction,

          [
            ..._stack,
            pop
          ]
        >
      : never

  export type Select<
    state extends ProgramState,
    instruction extends ISelect // unused
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry,
      infer condition extends Entry,
    ]
    ? condition extends 0
      ? State.Stack.set<state, [
          ...remaining,
          a,
        ]>
      : State.Stack.set<state, [
          ...remaining,
          b,
        ]>
    : never

  export type Subtract<
    state extends ProgramState,
    instruction extends ISubtract // unused
  > =
    State.Stack.get<state> extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry,
    ]
    ? State.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.Sub<b, a>>
        ]
      >
    : never

  export type Store<
    state extends ProgramState,
    instruction extends IStore, // unused
    // TODO: gotta grab the offset from somewhere
  > =
    state['stack'] extends [
      ...infer remaining extends Entry[],
      infer address extends MemoryAddress,
      infer entry extends Entry,
    ]
    ? State.Stack.set<
        State.Memory.insert<
          state,
          address,
          entry
        >,
        remaining
      >
    : never
}
