import { entry } from "./from-wat/add.actual.js";
import { ReadMemory } from "ts-type-math";

// type e = entry<[97, 10], true>; // =>
type e = entry<[973, 13]>; // =>

// export type Evaluate = ReadMemory<e> // =>
export type Evaluate = e // =>
