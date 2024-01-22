import { ExecutionContext, ProgramState } from "./program.js"
import { Call as Apply, Numbers } from "hotscript"
import { Update } from "./update.js"
import { ModuleField } from "./module.js"

/** No.  I'm not a Java programmer.  The `I` prefixing is not hungarian notation, it's to prevent naming collisions.  That's all.  */

export type IAdd = {
  kind: "add"
}

export type ICall = {
  kind: "Call"

  /** a function identifier */
  id: string;
}

export type ILocalGet = {
  kind: "LocalGet"

  /** a local identifier */
  id: string
}

export type IConst = {
  kind: "Const"

  /** a constant value */
  value: number;
}

/** an item on the stack */
export type Entry = number;

export type Instruction = ILocalGet | IAdd | ICall

export namespace Instructions {

  /** this encapsulates I32Add, I64Add, F32Add, F64Add */
  export type Add<
    state extends ProgramState,
    instruction extends IAdd // unused
  > =
    state["stack"] extends [
      ...infer remaining extends number[],
      infer b extends number,
      infer a extends number
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

    _id extends instruction['id'] = instruction['id'],

    _func extends ModuleField.Func = state['module']['func'][_id],

  > = state["stack"] extends [
      ...infer remaining extends number[],
      // TEMPORARY HARDCODING. THIS IS WRONG.  need to pop off a variable number of arguments off the stack corresponds to the length of this func's `params` array.
      infer b extends number,
      infer a extends number
    ]
    ?
      // set the locals to have the values from the stack that we just popped off
      Update.ExecutionContext.set<

        // set the stack to have remaining values only
        Update.Stack.set<
        
          // add the instructions from this func onto the stack
          Update.Instructions.push<
            state,
            _func['instructions']
          >,

          remaining
        >,

        {
          locals: {
            // TEMPORARY HARDCODING. THIS IS WRONG.  It needs to grab names from the params.
            ['a']: a;
            ['b']: b;
          }
        }
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
}
