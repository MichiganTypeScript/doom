import { Equal, Expect } from "type-testing"
import type { I32MultiplyBinary } from '../multiply';
import { t, T } from '../test-cases/arithmetic';
import { expect, test } from 'vitest';
import { twosComplementToNumber, numberToTwosComplement, arithmetic } from "../test-utils";

test.each(t)('$a_binary * $b_binary === $mul_binary', ({ a_binary, b_binary, mul_binary }) => {
  const actual = arithmetic.mul(twosComplementToNumber(a_binary), twosComplementToNumber(b_binary));
  const actual_binary = numberToTwosComplement(actual);
  expect(actual_binary).toBe(mul_binary);
})

type i = 72
type a = T[i]['a']  // =>
type b = T[i]['b']  // =>
type e = T[i]['mul']// =>
type ab = T[i]['a_binary']         // =>
type bb = T[i]['b_binary']         // =>
type eb = T[i]['mul_binary']       // =>
type xb = I32MultiplyBinary<ab, bb>// =>

type tests = [
  Expect<Equal<I32MultiplyBinary<T[ 0]['a_binary'], T[ 0]['b_binary']>, T[ 0]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[ 1]['a_binary'], T[ 1]['b_binary']>, T[ 1]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[ 2]['a_binary'], T[ 2]['b_binary']>, T[ 2]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[ 3]['a_binary'], T[ 3]['b_binary']>, T[ 3]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[ 4]['a_binary'], T[ 4]['b_binary']>, T[ 4]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[ 5]['a_binary'], T[ 5]['b_binary']>, T[ 5]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[ 6]['a_binary'], T[ 6]['b_binary']>, T[ 6]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[ 7]['a_binary'], T[ 7]['b_binary']>, T[ 7]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[ 8]['a_binary'], T[ 8]['b_binary']>, T[ 8]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[ 9]['a_binary'], T[ 9]['b_binary']>, T[ 9]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[10]['a_binary'], T[10]['b_binary']>, T[10]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[11]['a_binary'], T[11]['b_binary']>, T[11]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[12]['a_binary'], T[12]['b_binary']>, T[12]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[13]['a_binary'], T[13]['b_binary']>, T[13]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[14]['a_binary'], T[14]['b_binary']>, T[14]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[15]['a_binary'], T[15]['b_binary']>, T[15]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[16]['a_binary'], T[16]['b_binary']>, T[16]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[17]['a_binary'], T[17]['b_binary']>, T[17]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[18]['a_binary'], T[18]['b_binary']>, T[18]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[19]['a_binary'], T[19]['b_binary']>, T[19]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[20]['a_binary'], T[20]['b_binary']>, T[20]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[21]['a_binary'], T[21]['b_binary']>, T[21]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[22]['a_binary'], T[22]['b_binary']>, T[22]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[23]['a_binary'], T[23]['b_binary']>, T[23]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[24]['a_binary'], T[24]['b_binary']>, T[24]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[25]['a_binary'], T[25]['b_binary']>, T[25]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[26]['a_binary'], T[26]['b_binary']>, T[26]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[27]['a_binary'], T[27]['b_binary']>, T[27]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[28]['a_binary'], T[28]['b_binary']>, T[28]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[29]['a_binary'], T[29]['b_binary']>, T[29]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[30]['a_binary'], T[30]['b_binary']>, T[30]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[31]['a_binary'], T[31]['b_binary']>, T[31]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[32]['a_binary'], T[32]['b_binary']>, T[32]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[33]['a_binary'], T[33]['b_binary']>, T[33]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[34]['a_binary'], T[34]['b_binary']>, T[34]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[35]['a_binary'], T[35]['b_binary']>, T[35]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[36]['a_binary'], T[36]['b_binary']>, T[36]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[37]['a_binary'], T[37]['b_binary']>, T[37]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[38]['a_binary'], T[38]['b_binary']>, T[38]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[39]['a_binary'], T[39]['b_binary']>, T[39]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[40]['a_binary'], T[40]['b_binary']>, T[40]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[41]['a_binary'], T[41]['b_binary']>, T[41]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[42]['a_binary'], T[42]['b_binary']>, T[42]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[43]['a_binary'], T[43]['b_binary']>, T[43]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[44]['a_binary'], T[44]['b_binary']>, T[44]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[45]['a_binary'], T[45]['b_binary']>, T[45]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[46]['a_binary'], T[46]['b_binary']>, T[46]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[47]['a_binary'], T[47]['b_binary']>, T[47]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[48]['a_binary'], T[48]['b_binary']>, T[48]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[49]['a_binary'], T[49]['b_binary']>, T[49]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[50]['a_binary'], T[50]['b_binary']>, T[50]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[51]['a_binary'], T[51]['b_binary']>, T[51]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[52]['a_binary'], T[52]['b_binary']>, T[52]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[53]['a_binary'], T[53]['b_binary']>, T[53]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[54]['a_binary'], T[54]['b_binary']>, T[54]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[55]['a_binary'], T[55]['b_binary']>, T[55]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[56]['a_binary'], T[56]['b_binary']>, T[56]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[57]['a_binary'], T[57]['b_binary']>, T[57]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[58]['a_binary'], T[58]['b_binary']>, T[58]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[59]['a_binary'], T[59]['b_binary']>, T[59]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[60]['a_binary'], T[60]['b_binary']>, T[60]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[61]['a_binary'], T[61]['b_binary']>, T[61]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[62]['a_binary'], T[62]['b_binary']>, T[62]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[63]['a_binary'], T[63]['b_binary']>, T[63]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[64]['a_binary'], T[64]['b_binary']>, T[64]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[65]['a_binary'], T[65]['b_binary']>, T[65]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[66]['a_binary'], T[66]['b_binary']>, T[66]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[67]['a_binary'], T[67]['b_binary']>, T[67]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[68]['a_binary'], T[68]['b_binary']>, T[68]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[69]['a_binary'], T[69]['b_binary']>, T[69]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[70]['a_binary'], T[70]['b_binary']>, T[70]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[71]['a_binary'], T[71]['b_binary']>, T[71]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[72]['a_binary'], T[72]['b_binary']>, T[72]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[73]['a_binary'], T[73]['b_binary']>, T[73]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[74]['a_binary'], T[74]['b_binary']>, T[74]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[75]['a_binary'], T[75]['b_binary']>, T[75]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[76]['a_binary'], T[76]['b_binary']>, T[76]['mul_binary']>>,
  Expect<Equal<I32MultiplyBinary<T[77]['a_binary'], T[77]['b_binary']>, T[77]['mul_binary']>>,

  Expect<Equal<T['length'], 78>>,
]
