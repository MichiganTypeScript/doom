import type { Instruction, selectInstruction } from "./instructions/instructions"
import type { IHalt } from "./instructions/synthetic"
import type { State } from "./state"
import type { ProgramInput, ProgramState, evaluate } from "./types"

// set to `number` to disable
export type StopAt = number

export type runProgram<
  input extends ProgramInput,
  debugMode extends boolean = false,
> =
  executeInstruction<
    {
      activeExecutionContext: {
        locals: {};
        funcId: "root";
        branches: {};
      };
      count: 0;
      executionContexts: [];
      funcs: input['funcs'];
      globals: input['globals'];
      indirect: input['indirect'];
      instructions: [
        { kind: "Call", id: "$entry" }
      ];

      // copy readonly memory into memory registers
      memory: input['memory'];
      memorySize: input['memorySize'];

      // since the stack is a stack, we need to reverse it
      stack: input['arguments'];
    },
    debugMode
  >

export type executeInstruction<
  state extends ProgramState,
  debugMode extends boolean = false,
> =
  state["instructions"] extends [
    infer instruction extends Instruction,
    ...infer remainingInstructions extends Instruction[]
  ]

  // `Halt` is a special instruction that tells the program to stop for debugging
  ? instruction extends IHalt
    ? state

    : StopAt extends State.Count.get<state>
    ? state
    : executeInstruction<
        selectInstruction<

          // increment the instruction counter
          State.Count.increment<state>,
          
          remainingInstructions,
          instruction
        >,
        debugMode
      >

  // program execution is complete.  yay.
  // this is the base case of the main loop's recursion
  : debugMode extends true
    ? evaluate<state>
    : evaluate<state>['stack'][0]
