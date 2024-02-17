import { Equal, Expect } from "type-testing"
import type { HexAdd } from './hex-add';

const t = [
  { a: "0", b: "1", e: "1" },
  { a: "1", b: "1", e: "2" },
  { a: "2", b: "1", e: "3" },
  { a: "3", b: "1", e: "4" },
  { a: "4", b: "1", e: "5" },
  { a: "5", b: "1", e: "6" },
  { a: "6", b: "1", e: "7" },
  { a: "7", b: "1", e: "8" },
  { a: "8", b: "1", e: "9" },
  // { a: "9", b: "1", e: "a" },
  // { a: "a", b: "1", e: "b" },
  // { a: "b", b: "1", e: "c" },
  // { a: "c", b: "1", e: "d" },
  // { a: "d", b: "1", e: "e" },
  // { a: "e", b: "1", e: "f" },
  // { a: "f", b: "1", e: "10" },
] as const;

type T = typeof t;

type hexAddTests = [
  Expect<Equal<HexAdd<T[ 0]['a'], T[ 0]['b']>, T[ 0]['e']>>,
  Expect<Equal<HexAdd<T[ 1]['a'], T[ 1]['b']>, T[ 1]['e']>>,
  Expect<Equal<HexAdd<T[ 2]['a'], T[ 2]['b']>, T[ 2]['e']>>,
  Expect<Equal<HexAdd<T[ 3]['a'], T[ 3]['b']>, T[ 3]['e']>>,
  Expect<Equal<HexAdd<T[ 4]['a'], T[ 4]['b']>, T[ 4]['e']>>,
  Expect<Equal<HexAdd<T[ 5]['a'], T[ 5]['b']>, T[ 5]['e']>>,
  Expect<Equal<HexAdd<T[ 6]['a'], T[ 6]['b']>, T[ 6]['e']>>,
  Expect<Equal<HexAdd<T[ 7]['a'], T[ 7]['b']>, T[ 7]['e']>>,
  Expect<Equal<HexAdd<T[ 8]['a'], T[ 8]['b']>, T[ 8]['e']>>,
  Expect<Equal<HexAdd<T[ 9]['a'], T[ 9]['b']>, T[ 9]['e']>>,
  Expect<Equal<HexAdd<T[10]['a'], T[10]['b']>, T[10]['e']>>,
  Expect<Equal<HexAdd<T[11]['a'], T[11]['b']>, T[11]['e']>>,
  Expect<Equal<HexAdd<T[12]['a'], T[12]['b']>, T[12]['e']>>,
  Expect<Equal<HexAdd<T[13]['a'], T[13]['b']>, T[13]['e']>>,
  Expect<Equal<HexAdd<T[14]['a'], T[14]['b']>, T[14]['e']>>,
  Expect<Equal<HexAdd<T[15]['a'], T[15]['b']>, T[15]['e']>>,
]