import { Equal, Expect } from "type-testing"
import type { HexAdd } from './hex-add';
import { t, T } from './test-cases/hex-add';
import { expect, test } from 'vitest';

test.each(t)('$a + $b === $e', () => {
  t.forEach(({ a, b, e }) => {
    expect(parseInt(a, 16) + parseInt(b, 16)).toBe(parseInt(e, 16));
  });
})

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

  Expect<Equal<HexAdd<T[16]['a'], T[16]['b']>, T[16]['e']>>,
  Expect<Equal<HexAdd<T[17]['a'], T[17]['b']>, T[17]['e']>>,
  Expect<Equal<HexAdd<T[18]['a'], T[18]['b']>, T[18]['e']>>,
  Expect<Equal<HexAdd<T[19]['a'], T[19]['b']>, T[19]['e']>>,
  Expect<Equal<HexAdd<T[20]['a'], T[20]['b']>, T[20]['e']>>,
  Expect<Equal<HexAdd<T[21]['a'], T[21]['b']>, T[21]['e']>>,
  Expect<Equal<HexAdd<T[22]['a'], T[22]['b']>, T[22]['e']>>,
  Expect<Equal<HexAdd<T[23]['a'], T[23]['b']>, T[23]['e']>>,
  Expect<Equal<HexAdd<T[24]['a'], T[24]['b']>, T[24]['e']>>,
  Expect<Equal<HexAdd<T[25]['a'], T[25]['b']>, T[25]['e']>>,
  Expect<Equal<HexAdd<T[26]['a'], T[26]['b']>, T[26]['e']>>,
  Expect<Equal<HexAdd<T[27]['a'], T[27]['b']>, T[27]['e']>>,
  Expect<Equal<HexAdd<T[28]['a'], T[28]['b']>, T[28]['e']>>,
  Expect<Equal<HexAdd<T[29]['a'], T[29]['b']>, T[29]['e']>>,
  Expect<Equal<HexAdd<T[30]['a'], T[30]['b']>, T[30]['e']>>,
  Expect<Equal<HexAdd<T[31]['a'], T[31]['b']>, T[31]['e']>>,

  Expect<Equal<HexAdd<T[32]['a'], T[32]['b']>, T[32]['e']>>,
  Expect<Equal<HexAdd<T[33]['a'], T[33]['b']>, T[33]['e']>>,
  Expect<Equal<HexAdd<T[34]['a'], T[34]['b']>, T[34]['e']>>,
  Expect<Equal<HexAdd<T[35]['a'], T[35]['b']>, T[35]['e']>>,
  Expect<Equal<HexAdd<T[36]['a'], T[36]['b']>, T[36]['e']>>,
  Expect<Equal<HexAdd<T[37]['a'], T[37]['b']>, T[37]['e']>>,
  Expect<Equal<HexAdd<T[38]['a'], T[38]['b']>, T[38]['e']>>,
  Expect<Equal<HexAdd<T[39]['a'], T[39]['b']>, T[39]['e']>>,
  Expect<Equal<HexAdd<T[40]['a'], T[40]['b']>, T[40]['e']>>,
  Expect<Equal<HexAdd<T[41]['a'], T[41]['b']>, T[41]['e']>>,
  Expect<Equal<HexAdd<T[42]['a'], T[42]['b']>, T[42]['e']>>,
  Expect<Equal<HexAdd<T[43]['a'], T[43]['b']>, T[43]['e']>>,
  Expect<Equal<HexAdd<T[44]['a'], T[44]['b']>, T[44]['e']>>,
  Expect<Equal<HexAdd<T[45]['a'], T[45]['b']>, T[45]['e']>>,
  Expect<Equal<HexAdd<T[46]['a'], T[46]['b']>, T[46]['e']>>,
  Expect<Equal<HexAdd<T[47]['a'], T[47]['b']>, T[47]['e']>>,

  Expect<Equal<T['length'], 48>>,
]