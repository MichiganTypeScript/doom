import { Call, Numbers } from 'hotscript'
import { Equal, Expect } from 'type-testing'

type Block = {
  kind: "block"
  label: string
  statements: Statement[]
}

type Push = {
  kind: "push" 
  args: unknown
}

type Pop = {
  kind: "pop"
}

type Statement = Block | Push | Pop;

type ProgramInput = {
  input: unknown[]
  statements: Statement[];
};

type ProgramState = {
  input: unknown[]
  
  statements: Statement[];

  // starts empty, when you enter a new block, push the current program state onto this stack
  // create a new state from that block=> replace statements with whatever statements were nested inside that block
  // then recurse and execute all of those. when your list of statements is empty, check if there are any previous states
  // from blocks that have not been closed and close the next block
  blocks: ProgramState[]
  
  // when you encounter a break statement, set this to be string
  // when you are exiting a block, check if skipToLabel is a string and if the next block on the stack has
  // a label matching that string. If it does not, pop blocks until it does (this would skip any remaining unexecuted statements
  // in the blocks that were on the stack) 
  skipToLabel: string | undefined
  
  stack: number[]
}


type runProgram<
  input extends ProgramInput
> =
  loop<input & {
    input: [];
    statements: [];
    blocks: [];
    skipToLabel: undefined;
    stack: []; 
 }>

type updateState<
  state extends ProgramState,
  keys extends keyof ProgramState,
  values extends ProgramState[keys]
> =
  Omit<state, keys> & {[_ in keys]: values}

type loop<s extends ProgramState> =
  s["statements"] extends [
    infer head extends Statement,
    ...infer tail extends Statement[]
  ]
  ? execute<
      updateState<
        s,
        "statements",
        tail
      >,
      head
    >
  : s

type tail<t extends readonly number[]> =
  t extends [unknown, ...infer tail extends number[]]
  ? tail
  : never

type execute<
  state extends ProgramState,
  statement extends Statement
> =
  statement["kind"] extends "pop"
  ? updateState<state, "stack", tail<state["stack"]>>
  : statement["kind"] extends "block"
    ? {}
    : never

// how does this part work?
type runInstructions = {}


//////////////////////////
/////// PLAYGROUND ///////
//////////////////////////

type $add<
  $a extends number,
  $b extends number,
  RESULT extends number =
    Call<Numbers.Add<
      $a,
      $b
    >>
> = RESULT

/* how can this be rewritten so it passes the tests? */
type add<a extends number, b extends number> = $add<a, b>;

/* so like:
1. push a onto the stack
2. push b onto the stack
3. pop a and b off the stack and pass to an `add` function
4. `add` pushes its result onto the stack
5. the function returns the (single value) on the stack
*/

type testCases = [
  Expect<Equal<add<2, 2>, 4>>,
  Expect<Equal<add<1, 2>, 3>>,
  Expect<Equal<add<0, 2>, 2>>,
  Expect<Equal<add<-1, 2>, 1>>,
  Expect<Equal<add<-2, 2>, 0>>,
  Expect<Equal<add<-3, -3>, -6>>,
]
