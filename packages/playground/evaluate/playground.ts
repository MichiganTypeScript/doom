import { executeInstruction } from '../../wasm-to-typescript-types/program'

import type { entry } from "conformance-tests/from-c/conway"
type e0000 = entry<[0], true, 0>

// type e0050 = executeInstruction<e0000, true, 50>;
// type e0100 = executeInstruction<e0050, true, 100>;
// type e0150 = executeInstruction<e0100, true, 150>;
// type e0200 = executeInstruction<e0150, true, 200>;
// type e0250 = executeInstruction<e0200, true, 250>;
// type e0300 = executeInstruction<e0250, true, 300>;
// type e0350 = executeInstruction<e0300, true, 350>;
// type e0400 = executeInstruction<e0350, true, 400>;
// type e0450 = executeInstruction<e0400, true, 450>;
// type e0500 = executeInstruction<e0450, true, 500>;
// type e0550 = executeInstruction<e0500, true, 550>;
// type e0600 = executeInstruction<e0550, true, 600>;
// type e0650 = executeInstruction<e0600, true, 650>;
// type e0700 = executeInstruction<e0650, true, 700>;
// type e0750 = executeInstruction<e0700, true, 750>;
// type e0800 = executeInstruction<e0750, true, 800>;
// type e0850 = executeInstruction<e0800, true, 850>;
// type e0900 = executeInstruction<e0850, true, 900>;
// type e0950 = executeInstruction<e0900, true, 950>;
// type e1000 = executeInstruction<e0950, true, 1000>;

export type Evaluate = e0000 // =>
