import { Expect, Equal } from 'type-testing';
import type { selectFalse, selectTrue } from "./select.actual.d.ts";

type testCases = [
  Expect<Equal<selectTrue, 20>>,
  Expect<Equal<selectFalse, 10>>,
]
