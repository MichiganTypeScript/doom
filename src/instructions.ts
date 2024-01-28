import {
  Func,
  MemoryAddress,
  Param,
  ProgramState,
} from "./program.js"
import { State } from "./state.js"
import * as TypeMath from "./ts-type-math/index.js"

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

export type IDrop = {
  kind: "Drop"
}

/** a synthetic instruction for repeating the instructions of a loop */
export type IEndLoop = {
  kind: "EndLoop"

  id: string;

  instructions: Instruction[];
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

export type ILoop = {
  kind: "Loop"

  id: string;

  instructions: Instruction[];
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

export type INotEqual = {
  kind: "NotEqual"
}

export type IOr = {
  kind: "Or"
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

export type IUnreachable = {
  kind: "Unreachable"
}

export type IXor = {
  kind: "Xor"
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
  | IDrop
  | IEndFunction
  | IEndLoop
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
  | ILoop
  | IMultiply
  | INegate
  | INop
  | INotEqual
  | IOr
  | IReturn
  | ISelect
  | IStore
  | ISubtract
  | IUnreachable
  | IXor


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

  : instruction extends IDrop
  ? Instructions.Drop<instruction, state>

  : instruction extends IEndLoop
  ? Instructions.EndLoop<instruction, state>

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

  : instruction extends ILoop
  ? Instructions.Loop<instruction, state>

  : instruction extends IMultiply
  ? Instructions.Multiply<instruction, state>

  : instruction extends INegate
  ? Instructions.Negate<instruction, state>

  : instruction extends INop
  ? Instructions.Nop<instruction, state>

  : instruction extends INotEqual
  ? Instructions.NotEqual<instruction, state>

  : instruction extends IOr
  ? Instructions.Or<instruction, state>

  : instruction extends IReturn
  ? Instructions.Return<instruction, state>

  : instruction extends ISelect
  ? Instructions.Select<instruction, state>

  : instruction extends ISubtract
  ? Instructions.Subtract<instruction, state>

  : instruction extends IStore
  ? Instructions.Store<instruction, state>

  : instruction extends IUnreachable
  ? Instructions.Unreachable<instruction, state>

  : instruction extends IXor
  ? Instructions.Xor<instruction, state>

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
            TypeMath.Add<a, b>
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
            TypeMath.BitwiseAnd<a, b>
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
        State.ExecutionContexts.Active.Branches.merge<
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
      params extends [
        ...infer remainingParams extends Param[],
        infer param extends Param,
      ]
      ? State.Stack.get<state> extends [
          ...infer remainingStack extends Entry[],
          infer pop extends Entry,
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
  > = RESULT

  export type Call<
    instruction extends ICall,
    state extends ProgramState,

    _func extends Func = State.Funcs.get<state>[instruction['id']],
    _funcId extends string = instruction['id'],

    RESULT extends ProgramState =
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
              locals: {}, // even though there may be known locals for the function, they are added when they're set with LocalSet
              funcId: _funcId,
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

  export type Drop<
    instruction extends IDrop, // unused
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer drop extends Entry, // dropped instruction
      ]
      ? State.Stack.set<
          remaining,

          state
        >
      : never
  > = RESULT

  export type EndLoop<
    instruction extends IEndLoop,
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Instructions.set<
        instruction['instructions'],
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
            TypeMath.Equal<a, b> extends true ? 1 : 0
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
            TypeMath.Equal<a, 0> extends true ? 1 : 0
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
            TypeMath.GreaterThan<a, b> extends true ? 1 : 0
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
            TypeMath.GreaterThanOrEqual<a, b> extends true ? 1 : 0
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
            TypeMath.LessThan<a, b> extends true ? 1 : 0
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
            TypeMath.LessThanOrEqual<a, b> extends true ? 1 : 0
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
        infer address extends MemoryAddress
      ]
      ? State.Stack.set<
          [
            ...remaining,

            State.Memory.getByAddress<
              TypeMath.Add<
                address,
                instruction['offset']
              >,
              state
            >
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
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer entry extends Entry,
      ]
      ? State.Stack.set<
          remaining,

          State.ExecutionContexts.Active.Locals.insert<
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
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer entry extends Entry
      ]
      ? State.ExecutionContexts.Active.Locals.insert<
          instruction['id'],
          entry,
          state
        >
      : never
  > = RESULT

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
    ],

    RESULT extends ProgramState =
      // cache this loop's following instructions for when we (more than likely) Branch to it later
      State.ExecutionContexts.Active.Branches.merge<
        instruction['id'],
        _withEndLoop,
        
        State.Instructions.concat<
          _withEndLoop,

          state
        >
      >
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
            TypeMath.Multiply<a, b>
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
            : TypeMath.Negate<a>
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

  export type NotEqual<
    instruction extends INotEqual, // unused
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
            TypeMath.NotEqual<b, a> extends true ? 1 : 0
          ],

          state
        >
      : never
  > = RESULT

  export type Or<
    instruction extends IOr, // unused
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
            TypeMath.BitwiseOr<b, a>
          ],

          state
        >
      : never
  > = RESULT

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
            TypeMath.Subtract<b, a>
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
      State.Stack.get<state> extends [
        ...infer remaining extends Entry[],
        infer address extends MemoryAddress,
        infer entry extends Entry,
      ]
      ? State.Stack.set<
          remaining,

          State.Memory.insert<

            TypeMath.Add<
              address,
              instruction['offset']
            >,

            entry,
            state
          >
        >
      : never
  > = RESULT

  export type Unreachable<
    instruction extends IUnreachable,
    state extends ProgramState,

    RESULT extends ProgramState =
      State.Instructions.push<
        { kind: 'Halt' },
        state
      >
  > = RESULT;

  export type Xor<
    instruction extends IXor, // unused
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
            TypeMath.BitwiseXor<b, a>
          ],

          state
        >
      : never
  > = RESULT
}
