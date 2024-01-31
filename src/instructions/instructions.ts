import { ProgramState } from "../program.js"
import { State } from "../state.js"
import { ArithmeticInstruction, HandleArithmeticInstructions } from "./arithmetic.js"
import { BitwiseInstruction, HandleBitwiseInstructions } from "./bitwise.js"
import { HandleComparisonInstruction, ComparisonInstruction } from "./comparison.js"
import { HandleConstInstruction, ConstInstruction } from "./const.js"
import { ControlFlowInstruction, HandleControlFlowInstructions } from "./control-flow.js"
import { FloatingPointInstruction, HandleFloatingPointInstructions } from "./floating-point.js"
import { HandleMemoryInstructions, MemoryInstruction } from "./memory.js"
import { HandleSyntheticInstructions, SyntheticInstruction } from "./synthetic.js"
import { HandleVariableInstructions, VariableInstruction } from "./variable.js"

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
  : State.Instructions.push<
      {
        kind: 'Halt',
        instruction: instruction,
        reason: 'unrecognized instruction'
      },
      state
    >
