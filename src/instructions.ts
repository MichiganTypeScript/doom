import { ProgramState, evaluate } from "./program.js"
import { Call as Apply, Numbers } from "hotscript"
import { Update } from "./update.js"
import { ModuleField, Param } from "./module.js"

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
  "I32Store": 2, // in progress
  "I32Load": 2, // in progress
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

export type ILoad = {
  kind: "Load"

  align: number;

  offset: number;
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
  | IEqualsZero
  | IGlobalGet
  | IGlobalSet
  | ILoad
  | ILocalGet
  | ILocalSet
  | ILocalTee
  | IMultiply
  | IReturn
  | ISubtract
  | IStore


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

  : instruction extends IEqualsZero
  ? Instructions.EqualsZero<state, instruction>

  : instruction extends IGlobalGet
  ? Instructions.GlobalGet<state, instruction>

  : instruction extends IGlobalSet
  ? Instructions.GlobalSet<state, instruction>

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

  : instruction extends IReturn
  ? Instructions.Return<state, instruction>

  : instruction extends ISubtract
  ? Instructions.Subtract<state, instruction>

  : instruction extends IStore
  ? Instructions.Store<state, instruction>

  : 'you forgot to handle an instruction'


/** this functions purpose in life is to pop items off the stack according to a function's params and add them as locals */
type PopulateParams<
  state extends ProgramState,
  params extends Param[],
> =
  // HELP: params are fed in reverse order and simply switching the infer statements order below for some reason doesn't work...
  Reverse<params> extends [
    infer param extends Param,
    ...infer remainingParams extends Param[],
  ]
  ? state["stack"] extends [
      ...infer remainingStack extends Entry[],
      infer pop extends Entry
    ]
    ? PopulateParams<
        // set the locals to have the values from the stack that we just popped off
        Update.ExecutionContext.updateActive<
          
          // set the stack to have remaining values only
          Update.Stack.set<state, remainingStack>,

          {
            locals: { [p in param]: pop }
          }
        >,

        remainingParams
      >
    : never // should never happen because the stack should always have at least as many items as there are params
  : state // no more params, so we can jump out

export namespace Instructions {

  export type Add<
    state extends ProgramState,
    instruction extends IAdd // unused
  > =
    state["stack"] extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry
    ]
    ? Update.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.Add<a, b>>
        ]
      >
    : never

  export type Call<
    state extends ProgramState,
    instruction extends ICall,

    _func extends ModuleField.Func = state['module']['func'][instruction['id']],
  > =
    // add the instructions from this func onto the stack
    Update.Instructions.push<

      // first, pop things off the stack to populate params
      PopulateParams<
        state,
        _func['params']
      >,

      _func['instructions']
    >

  export type Const<
    state extends ProgramState,
    instruction extends IConst,
  > =
    Update.Stack.push<
      state,
      instruction['value']
    >

    export type EqualsZero<
    state extends ProgramState,
    instruction extends IEqualsZero // unused
  > =
    state["stack"] extends [
      ...infer remaining extends Entry[],
      infer a extends Entry
    ]
    ? Update.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.Equal<a, 0>> extends true ? 1 : 0
        ]
      >
    : never


  export type GlobalGet<
    state extends ProgramState,
    instruction extends IGlobalGet,
    _id extends string = instruction['id'],
  > =
    Update.Stack.push<
      state,
      state['module']['globals'][_id]
    >

  export type GlobalSet<
    state extends ProgramState,
    instruction extends IGlobalSet,
  > =
    state['stack'] extends [
      ...infer remaining extends Entry[],
      infer a extends Entry
    ]
    ? Update.Stack.set<
        Update.Globals.insert<
          state,
          Record<instruction['id'], a>
        >,
        remaining
      >
    : never

  export type Load<
    state extends ProgramState,
    instruction extends ILoad,
  > =
    state['stack'] extends [
      ...infer remaining extends Entry[],
      infer index extends Entry,
      infer value extends Entry,
    ]
    ? Update.Memory.set<
        state,
        index,
        value
      >
    : never

  export type LocalGet<
    state extends ProgramState,
    instruction extends ILocalGet,
  > =
    Update.Stack.push<
      state,
      state['executionContext']['locals'][instruction['id']]
    >

  export type LocalSet<
    state extends ProgramState,
    instruction extends ILocalSet,
  > =
    state['stack'] extends [
      ...infer remaining extends Entry[],
      infer a extends Entry
    ]
    ? Update.Stack.set<
        Update.ExecutionContext.set<
          state,
          {
            locals: evaluate<
              & Omit<state['executionContext']['locals'], instruction['id']>
              & Record<instruction['id'], a>
            >
          }
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
      infer a extends Entry
    ]
    ? Update.ExecutionContext.set<
        state,
        {
          locals: evaluate<
            & Omit<state['executionContext']['locals'], instruction['id']>
            & Record<instruction['id'], a>
          >
        }
      >
    : never

    export type Multiply<
    state extends ProgramState,
    instruction extends IMultiply // unused
  > =
    state["stack"] extends [
      ...infer remaining extends Entry[],
      infer b extends Entry,
      infer a extends Entry
    ]
    ? Update.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.Mul<a, b>>
        ]
      >
    : never

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
    ? Update.Stack.set<
        state,
        _stack
      >
    : state['stack'] extends [
        ...infer remaining extends Entry[],
        infer pop extends Entry
      ]
      ? Return<
          Update.Stack.set<
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
      infer a extends Entry
    ]
    ? Update.Stack.set<
        state,
        [
          ...remaining,
          Apply<Numbers.Sub<b, a>>
        ]
      >
    : never

  export type Store<
    state extends ProgramState,
    instruction extends IStore,
  > =
    state // TODO
    // state['stack'] extends [
    //   ...infer remaining extends Entry[],
    //   infer a extends Entry
    // ]
    // ? Update.Stack.set<
    //     Update.ExecutionContext.set<
    //       state,
    //       {
    //         locals: evaluate<
    //           & Omit<state['executionContext']['locals'], instruction['id']>
    //           & Record<instruction['id'], a>
    //         >
    //       }
    //     >,
    //     remaining
    //   >
    // : never
}
