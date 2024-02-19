import { Equal, Expect } from "type-testing"
import type { I32AddBinary } from './add';
import { t, T } from './test-cases/arithmetic';
import { expect, test } from 'vitest';
import { binaryTwosComplementToNumber, numberToTwosComplementBinary } from "./test-utils";

test.each(t)('$a_binary + $b_binary === $add_binary', () => {
  t.forEach(({ a_binary, b_binary, add_binary }) => {
    const actual = binaryTwosComplementToNumber(a_binary) + binaryTwosComplementToNumber(b_binary);
    const actual_binary = numberToTwosComplementBinary(actual);
    expect(actual_binary).toBe(add_binary);
  });
})

type tests = [
  Expect<Equal<I32AddBinary<T[ 0]['a_binary'], T[ 0]['b_binary']>, T[ 0]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[ 1]['a_binary'], T[ 1]['b_binary']>, T[ 1]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[ 2]['a_binary'], T[ 2]['b_binary']>, T[ 2]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[ 3]['a_binary'], T[ 3]['b_binary']>, T[ 3]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[ 4]['a_binary'], T[ 4]['b_binary']>, T[ 4]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[ 5]['a_binary'], T[ 5]['b_binary']>, T[ 5]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[ 6]['a_binary'], T[ 6]['b_binary']>, T[ 6]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[ 7]['a_binary'], T[ 7]['b_binary']>, T[ 7]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[ 8]['a_binary'], T[ 8]['b_binary']>, T[ 8]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[ 9]['a_binary'], T[ 9]['b_binary']>, T[ 9]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[10]['a_binary'], T[10]['b_binary']>, T[10]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[11]['a_binary'], T[11]['b_binary']>, T[11]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[12]['a_binary'], T[12]['b_binary']>, T[12]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[13]['a_binary'], T[13]['b_binary']>, T[13]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[14]['a_binary'], T[14]['b_binary']>, T[14]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[15]['a_binary'], T[15]['b_binary']>, T[15]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[16]['a_binary'], T[16]['b_binary']>, T[16]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[17]['a_binary'], T[17]['b_binary']>, T[17]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[18]['a_binary'], T[18]['b_binary']>, T[18]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[19]['a_binary'], T[19]['b_binary']>, T[19]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[20]['a_binary'], T[20]['b_binary']>, T[20]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[21]['a_binary'], T[21]['b_binary']>, T[21]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[22]['a_binary'], T[22]['b_binary']>, T[22]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[23]['a_binary'], T[23]['b_binary']>, T[23]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[24]['a_binary'], T[24]['b_binary']>, T[24]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[25]['a_binary'], T[25]['b_binary']>, T[25]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[26]['a_binary'], T[26]['b_binary']>, T[26]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[27]['a_binary'], T[27]['b_binary']>, T[27]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[28]['a_binary'], T[28]['b_binary']>, T[28]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[29]['a_binary'], T[29]['b_binary']>, T[29]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[30]['a_binary'], T[30]['b_binary']>, T[30]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[31]['a_binary'], T[31]['b_binary']>, T[31]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[32]['a_binary'], T[32]['b_binary']>, T[32]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[33]['a_binary'], T[33]['b_binary']>, T[33]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[34]['a_binary'], T[34]['b_binary']>, T[34]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[35]['a_binary'], T[35]['b_binary']>, T[35]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[36]['a_binary'], T[36]['b_binary']>, T[36]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[37]['a_binary'], T[37]['b_binary']>, T[37]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[38]['a_binary'], T[38]['b_binary']>, T[38]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[39]['a_binary'], T[39]['b_binary']>, T[39]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[40]['a_binary'], T[40]['b_binary']>, T[40]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[41]['a_binary'], T[41]['b_binary']>, T[41]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[42]['a_binary'], T[42]['b_binary']>, T[42]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[43]['a_binary'], T[43]['b_binary']>, T[43]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[44]['a_binary'], T[44]['b_binary']>, T[44]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[45]['a_binary'], T[45]['b_binary']>, T[45]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[46]['a_binary'], T[46]['b_binary']>, T[46]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[47]['a_binary'], T[47]['b_binary']>, T[47]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[48]['a_binary'], T[48]['b_binary']>, T[48]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[49]['a_binary'], T[49]['b_binary']>, T[49]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[50]['a_binary'], T[50]['b_binary']>, T[50]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[51]['a_binary'], T[51]['b_binary']>, T[51]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[52]['a_binary'], T[52]['b_binary']>, T[52]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[53]['a_binary'], T[53]['b_binary']>, T[53]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[54]['a_binary'], T[54]['b_binary']>, T[54]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[55]['a_binary'], T[55]['b_binary']>, T[55]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[56]['a_binary'], T[56]['b_binary']>, T[56]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[57]['a_binary'], T[57]['b_binary']>, T[57]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[58]['a_binary'], T[58]['b_binary']>, T[58]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[59]['a_binary'], T[59]['b_binary']>, T[59]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[60]['a_binary'], T[60]['b_binary']>, T[60]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[61]['a_binary'], T[61]['b_binary']>, T[61]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[62]['a_binary'], T[62]['b_binary']>, T[62]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[63]['a_binary'], T[63]['b_binary']>, T[63]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[64]['a_binary'], T[64]['b_binary']>, T[64]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[65]['a_binary'], T[65]['b_binary']>, T[65]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[66]['a_binary'], T[66]['b_binary']>, T[66]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[67]['a_binary'], T[67]['b_binary']>, T[67]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[68]['a_binary'], T[68]['b_binary']>, T[68]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[69]['a_binary'], T[69]['b_binary']>, T[69]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[70]['a_binary'], T[70]['b_binary']>, T[70]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[71]['a_binary'], T[71]['b_binary']>, T[71]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[72]['a_binary'], T[72]['b_binary']>, T[72]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[73]['a_binary'], T[73]['b_binary']>, T[73]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[74]['a_binary'], T[74]['b_binary']>, T[74]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[75]['a_binary'], T[75]['b_binary']>, T[75]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[76]['a_binary'], T[76]['b_binary']>, T[76]['add_binary']>>,
  Expect<Equal<I32AddBinary<T[77]['a_binary'], T[77]['b_binary']>, T[77]['add_binary']>>,

  Expect<Equal<T['length'], 78>>,
]

type i = 48
type a = T[i]['a']  // =>
type b = T[i]['b']  // =>
type e = T[i]['add']// =>
type ab = T[i]['a_binary']  // =>
type bb = T[i]['b_binary']  // =>
type eb = T[i]['add_binary']// =>

type xb = I32AddBinary<ab, bb> // =>
