import type { get42Plus1 } from "./call.actual.d.ts";
import { Expect, Equal } from "type-testing";

type testCases = [
  Expect<Equal<get42Plus1, 43>>,
]
