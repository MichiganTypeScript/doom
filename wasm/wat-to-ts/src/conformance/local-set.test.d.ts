import { Expect, Equal } from 'type-testing';
import type { main } from "./local-set.actual.d.ts";

type testCases = [
  Expect<Equal<main, 11>>,
  
  // @ts-expect-error
  Expect<Equal<main, 6>>,
]
