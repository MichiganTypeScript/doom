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
      remainingInstructions,
      initialState
    >
> =
  instruction extends IAdd
  ? Instructions.Add<instruction, state>

  : instruction extends IAnd
  ? Instructions.And<instruction, state>

  : instruction extends IBlock
  ? Instructions.Block<instruction, state>

  : instruction extends IBranch
  ? Instructions.Branch<instruction, state>

  : instruction extends IBranchIf
  ? Instructions.BranchIf<instruction, state>

  : instruction extends ICall
  ? Instructions.Call<instruction, state>

  : instruction extends ICallIndirect
  ? Instructions.CallIndirect<instruction, state>

  : instruction extends IConst
  ? Instructions.Const<instruction, state>

  : instruction extends IEndFunction
  ? Instructions.EndFunction<instruction, state>

  : instruction extends IEquals
  ? Instructions.Equals<instruction, state>

  : instruction extends IEqualsZero
  ? Instructions.EqualsZero<instruction, state>

  : instruction extends IGlobalGet
  ? Instructions.GlobalGet<instruction, state>

  : instruction extends IGlobalSet
  ? Instructions.GlobalSet<instruction, state>

  : instruction extends IGreaterThan
  ? Instructions.GreaterThan<instruction, state>

  : instruction extends IGreaterThanOrEqual
  ? Instructions.GreaterThanOrEqual<instruction, state>

  : instruction extends IHalt
  ? Instructions.Halt<instruction, state>

  : instruction extends IIf
  ? Instructions.If<instruction, state>

  : instruction extends ILessThan
  ? Instructions.LessThan<instruction, state>

  : instruction extends ILessThanOrEqual
  ? Instructions.LessThanOrEqual<instruction, state>

  : instruction extends ILoad
  ? Instructions.Load<instruction, state>

  : instruction extends ILocalGet
  ? Instructions.LocalGet<instruction, state>

  : instruction extends ILocalSet
  ? Instructions.LocalSet<instruction, state>

  : instruction extends ILocalTee
  ? Instructions.LocalTee<instruction, state>

  : instruction extends IMultiply
  ? Instructions.Multiply<instruction, state>

  : instruction extends INegate
  ? Instructions.Negate<instruction, state>

  : instruction extends INop
  ? Instructions.Nop<instruction, state>

  : instruction extends IReturn
  ? Instructions.Return<instruction, state>

  : instruction extends ISelect
  ? Instructions.Select<instruction, state>

  : instruction extends ISubtract
  ? Instructions.Subtract<instruction, state>

  : instruction extends IStore
  ? Instructions.Store<instruction, state>

  : 'you forgot to handle an instruction'

export namespace Instructions {
  export type Add<
    instruction extends IAdd, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer b extends Entry,
        infer a extends Entry,
      ]
      ? State.Stack.set<
          [
            ...remaining,
            Apply<Numbers.Add<a, b>>
          ],
          state
        >
      : never
  > = RESULT

  export type And<
    instruction extends IAnd, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer b extends Entry,
        infer a extends Entry,
      ]
      ? State.Stack.set<
          [
            ...remaining,
            Apply<Numbers.Add<a, b>> // TODO THIS IS WRONG !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          ],
          state
        >
      : never
  > = RESULT

  export type Block<
    instruction extends IBlock,
    state extends ProgramState,

    RESULT extends ProgramState =
      // then push the block's instructions onto the stack
      State.Instructions.concat<
        instruction['instructions'],

        // first cache existing instructions (as they are at this moment) in the execution context for when we break to this block later
        State.ExecutionContexts.Active.Branches.set<
          instruction['id'],
          State.Instructions.get<state>,

          state
        >
      >
  > = RESULT

  export type BranchIf<
    instruction extends IBranchIf,
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer condition extends Entry,
      ]
      ? condition extends 0

        // false branch
        // nothing happens. we just pop the stack and continue on to the next instruction
        ? State.Stack.set<
            remaining,

            state
          >

        // true branch
        : State.Instructions.set<
            State.ExecutionContexts.Active.Branches.get<state>[instruction['id']],

            State.Stack.set<
              remaining,
              state
            >
          >

      : never
  > = RESULT

  export type Branch<
    instruction extends IBranch,
    state extends ProgramState,
  > = 
    State.Instructions.set<
      State.ExecutionContexts.Active.Branches.get<state>[instruction['id']],

      state
    >

  /** this functions purpose in life is to pop items off the stack according to a function's params and add them as locals */
  type PopulateParams<
    funcId extends string,
    params extends Param[],
    state extends ProgramState,

    RESULT extends ProgramState =
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
            funcId,
            remainingParams,

            // set the locals to have the values from the stack that we just popped off
            State.ExecutionContexts.Active.Locals.set<
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
  > = RESULT

  export type Call<
    instruction extends ICall,
    state extends ProgramState,

    _func extends Func = State.Funcs.get<state>[instruction['id']],

    RESULT extends ProgramState =
      // add the instructions from this func onto the stack
      State.Instructions.concat<
        [
          ..._func['instructions'],
          { kind: 'EndFunction', id: instruction['id'] }
        ],

        // first, pop things off the stack to populate params
        PopulateParams<
          instruction['id'],
          _func['params'],

          // push a new execution context
          State.ExecutionContexts.push<
            {
              locals: {},
              funcId: instruction['id'],
              branches: {},
            },
            state
          >
        >
      >
  > = RESULT

  export type CallIndirect<
    instruction extends ICallIndirect,
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remainder extends Entry[],
        infer index extends Entry, // it's sorta hard to tell because there are no MDN docs to go from on this but it does seem like the argument that comes before is in fact the index.  if instead the params come before... we'll just have to look up the count and pop accordingly.
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
  > = RESULT

  export type Const<
    instruction extends IConst,
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.push<
        instruction['value'],

        state
      >
  > = RESULT

  export type Equals<
    instruction extends IEquals, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer b extends Entry,
        infer a extends Entry,
      ]
      ? State.Stack.set<
          [
            ...remaining,
            Apply<Numbers.Equal<a, b>> extends true ? 1 : 0
          ],

          state
        >
      : never
  > = RESULT

  export type EqualsZero<
    instruction extends IEqualsZero, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer a extends Entry,
      ]
      ? State.Stack.set<
          [
            ...remaining,
            Apply<Numbers.Equal<a, 0>> extends true ? 1 : 0
          ],

          state
        >
      : never
  > = RESULT

  export type EndFunction<
    instruction extends IEndFunction, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      // pop the active execution context
      State.ExecutionContexts.pop<
        state
      >
  > = RESULT

  export type GlobalGet<
    instruction extends IGlobalGet,
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.push<
        State.Globals.get<state>[instruction['id']],
        state
      >
  > = RESULT

  export type GlobalSet<
    instruction extends IGlobalSet,
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer a extends Entry,
      ]
      ? State.Stack.set<
          remaining,

          State.Globals.insert<
            Record<instruction['id'], a>,
            state
          >
        >
      : never
  > = RESULT

  export type GreaterThan<
    instruction extends IGreaterThan, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer a extends Entry,
        infer b extends Entry,
      ]
      ? State.Stack.set<
          [
            ...remaining,
            Apply<Numbers.GreaterThan<a, b>> extends true ? 1 : 0
          ],

          state
        >
      : never
  > = RESULT

  export type GreaterThanOrEqual<
    instruction extends IGreaterThanOrEqual, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer a extends Entry,
        infer b extends Entry,
      ]
      ? State.Stack.set<
          [
            ...remaining,
            Apply<Numbers.GreaterThanOrEqual<a, b>> extends true ? 1 : 0
          ],

          state
        >
      : never
  > = RESULT

  export type Halt<
    instruction extends IHalt,
    state extends ProgramState,
  > = state;

  export type If<
    instruction extends IIf,
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer condition extends Entry,
      ]
      ? condition extends 0

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
  > = RESULT

  export type LessThan<
    instruction extends ILessThan, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer a extends Entry,
        infer b extends Entry,
      ]
      ? State.Stack.set<
          [
            ...remaining,
            Apply<Numbers.LessThan<a, b>> extends true ? 1 : 0
          ],
          state
        >
      : never
  > = RESULT

  export type LessThanOrEqual<
    instruction extends ILessThanOrEqual, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer a extends Entry,
        infer b extends Entry,
      ]
      ? State.Stack.set<
          [
            ...remaining,
            Apply<Numbers.LessThanOrEqual<a, b>> extends true ? 1 : 0
          ],
          state
        >
      : never
  > = RESULT

  export type Load<
    instruction extends ILoad,
    state extends ProgramState,

    RESULT extends ProgramState =
      state['stack'] extends [
        ...infer remaining extends Entry[],
        infer address extends keyof state['memory'],
      ]
      ? State.Stack.set<
          [
            ...remaining,
            // no idea why this Cast is needed, but it is
            Cast<state['memory'][address], Entry>,
          ],

          state
        >
      : never
  > = RESULT

  export type LocalGet<
    instruction extends ILocalGet,
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.push<
        State.ExecutionContexts.Active.Locals.get<state>[instruction['id']],
        state
      >
  > = RESULT

  export type LocalSet<
    instruction extends ILocalSet,
    state extends ProgramState,

    RESULT extends ProgramState =
      state['stack'] extends [
        ...infer remaining extends Entry[],
        infer entry extends Entry,
      ]
      ? State.Stack.set<
          remaining,

          State.ExecutionContexts.Active.Locals.set<
            instruction['id'],
            entry,
            state
          >
        >
      : never
  > = RESULT

  export type LocalTee<
    instruction extends ILocalTee,
    state extends ProgramState,

    RESULT extends ProgramState =
      state['stack'] extends [
        ...infer remaining extends Entry[],
        infer entry extends Entry
      ]
      ? State.ExecutionContexts.Active.Locals.set<
          instruction['id'],
          entry,
          state
        >
      : never
  > = RESULT

  export type Multiply<
    instruction extends IMultiply, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer b extends Entry,
        infer a extends Entry,
      ]
      ? State.Stack.set<
          [
            ...remaining,
            Apply<Numbers.Mul<a, b>>
          ],

          state
        >
      : never
  > = RESULT


  export type Negate<
    instruction extends INegate, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer a extends Entry,
      ]
      ? State.Stack.set<
          [
            ...remaining,
            a extends 0 // this check is only necessary due to a bug in hotscript: https://github.com/gvergnaud/hotscript/issues/117
            ? 0
            : Apply<Numbers.Negate<a>>
          ],

          state
        >
      : never
  > = RESULT

  export type Nop<
    instruction extends INop, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      state
  > = RESULT;

  /**
   * If there are no values left on the stack, it returns nothing/void.
   * If there are the same amount of values left on the stack as specified in the function's type signature, it returns those values.
   * If there are more values that the function's return type specifies, then the excess values are popped from the stack and discarded, and the last N values are returned.
   */
  export type Return<
    instruction extends IReturn,
    state extends ProgramState,

    _stack extends Entry[] = [],

    RESULT extends ProgramState =
      _stack['length'] extends instruction['count']
      ? State.Stack.set<
          _stack,
          state
        >
      : state['stack'] extends [
          ...infer remaining extends Entry[],
          infer pop extends Entry,
        ]
        ? Return<
            instruction,

            State.Stack.set<
              remaining,
              state
            >,

            [
              ..._stack,
              pop
            ]
          >
        : never
  > = RESULT

  export type Select<
    instruction extends ISelect, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer b extends Entry,
        infer a extends Entry,
        infer condition extends Entry,
      ]
      ? condition extends 0
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
  > = RESULT

  export type Subtract<
    instruction extends ISubtract, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer b extends Entry,
        infer a extends Entry,
      ]
      ? State.Stack.set<
          [
            ...remaining,
            Apply<Numbers.Sub<b, a>>
          ],

          state
        >
      : never
  > = RESULT

  export type Store<
    instruction extends IStore, // unused
    state extends ProgramState,
    // TODO: gotta grab the offset from somewhere

    RESULT extends ProgramState =
      state['stack'] extends [
        ...infer remaining extends Entry[],
        infer address extends MemoryAddress,
        infer entry extends Entry,
      ]
      ? State.Stack.set<
          remaining,

          State.Memory.insert<
            address,
            entry,
            state
          >
        >
      : never
  > = RESULT
}
