import type { entry } from './test/from-wat/if-else-nested.actual.js';
import { State } from './state.js';
type e = entry<[10, 1], true> // =>

type stack = e['stack']; // =>

type executionContexts = e['executionContexts'];
type c0f = executionContexts[0]['funcId']; // =>
type c0l = executionContexts[0]['locals']; // =>
type c0m = executionContexts[0]['masks'];  // =>

type c1f = executionContexts[1]['funcId']; // =>
type c1l = executionContexts[1]['locals']; // =>
type c1m = executionContexts[1]['masks'];  // =>

type c2f = executionContexts[2]['funcId']; // =>
type c2l = executionContexts[2]['locals']; // =>
type c2m = executionContexts[2]['masks'];  // =>

type c3 = executionContexts[3]; // =>
type c4 = executionContexts[4]; // =>
type c5 = executionContexts[5]; // =>

type memory = e['memory'];
//   ^?

type instructions = e['instructions']; // =>
type instruction = State.Instructions.Active.get<e>; // =>
