import { Expect, Equal } from 'type-testing';
import type { main } from "./negate.actual.d.ts";

type testCases = [
  Expect<Equal<main, -10>>,
  
  // @ts-expect-error
  Expect<Equal<main, 6>>,
]
