import type { funcs } from "conformance-tests/from-c/memory-stress"
import type { entry } from "conformance-tests/from-c/memory-stress"
type e0000 = entry<[1000], true, 0>

export type Evaluate = e0000 // =>
