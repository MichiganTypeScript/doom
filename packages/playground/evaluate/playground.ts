// type e = 1;

// import type { entry } from "conformance-tests/from-c/conway.actual";
// type e = entry<[2]>;

// import type { e } from '../add/add';
// type e = entry<[97, 10], true>

import type { entry } from "conformance-tests/from-wat/add.actual";
type e = entry<[1, 2]>

// import type { entry } from "conformance-tests/from-c/conway.actual";
// type e = entry<[0]>


// import type { ReadStringFromMemory } from "ts-type-math";
// import type { entry } from "conformance-tests/from-c/uppercase.actual";
// export type e = ReadStringFromMemory<entry<[97], true>>

export type Evaluate = e // =>
