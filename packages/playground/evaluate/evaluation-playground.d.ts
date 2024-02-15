// import type { entry } from "conformance-tests/from-c/conway.actual.d.ts";
import type { ReadMemory } from "ts-type-math";

import type { e } from '../add/add.d.ts';

// type e = entry<[97, 10], true>; // =>
// type e = entry<[0]>; // =>

// export type Evaluate = ReadMemory<e> // =>
export type Evaluate = e // =>
