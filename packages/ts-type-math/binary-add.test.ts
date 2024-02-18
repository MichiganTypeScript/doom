import { Equal, Expect } from "type-testing"
import type { BinaryAdd } from './binary-add';
import { t, T } from './test-cases/add';
import { expect, test } from 'vitest';
import { binaryTwosComplementToNumber, numberToTwosComplementBinary } from "./test-utils";

test.each(t)('$a_binary + $b_binary === $e_binary', () => {
  t.forEach(({ a_binary, b_binary, e_binary }) => {
    const actual = binaryTwosComplementToNumber(a_binary) + binaryTwosComplementToNumber(b_binary);
    const actual_binary = numberToTwosComplementBinary(actual);
    expect(actual_binary).toBe(e_binary);
  });
})

type tests = [
  Expect<Equal<BinaryAdd<T[ 0]['a_binary'], T[ 0]['b_binary']>, T[ 0]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[ 1]['a_binary'], T[ 1]['b_binary']>, T[ 1]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[ 2]['a_binary'], T[ 2]['b_binary']>, T[ 2]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[ 3]['a_binary'], T[ 3]['b_binary']>, T[ 3]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[ 4]['a_binary'], T[ 4]['b_binary']>, T[ 4]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[ 5]['a_binary'], T[ 5]['b_binary']>, T[ 5]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[ 6]['a_binary'], T[ 6]['b_binary']>, T[ 6]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[ 7]['a_binary'], T[ 7]['b_binary']>, T[ 7]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[ 8]['a_binary'], T[ 8]['b_binary']>, T[ 8]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[ 9]['a_binary'], T[ 9]['b_binary']>, T[ 9]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[10]['a_binary'], T[10]['b_binary']>, T[10]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[11]['a_binary'], T[11]['b_binary']>, T[11]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[12]['a_binary'], T[12]['b_binary']>, T[12]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[13]['a_binary'], T[13]['b_binary']>, T[13]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[14]['a_binary'], T[14]['b_binary']>, T[14]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[15]['a_binary'], T[15]['b_binary']>, T[15]['e_binary']>>,
  
  Expect<Equal<BinaryAdd<T[16]['a_binary'], T[16]['b_binary']>, T[16]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[17]['a_binary'], T[17]['b_binary']>, T[17]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[18]['a_binary'], T[18]['b_binary']>, T[18]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[19]['a_binary'], T[19]['b_binary']>, T[19]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[20]['a_binary'], T[20]['b_binary']>, T[20]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[21]['a_binary'], T[21]['b_binary']>, T[21]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[22]['a_binary'], T[22]['b_binary']>, T[22]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[23]['a_binary'], T[23]['b_binary']>, T[23]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[24]['a_binary'], T[24]['b_binary']>, T[24]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[25]['a_binary'], T[25]['b_binary']>, T[25]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[26]['a_binary'], T[26]['b_binary']>, T[26]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[27]['a_binary'], T[27]['b_binary']>, T[27]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[28]['a_binary'], T[28]['b_binary']>, T[28]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[29]['a_binary'], T[29]['b_binary']>, T[29]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[30]['a_binary'], T[30]['b_binary']>, T[30]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[31]['a_binary'], T[31]['b_binary']>, T[31]['e_binary']>>,

  Expect<Equal<BinaryAdd<T[32]['a_binary'], T[32]['b_binary']>, T[32]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[33]['a_binary'], T[33]['b_binary']>, T[33]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[34]['a_binary'], T[34]['b_binary']>, T[34]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[35]['a_binary'], T[35]['b_binary']>, T[35]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[36]['a_binary'], T[36]['b_binary']>, T[36]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[37]['a_binary'], T[37]['b_binary']>, T[37]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[38]['a_binary'], T[38]['b_binary']>, T[38]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[39]['a_binary'], T[39]['b_binary']>, T[39]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[40]['a_binary'], T[40]['b_binary']>, T[40]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[41]['a_binary'], T[41]['b_binary']>, T[41]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[42]['a_binary'], T[42]['b_binary']>, T[42]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[43]['a_binary'], T[43]['b_binary']>, T[43]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[44]['a_binary'], T[44]['b_binary']>, T[44]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[45]['a_binary'], T[45]['b_binary']>, T[45]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[46]['a_binary'], T[46]['b_binary']>, T[46]['e_binary']>>,
  Expect<Equal<BinaryAdd<T[47]['a_binary'], T[47]['b_binary']>, T[47]['e_binary']>>,

  Expect<Equal<T['length'], 48>>,
]

type i = 32
type a = T[i]['a'] // =>
type b = T[i]['b'] // =>
type e = T[i]['e'] // =>
type ab = T[i]['a_binary'] // =>
type bb = T[i]['b_binary'] // =>
type eb = T[i]['e_binary'] // =>

type xb = BinaryAdd<ab, bb>// =>


