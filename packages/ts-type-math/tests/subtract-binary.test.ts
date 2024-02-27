import { Equal, Expect } from "type-testing"
import type { I32SubtractBinary } from '../subtract';
import { t, T } from '../test-cases/arithmetic';
import { expect, test } from 'vitest';
import { twosComplementToNumber, numberToTwosComplement } from "../test-utils";

test.each(t)('$a_binary - $b_binary === $sub_binary', ({ a_binary, b_binary, sub_binary }) => {
  const actual = twosComplementToNumber(a_binary) - twosComplementToNumber(b_binary);
  const actual_binary = numberToTwosComplement(actual);
  expect(actual_binary).toBe(sub_binary);
})

type tests = [
  Expect<Equal<I32SubtractBinary<T[ 0]['a_binary'], T[ 0]['b_binary']>, T[ 0]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[ 1]['a_binary'], T[ 1]['b_binary']>, T[ 1]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[ 2]['a_binary'], T[ 2]['b_binary']>, T[ 2]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[ 3]['a_binary'], T[ 3]['b_binary']>, T[ 3]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[ 4]['a_binary'], T[ 4]['b_binary']>, T[ 4]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[ 5]['a_binary'], T[ 5]['b_binary']>, T[ 5]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[ 6]['a_binary'], T[ 6]['b_binary']>, T[ 6]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[ 7]['a_binary'], T[ 7]['b_binary']>, T[ 7]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[ 8]['a_binary'], T[ 8]['b_binary']>, T[ 8]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[ 9]['a_binary'], T[ 9]['b_binary']>, T[ 9]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[10]['a_binary'], T[10]['b_binary']>, T[10]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[11]['a_binary'], T[11]['b_binary']>, T[11]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[12]['a_binary'], T[12]['b_binary']>, T[12]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[13]['a_binary'], T[13]['b_binary']>, T[13]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[14]['a_binary'], T[14]['b_binary']>, T[14]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[15]['a_binary'], T[15]['b_binary']>, T[15]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[16]['a_binary'], T[16]['b_binary']>, T[16]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[17]['a_binary'], T[17]['b_binary']>, T[17]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[18]['a_binary'], T[18]['b_binary']>, T[18]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[19]['a_binary'], T[19]['b_binary']>, T[19]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[20]['a_binary'], T[20]['b_binary']>, T[20]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[21]['a_binary'], T[21]['b_binary']>, T[21]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[22]['a_binary'], T[22]['b_binary']>, T[22]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[23]['a_binary'], T[23]['b_binary']>, T[23]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[24]['a_binary'], T[24]['b_binary']>, T[24]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[25]['a_binary'], T[25]['b_binary']>, T[25]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[26]['a_binary'], T[26]['b_binary']>, T[26]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[27]['a_binary'], T[27]['b_binary']>, T[27]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[28]['a_binary'], T[28]['b_binary']>, T[28]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[29]['a_binary'], T[29]['b_binary']>, T[29]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[30]['a_binary'], T[30]['b_binary']>, T[30]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[31]['a_binary'], T[31]['b_binary']>, T[31]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[32]['a_binary'], T[32]['b_binary']>, T[32]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[33]['a_binary'], T[33]['b_binary']>, T[33]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[34]['a_binary'], T[34]['b_binary']>, T[34]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[35]['a_binary'], T[35]['b_binary']>, T[35]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[36]['a_binary'], T[36]['b_binary']>, T[36]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[37]['a_binary'], T[37]['b_binary']>, T[37]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[38]['a_binary'], T[38]['b_binary']>, T[38]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[39]['a_binary'], T[39]['b_binary']>, T[39]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[40]['a_binary'], T[40]['b_binary']>, T[40]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[41]['a_binary'], T[41]['b_binary']>, T[41]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[42]['a_binary'], T[42]['b_binary']>, T[42]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[43]['a_binary'], T[43]['b_binary']>, T[43]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[44]['a_binary'], T[44]['b_binary']>, T[44]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[45]['a_binary'], T[45]['b_binary']>, T[45]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[46]['a_binary'], T[46]['b_binary']>, T[46]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[47]['a_binary'], T[47]['b_binary']>, T[47]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[48]['a_binary'], T[48]['b_binary']>, T[48]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[49]['a_binary'], T[49]['b_binary']>, T[49]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[50]['a_binary'], T[50]['b_binary']>, T[50]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[51]['a_binary'], T[51]['b_binary']>, T[51]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[52]['a_binary'], T[52]['b_binary']>, T[52]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[53]['a_binary'], T[53]['b_binary']>, T[53]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[54]['a_binary'], T[54]['b_binary']>, T[54]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[55]['a_binary'], T[55]['b_binary']>, T[55]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[56]['a_binary'], T[56]['b_binary']>, T[56]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[57]['a_binary'], T[57]['b_binary']>, T[57]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[58]['a_binary'], T[58]['b_binary']>, T[58]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[59]['a_binary'], T[59]['b_binary']>, T[59]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[60]['a_binary'], T[60]['b_binary']>, T[60]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[61]['a_binary'], T[61]['b_binary']>, T[61]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[62]['a_binary'], T[62]['b_binary']>, T[62]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[63]['a_binary'], T[63]['b_binary']>, T[63]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[64]['a_binary'], T[64]['b_binary']>, T[64]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[65]['a_binary'], T[65]['b_binary']>, T[65]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[66]['a_binary'], T[66]['b_binary']>, T[66]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[67]['a_binary'], T[67]['b_binary']>, T[67]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[68]['a_binary'], T[68]['b_binary']>, T[68]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[69]['a_binary'], T[69]['b_binary']>, T[69]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[70]['a_binary'], T[70]['b_binary']>, T[70]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[71]['a_binary'], T[71]['b_binary']>, T[71]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[72]['a_binary'], T[72]['b_binary']>, T[72]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[73]['a_binary'], T[73]['b_binary']>, T[73]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[74]['a_binary'], T[74]['b_binary']>, T[74]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[75]['a_binary'], T[75]['b_binary']>, T[75]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[76]['a_binary'], T[76]['b_binary']>, T[76]['sub_binary']>>,
  Expect<Equal<I32SubtractBinary<T[77]['a_binary'], T[77]['b_binary']>, T[77]['sub_binary']>>,

  Expect<Equal<T['length'], 78>>,
]

type i = 41
type a = T[i]['a']  // =>
type b = T[i]['b']  // =>
type e = T[i]['add']// =>
type ab = T[i]['a_binary']  // =>
type bb = T[i]['b_binary']  // =>
type eb = T[i]['sub_binary']// =>
type x = xb                  // =>
type xb = I32SubtractBinary<ab, bb> // =>
