import { Equal, Expect } from "type-testing"
import { ProgramState } from "./types"
import { State } from './state'

type blankProgram = Satisfies<ProgramState, {
  funcs: {
    $entry: {
      kind: 'func'
      params: []
      paramsTypes: []
      result: 'i32'
      locals: []
      instructions: []
    }
  }
  stack: ['00000000000000000000000000000011']
  globals: {}
  executionContexts: []
  activeLocals: {}
  activeFuncId: "root"
  activeBranches: {}
  memory: {}
  memorySize: '00000000000000000000000000000001'
  indirect: []
  count: 0
  instructions: []
  result: null
}>

type PatchProgramState<
  patch extends Partial<ProgramState>
> =
  & Omit<blankProgram, keyof patch>
  & patch

type testResult = [
  Expect<Equal<
    State.Result.get<PatchProgramState<{}>>,
    null
  >>,
  Expect<Equal<
    State.Result.set<blankProgram>['result'],
    3
  >>,
]