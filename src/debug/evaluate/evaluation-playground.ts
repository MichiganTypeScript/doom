
import { entry } from "../../test/from-c/uppercase.actual.js";
import { ReadMemory } from "../../ts-type-math/store.js";

type e = entry<[97], true>; // =>

// export type Evaluate = ReadMemory<e> // =>
export type Evaluate = e // =>
