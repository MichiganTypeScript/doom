import type { entry } from "./from-wat/add.actual.d.ts";
import type { ReadMemory } from "ts-type-math";

// type e = entry<[97, 10], true>; // =>
type e = entry<[973, 13]>; // =>

// export type Evaluate = ReadMemory<e> // =>
export type Evaluate = e // =>
