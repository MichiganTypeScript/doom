import type { funcs } from "../../doom/doom";

import { executeInstruction } from "../../../wasm-to-typescript-types/program";
import { ExpectedMemory, PointerBinary32 } from "./memory";
import { evaluate } from "ts-type-math";
import { MeetYourDoom } from "./process-frame";
import { Expect, Equal } from "type-testing";
import { ExpectedFrame } from "./expected-frame";
import { Result } from './result-15895321';

/** This simulates the expected state when the program completes... err.. well.. one instruction before it completes */
export type HolyShitIfThisActuallyWorksOMGOMGROFLWHATISWRONGWITHME = {
	count: 9000;
	results: null;
	stack: ["00000000000001100000000100001000"];
	instructions: [
		{ kind: "EndFunction"; id: "$entry" }, // just one little instruction left
	];
	activeLocals: {};
	activeFuncId: "$entry";
	activeBranches: {};
	activeStackDepth: 0;
	globals: {};
	L1Cache: Result['L1Cache'];
	memory: Result['memory'];
	garbageCollection: 100;
	indirect: {};
	memorySize: "00000000000000000000000000000110";
	executionContexts: [];
	funcs: funcs;
	callHistory: [];
};

/** finalize */
export type HoldOntoYourMonadsAndBraceForImpact = executeInstruction<HolyShitIfThisActuallyWorksOMGOMGROFLWHATISWRONGWITHME, true, 9001>;

/** pass the machine state to `MeetYourDoom` to get a frame */
export type ActualFrame = MeetYourDoom<HoldOntoYourMonadsAndBraceForImpact>;

/** if this test passes, it worked! */
// export type DidItActuallyWorkTho = Expect<Equal<ActualFrame, ExpectedFrame>>;
