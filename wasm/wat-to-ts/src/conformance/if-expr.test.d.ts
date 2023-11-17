import { Expect, Equal } from 'type-testing';
import type { ifexpr } from "./if-expr.actual.d.ts";

type testCases = [
  Expect<Equal<ifexpr<10, 2>, 11>>,
  Expect<Equal<ifexpr<10, 1>, 11>>,
  Expect<Equal<ifexpr<10, 0>, 11>>,
  Expect<Equal<ifexpr<10, -1>, 9>>,
  Expect<Equal<ifexpr<10, -2>, 9>>,
]
