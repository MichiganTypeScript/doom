import { Equal, Expect } from "type-testing"
import { ProgramState } from "./types"
import { State } from './state'
import type { Satisfies } from 'ts-type-math'
import { executeInstruction } from "./program"


// end-to-end test for garbage collection

type actual1022 = Satisfies<ProgramState, {
  count: 1022;
  result: null;
  stack: ["00000000000000000000010000000001", "00000000000000000000000000000000"];
  instructions: [
    {
      kind: "Store";
      subkind: "I32Store8";
      offset: "00000000000000000000000000000000";
    },
    { kind: 'Const'; value: '10000000000000000000000000000000' },
    { kind: 'Nop', ziltoid: 'theOmniscient' },
  ];
  activeFuncId: "";
  activeBranches: {};
  activeLocals: {};
  globals: {};
  memory: {
      "00000000000000000000010000000000": "01000001";
  };
  garbageCollection: 1022;
  indirect: [];
  memorySize: "";
  executionContexts: [];
  funcs: {};
}>

type actual1023 = executeInstruction<actual1022, true, 1023>
type expected1023 = Satisfies<ProgramState, {
  count: 1023;
  result: null;
  stack: [];
  instructions: [
    { kind: 'Const'; value: '10000000000000000000000000000000' },
    { kind: 'Nop', ziltoid: 'theOmniscient' },
  ];
  activeFuncId: "";
  activeBranches: {};
  activeLocals: {};
  globals: {};
  memory: {
      "00000000000000000000010000000000": "01000001";
      "00000000000000000000010000000001": "00000000";
  };
  garbageCollection: 1023;
  indirect: [];
  memorySize: "";
  executionContexts: [];
  funcs: {};
}>
type test1023 = Expect<Equal<actual1023, expected1023>>

type actual1024 = executeInstruction<actual1023, true, 1024>
type expected1024 = Satisfies<ProgramState, {
  count: 1024;
  result: null;
  stack: ['10000000000000000000000000000000'];
  instructions: [
    { kind: 'Nop', ziltoid: 'theOmniscient' },
  ];
  activeFuncId: "";
  activeBranches: {};
  activeLocals: {};
  globals: {};
  memory: {
      "00000000000000000000010000000000": "01000001";
  };
  garbageCollection: 0;
  indirect: [];
  memorySize: "";
  executionContexts: [];
  funcs: {};
}>
type test1024 = Expect<Equal<actual1024, expected1024>>

type actual1025 = executeInstruction<actual1024, true, 1025>
type expected1025 = Satisfies<ProgramState, {
  count: 1025;
  result: null;
  stack: ['10000000000000000000000000000000'];
  instructions: [];
  activeFuncId: "";
  activeBranches: {};
  activeLocals: {};
  globals: {};
  memory: {
      "00000000000000000000010000000000": "01000001";
  };
  garbageCollection: 1;
  indirect: [];
  memorySize: "";
  executionContexts: [];
  funcs: {};
}>
type test1025 = Expect<Equal<actual1025, expected1025>>