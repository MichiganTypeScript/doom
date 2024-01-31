import type { ProgramState } from "../types.d.ts"
import type { State } from '../state.d.ts'
import type { ArithmeticInstruction, HandleArithmeticInstructions } from "./arithmetic.d.ts"
import type { BitwiseInstruction, HandleBitwiseInstructions } from "./bitwise.d.ts"
import type { HandleComparisonInstruction, ComparisonInstruction } from "./comparison.d.ts"
import type { HandleConstInstruction, ConstInstruction } from "./const.d.ts"
import type { ControlFlowInstruction, HandleControlFlowInstructions } from "./control-flow.d.ts"
import type { FloatingPointInstruction, HandleFloatingPointInstructions } from "./floating-point.d.ts"
import type { HandleMemoryInstructions, MemoryInstruction } from "./memory.ts"
import type { HandleSyntheticInstructions, SyntheticInstruction } from "./synthetic.ts"
import type { HandleVariableInstructions, VariableInstruction } from "./variable.ts"

export type Instruction =
  | ConstInstruction
  | ComparisonInstruction
  | ArithmeticInstruction
  | FloatingPointInstruction
  | BitwiseInstruction
  | VariableInstruction
  | MemoryInstruction
  | ControlFlowInstruction
  | SyntheticInstruction

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
  instruction extends ConstInstruction
  ? HandleConstInstruction<instruction, state>

  : instruction extends ComparisonInstruction
  ? HandleComparisonInstruction<instruction, state>

  : instruction extends ArithmeticInstruction
  ? HandleArithmeticInstructions<instruction, state>

  : instruction extends FloatingPointInstruction
  ? HandleFloatingPointInstructions<instruction, state>

  : instruction extends BitwiseInstruction
  ? HandleBitwiseInstructions<instruction, state>

  : instruction extends VariableInstruction
  ? HandleVariableInstructions<instruction, state>

  : instruction extends MemoryInstruction
  ? HandleMemoryInstructions<instruction, state>

  : instruction extends ControlFlowInstruction
  ? HandleControlFlowInstructions<instruction, state>

  : instruction extends SyntheticInstruction
  ? HandleSyntheticInstructions<instruction, state>

  // Global Fallback
  : State.Error<
      instruction,
      'unrecognized instruction',
      state
    >
