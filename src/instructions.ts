import { ProgramState, evaluate } from "./program.js"
import { Call as Apply, Numbers } from "hotscript"
import { State } from "./update.js"
import { ModuleField, Param } from "./module.js"
import { MemoryAddress } from "./memory.js"
import { Cast } from "./utils.js"

/*
target for running c-add

DONE
{
  "LocalGet": 14,
  "I32Const": 8,
  "GlobalGet": 7,
  "LocalSet": 6,
  "GlobalSet": 4,
  "I32Sub": 3,
  "Call": 2,
  "I32Add": 2,
  "I32Store": 2,
  "I32Load": 2,
  "I32Eqz": 1,
  "Return": 1,
  "LocalTee": 1,
}

REMAINING
{
  "I32And": 2,
  "Block": 1,
  "BrIf": 1,
  "End": 1,
}
*/

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

export type ICall = {
  kind: "Call"

  /** a function identifier */
  id: string;
}

export type IConst = {
  kind: "Const"

  /** a constant value */
  value: number;
}

export type IElse = {
  kind: "Else"
}

export type IEnd = {
  kind: "End"
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
  | ICall
  | IConst
  | IElse
  | IEnd
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
  | IStore
  | ISubtract


export type selectInstruction<
  state extends ProgramState,
  instruction extends Instruction
> =
  instruction extends IAdd
  ? Instructions.Add<state, instruction>
  
  : instruction extends ICall
  ? Instructions.Call<state, instruction>

  : instruction extends IConst
  ? Instructions.Const<state, instruction>

  : instruction extends IElse
  ? Instructions.Else<state, instruction>

  : instruction extends IEnd
  ? Instructions.End<state, instruction>

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
    state["stack"] extends [
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

  export type Else<
    state extends ProgramState,
    instruction extends IElse // unused
  > = state; // TODO

  export type End<
    state extends ProgramState,
    instruction extends IEnd // unused
  > = state; // TODO


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
    ? state["stack"] extends [
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

    _func extends ModuleField.Func = state['module']['func'][instruction['id']],
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
    state["stack"] extends [
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
    state["stack"] extends [
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
    _id extends string = instruction['id'],
  > =
    State.Stack.push<
      state,
      state['module']['globals'][_id]
    >

  export type GlobalSet<
    state extends ProgramState,
    instruction extends IGlobalSet,
  > =
    state['stack'] extends [
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
    state["stack"] extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry,
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
    state["stack"] extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry,
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
    state["stack"] extends [
      ...infer remaining extends Entry[],
      infer condition extends Entry,
    ]
    ? condition extends 0

      // false branch
      ? never

      // true branch
      : never
    : never

  export type LessThan<
    state extends ProgramState,
    instruction extends ILessThan // unused
  > =
    state["stack"] extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry,
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
    state["stack"] extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry,
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
    state["stack"] extends [
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
    state["stack"] extends [
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

  export type Subtract<
    state extends ProgramState,
    instruction extends ISubtract // unused
  > =
    state["stack"] extends [
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
