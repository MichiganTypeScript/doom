import { PlaygroundResult } from './playground-result';
import { State } from '../../wasm-to-typescript-types/state'
import '../../../global';
import { Loop } from '../../wasm-to-typescript-types/instructions/control-flow';
import { executeInstruction } from '../../wasm-to-typescript-types/program';

type x = PlaygroundResult['instructions']['length']
//   ^?

type state = PlaygroundResult;
type instruction = state['instructions'][0]

type z = evaluate<State.ExecutionContexts.Active.Branches.get<state>>
//   ^?

export type e = executeInstruction<state, true, 1000>
//   ^?