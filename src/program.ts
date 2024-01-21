import { Entry, Instruction } from "./instructions.js"
import { loop } from "./update.js"

export type ProgramInput = {
  input: unknown[]
  instructions: Instruction[]
}

export type ProgramState = {
  input: unknown[]

  instructions: Instruction[]

  scope: Record<string, Instruction[]>

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

  stack: Entry[]
}

export type runProgram<input extends ProgramInput> = loop<
  input & {
      blocks: []
      skipToLabel: undefined
      scope: {}
      stack: []
  }
>