import type { entry } from './test/from-wat/andarist.actual.js';
import { State } from './state.js';
type e = entry<[-5], true> // =>

type stack = e['stack']; // =>

type ec = e['executionContexts'];
type c0f = ec[0]['funcId'];       // =>
type c0l = ec[0]['locals'];       // =>
type c0m = ec[0]['masks'];        // =>
type c0i = ec[0]['instructions']; // =>

type c1f = ec[1]['funcId'];       // =>
type c1l = ec[1]['locals'];       // =>
type c1m = ec[1]['masks'];        // =>
type c1i = ec[1]['instructions']; // =>

// type c2f = ec[2]['funcId'];       // =>
// type c2l = ec[2]['locals'];       // =>
// type c2m = ec[2]['masks'];        // =>
// type c2i = ec[2]['instructions']; // =>

// type c3 = ec[3]; // =>
// type c4 = ec[4]; // =>
// type c5 = ec[5]; // =>

type memory = e['memory'];
//   ^?
