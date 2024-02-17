// type e = 1;
// import type { entry } from "conformance-tests/from-wat/memory.actual.d.ts";
// type e = entry<[2]>; // =>

import type { e } from '../add/add';
// type e = entry<[97, 10], true>; // =>


// import type { entry } from "conformance-tests/from-c/conway.actual.d.ts";
// type e = entry<[0]>; // =>


// import type { ReadMemory } from "ts-type-math";
// export type Evaluate = ReadMemory<e> // =>

export type Evaluate = e // =>
