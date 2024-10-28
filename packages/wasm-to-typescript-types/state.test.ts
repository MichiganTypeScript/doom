import { Equal, Expect } from "type-testing"
import { ProgramState } from "./types"
import type { evaluate, Satisfies } from 'ts-type-math'
import { executeInstruction } from "./program"

type blank = Satisfies<ProgramState, {
  count: 0;
  results: [];
  stack: [];
  instructions: [];
  activeFuncId: "";
  activeBranches: {};
  activeStackDepth: 0;
  activeLocals: {};
  globals: {};
  L1Cache: {};
  memory: {};
  garbageCollection: 0;
  indirect: {};
  memorySize: "";
  executionContexts: [];
  funcs: {};
}>

type s<
  Update extends Partial<ProgramState>
> = Satisfies<ProgramState,
  evaluate<
    & Omit<
      blank,
      keyof Update
    >
    & Required<Update>
  >
>

// end-to-end test for garbage collection

type actual1023 = Satisfies<ProgramState, s<{
  count: 1023;
  instructions: [
    { kind: 'Nop', ziltoid: 'theOmniscient' },
    { kind: 'Nop', ziltoid: 'theOmniscient' },
  ];
  L1Cache: {
    "00000000000000000000000000000000": "00101110"; // will not change because it matches the source
    "00000000000000000000000000000001": "00000000"; // will clear the source value
    "00000000000000000000000000000011": "00000000"; // will never be set in the first place
    "00000000000000000000000000000100": "01010101"; // will append this new value because it's not false
    "00000000000000000000000000000101": "00000000"; // will skip because it's false
    "00000000000000000000000000000111": "00000010"; // will modify the source value
  }
  memory: {
    "00000000000000000000000000000000": "00101110"; // will keep because it hasn't changed
    "00000000000000000000000000000001": "11111111"; // will be removed because the update for this address is false
    "00000000000000000000000000000111": "00000001"; // will be modified by the update
    "11111111111111111111111100000011": "00000001"; // will keep because it's random other data only present in the source
  };
  garbageCollection: 1023;
}>>

type actual1025 = executeInstruction<actual1023, true, 1024>
type expected1025 = Satisfies<ProgramState, s<{
  count: 1024;
  instructions: [
    { kind: 'Nop', ziltoid: 'theOmniscient' },
  ];
  L1Cache: {};
  memory: {
    "00000000000000000000000000000000": "00101110"; // source and update match
  //"00000000000000000000000000000001": "11111111"; // the update cleared this value
    "00000000000000000000000000000100": "01010101"; // newly added by the update
    "00000000000000000000000000000111": "00000010"; // modified by the update
    "11111111111111111111111100000011": "00000001"; // the random other data only present in the source
  }
  garbageCollection: 0;
}>>
type test1025 = Expect<Equal<actual1025, expected1025>>
