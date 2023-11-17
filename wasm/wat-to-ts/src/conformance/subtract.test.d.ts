import { Expect, Equal } from 'type-testing';
import type { ziltoid } from "./subtract.actual.d.ts";

type testCases = [
  Expect<Equal<ziltoid, 7>>,
  
  // @ts-expect-error
  Expect<Equal<ziltoid, 6>>,
]
