import type { entry } from './test/from-wat/globals.actual.js';
import { State } from './state.js';
type e = entry<[], true> // =>

type stack = e['stack']; // =>

type ec = e['executionContexts'];
type c0f = ec[0]['funcId']; // =>
type c0l = ec[0]['locals']; // =>
type c0b = ec[0]['branches'];  // =>

type c1f = ec[1]['funcId']; // =>
type c1l = ec[1]['locals']; // =>
type c1b = ec[1]['branches'];  // =>

type c3 = ec[2]; // =>
type c4 = ec[3]; // =>

type memory = e['memory'];
//   ^?

type i = e['instructions']; // =>
type a = State.Instructions.Active.get<e>; // =>
type i0 = e['instructions'][0]; // =>
type i1 = e['instructions'][1]; // =>
type i2 = e['instructions'][2]; // =>
type i3 = e['instructions'][3]; // =>
type i4 = e['instructions'][4]; // =>
type i5 = e['instructions'][5]; // =>

type g = e['globals']; // =>
