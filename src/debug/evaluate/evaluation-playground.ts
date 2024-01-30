
import { entry } from "../../test/from-c/hello-world.actual.js";
import { ReadMemory } from "../../ts-type-math/store.js";

type e = entry<[3], true>; // =>

export type Evaluate = ReadMemory<e> // =>
