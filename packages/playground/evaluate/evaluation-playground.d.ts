import type { entry } from "conformance-tests/from-wat/memory.actual.d.ts";
// 1900ms
type e = entry<[2]>; // =>


// import type { e } from '../add/add.d.ts';


// import type { entry } from "conformance-tests/from-c/conway.actual.d.ts";
// type e = entry<[0]>; // =>?


// import type { ReadMemory } from "ts-type-math";
// export type Evaluate = ReadMemory<e> // =>


// type e = 1;


export type Evaluate = e // =>
