import { Call, Numbers } from 'hotscript'


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

type Block = {
  kind: "block"
  label: string
  statements: Statement[]
}

type Statement = Block | {
  kind: "push" 
  args: unknown
} | {
  kind: "pop"
}

type runProgram<input extends ProgramInput> = loop<input & { stack: [];  blocks: []}>

type updateState<
  s extends ProgramState,
  k extends keyof ProgramState,
  v extends ProgramState[k]
> =
  Omit<s, k> & {[_ in k]: v}

type loop<s extends ProgramState> =
  s["statements"] extends [infer head extends Statement, ...infer tail extends Statement[]]
  ? execute<updateState<s, "statements", tail>, head>
  : s

type tail<t extends readonly number[]> =
  t extends [unknown, ...infer tail extends number[]]
  ? tail
  : never

type execute<s extends ProgramState, statement extends Statement> =
  statement["kind"] extends "pop"
  ? updateState<s, "stack", tail<s["stack"]>>
  : statement["kind"] extends "block"
    ? {}
    : never

// type branch<
//   $x extends number,
//   RESULT =
//     (Numbers.Equal<$x, 0>> extends true ? 1 : 0) extends 1
//     ? 42
//     : (Call<Numbers.Equal<$x, 1>> extends true ? 1 : 0) extends 1
//       ? 99
//       : 7
// > = RESULT

/*
function foo(x) {
  if (x === 0) return 7
  if (x === 1) return 42;
  return 99
}
*/

type runInstructions = {}

type $foo<
  $x extends number,
  RESULT =
    (Call<Numbers.Equal<$x, 0>> extends true ? 1 : 0) extends 1
    ? 42
    : (Call<Numbers.Equal<$x, 1>> extends true ? 1 : 0) extends 1
      ? 99
      : 7
> = RESULT
