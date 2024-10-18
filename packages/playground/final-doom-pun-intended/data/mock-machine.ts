import type { funcs } from "../../doom/doom";

import { executeInstruction } from "../../../wasm-to-typescript-types/program";
import { ExpectedMemory, PointerBinary32 } from "./memory";
import { evaluate } from "ts-type-math";
import { MeetYourDoom } from "./process-frame";

export type HolyShitIfThisActuallyWorksOMGOMGROFLWHATISWRONGWITHME = {
	count: 9000;
	results: null;
	stack: [PointerBinary32];
	instructions: [
		{ kind: "EndFunction"; id: "$entry" }, // just one little function left
	];
	activeLocals: {};
	activeFuncId: "$entry";
	activeBranches: {};
	activeStackDepth: 0;
	globals: {};
	memory: evaluate<ExpectedMemory>;
	garbageCollection: 100;
	indirect: [];
	memorySize: "00000000000000000000000000000110";
	executionContexts: [];
	funcs: funcs;
};
export type HoldOntoYourMonadsAndBraceForImpact = executeInstruction<HolyShitIfThisActuallyWorksOMGOMGROFLWHATISWRONGWITHME, true, 9001>;
export type ActualFrame = MeetYourDoom<HoldOntoYourMonadsAndBraceForImpact>;


