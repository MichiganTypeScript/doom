import { t, T } from '../test-cases/arithmetic';
import { expect, test } from 'vitest';
import { Expect, Equal } from 'type-testing';
import { I32AddDecimal } from '../add';

test.each(t)('$a + $b === $add', ({ a, b, add }) => {
  expect(a + b).toBe(add);
  expect(t).toHaveLength(78);
})

type i = 8
type a = T[i]['a']          // =>
type b = T[i]['b']          // =>
type e = T[i]['add']        // =>
type x = I32AddDecimal<a, b>// =>

type tests = [
  Expect<Equal<I32AddDecimal<T[ 0]['a'], T[ 0]['b']>, T[ 0]['add']>>,
  Expect<Equal<I32AddDecimal<T[ 1]['a'], T[ 1]['b']>, T[ 1]['add']>>,
  Expect<Equal<I32AddDecimal<T[ 2]['a'], T[ 2]['b']>, T[ 2]['add']>>,
  Expect<Equal<I32AddDecimal<T[ 3]['a'], T[ 3]['b']>, T[ 3]['add']>>,
  Expect<Equal<I32AddDecimal<T[ 4]['a'], T[ 4]['b']>, T[ 4]['add']>>,
  Expect<Equal<I32AddDecimal<T[ 5]['a'], T[ 5]['b']>, T[ 5]['add']>>,
  Expect<Equal<I32AddDecimal<T[ 6]['a'], T[ 6]['b']>, T[ 6]['add']>>,
  Expect<Equal<I32AddDecimal<T[ 7]['a'], T[ 7]['b']>, T[ 7]['add']>>,
  Expect<Equal<I32AddDecimal<T[ 8]['a'], T[ 8]['b']>, T[ 8]['add']>>,
  Expect<Equal<I32AddDecimal<T[ 9]['a'], T[ 9]['b']>, T[ 9]['add']>>,
  Expect<Equal<I32AddDecimal<T[10]['a'], T[10]['b']>, T[10]['add']>>,
  Expect<Equal<I32AddDecimal<T[11]['a'], T[11]['b']>, T[11]['add']>>,
  Expect<Equal<I32AddDecimal<T[12]['a'], T[12]['b']>, T[12]['add']>>,
  Expect<Equal<I32AddDecimal<T[13]['a'], T[13]['b']>, T[13]['add']>>,
  Expect<Equal<I32AddDecimal<T[14]['a'], T[14]['b']>, T[14]['add']>>,
  Expect<Equal<I32AddDecimal<T[15]['a'], T[15]['b']>, T[15]['add']>>,
  Expect<Equal<I32AddDecimal<T[16]['a'], T[16]['b']>, T[16]['add']>>,
  Expect<Equal<I32AddDecimal<T[17]['a'], T[17]['b']>, T[17]['add']>>,
  Expect<Equal<I32AddDecimal<T[18]['a'], T[18]['b']>, T[18]['add']>>,
  Expect<Equal<I32AddDecimal<T[19]['a'], T[19]['b']>, T[19]['add']>>,
  Expect<Equal<I32AddDecimal<T[20]['a'], T[20]['b']>, T[20]['add']>>,
  Expect<Equal<I32AddDecimal<T[21]['a'], T[21]['b']>, T[21]['add']>>,
  Expect<Equal<I32AddDecimal<T[22]['a'], T[22]['b']>, T[22]['add']>>,
  Expect<Equal<I32AddDecimal<T[23]['a'], T[23]['b']>, T[23]['add']>>,
  Expect<Equal<I32AddDecimal<T[24]['a'], T[24]['b']>, T[24]['add']>>,
  Expect<Equal<I32AddDecimal<T[25]['a'], T[25]['b']>, T[25]['add']>>,
  Expect<Equal<I32AddDecimal<T[26]['a'], T[26]['b']>, T[26]['add']>>,
  Expect<Equal<I32AddDecimal<T[27]['a'], T[27]['b']>, T[27]['add']>>,
  Expect<Equal<I32AddDecimal<T[28]['a'], T[28]['b']>, T[28]['add']>>,
  Expect<Equal<I32AddDecimal<T[29]['a'], T[29]['b']>, T[29]['add']>>,
  Expect<Equal<I32AddDecimal<T[30]['a'], T[30]['b']>, T[30]['add']>>,
  Expect<Equal<I32AddDecimal<T[31]['a'], T[31]['b']>, T[31]['add']>>,
  Expect<Equal<I32AddDecimal<T[32]['a'], T[32]['b']>, T[32]['add']>>,
  Expect<Equal<I32AddDecimal<T[33]['a'], T[33]['b']>, T[33]['add']>>,
  Expect<Equal<I32AddDecimal<T[34]['a'], T[34]['b']>, T[34]['add']>>,
  Expect<Equal<I32AddDecimal<T[35]['a'], T[35]['b']>, T[35]['add']>>,
  Expect<Equal<I32AddDecimal<T[36]['a'], T[36]['b']>, T[36]['add']>>,
  Expect<Equal<I32AddDecimal<T[37]['a'], T[37]['b']>, T[37]['add']>>,
  Expect<Equal<I32AddDecimal<T[38]['a'], T[38]['b']>, T[38]['add']>>,
  Expect<Equal<I32AddDecimal<T[39]['a'], T[39]['b']>, T[39]['add']>>,
  Expect<Equal<I32AddDecimal<T[40]['a'], T[40]['b']>, T[40]['add']>>,
  Expect<Equal<I32AddDecimal<T[41]['a'], T[41]['b']>, T[41]['add']>>,
  Expect<Equal<I32AddDecimal<T[42]['a'], T[42]['b']>, T[42]['add']>>,
  Expect<Equal<I32AddDecimal<T[43]['a'], T[43]['b']>, T[43]['add']>>,
  Expect<Equal<I32AddDecimal<T[44]['a'], T[44]['b']>, T[44]['add']>>,
  Expect<Equal<I32AddDecimal<T[45]['a'], T[45]['b']>, T[45]['add']>>,
  Expect<Equal<I32AddDecimal<T[46]['a'], T[46]['b']>, T[46]['add']>>,
  Expect<Equal<I32AddDecimal<T[47]['a'], T[47]['b']>, T[47]['add']>>,
  Expect<Equal<I32AddDecimal<T[48]['a'], T[48]['b']>, T[48]['add']>>,
  Expect<Equal<I32AddDecimal<T[49]['a'], T[49]['b']>, T[49]['add']>>,
  Expect<Equal<I32AddDecimal<T[50]['a'], T[50]['b']>, T[50]['add']>>,
  Expect<Equal<I32AddDecimal<T[51]['a'], T[51]['b']>, T[51]['add']>>,
  Expect<Equal<I32AddDecimal<T[52]['a'], T[52]['b']>, T[52]['add']>>,
  Expect<Equal<I32AddDecimal<T[53]['a'], T[53]['b']>, T[53]['add']>>,
  Expect<Equal<I32AddDecimal<T[54]['a'], T[54]['b']>, T[54]['add']>>,
  Expect<Equal<I32AddDecimal<T[55]['a'], T[55]['b']>, T[55]['add']>>,
  Expect<Equal<I32AddDecimal<T[56]['a'], T[56]['b']>, T[56]['add']>>,
  Expect<Equal<I32AddDecimal<T[57]['a'], T[57]['b']>, T[57]['add']>>,
  Expect<Equal<I32AddDecimal<T[58]['a'], T[58]['b']>, T[58]['add']>>,
  Expect<Equal<I32AddDecimal<T[59]['a'], T[59]['b']>, T[59]['add']>>,
  Expect<Equal<I32AddDecimal<T[60]['a'], T[60]['b']>, T[60]['add']>>,
  Expect<Equal<I32AddDecimal<T[61]['a'], T[61]['b']>, T[61]['add']>>,
  Expect<Equal<I32AddDecimal<T[62]['a'], T[62]['b']>, T[62]['add']>>,
  Expect<Equal<I32AddDecimal<T[63]['a'], T[63]['b']>, T[63]['add']>>,
  Expect<Equal<I32AddDecimal<T[64]['a'], T[64]['b']>, T[64]['add']>>,
  Expect<Equal<I32AddDecimal<T[65]['a'], T[65]['b']>, T[65]['add']>>,
  Expect<Equal<I32AddDecimal<T[66]['a'], T[66]['b']>, T[66]['add']>>,
  Expect<Equal<I32AddDecimal<T[67]['a'], T[67]['b']>, T[67]['add']>>,
  Expect<Equal<I32AddDecimal<T[68]['a'], T[68]['b']>, T[68]['add']>>,
  Expect<Equal<I32AddDecimal<T[69]['a'], T[69]['b']>, T[69]['add']>>,
  Expect<Equal<I32AddDecimal<T[70]['a'], T[70]['b']>, T[70]['add']>>,
  Expect<Equal<I32AddDecimal<T[71]['a'], T[71]['b']>, T[71]['add']>>,
  Expect<Equal<I32AddDecimal<T[72]['a'], T[72]['b']>, T[72]['add']>>,
  Expect<Equal<I32AddDecimal<T[73]['a'], T[73]['b']>, T[73]['add']>>,
  Expect<Equal<I32AddDecimal<T[74]['a'], T[74]['b']>, T[74]['add']>>,
  Expect<Equal<I32AddDecimal<T[75]['a'], T[75]['b']>, T[75]['add']>>,
  Expect<Equal<I32AddDecimal<T[76]['a'], T[76]['b']>, T[76]['add']>>,
  Expect<Equal<I32AddDecimal<T[77]['a'], T[77]['b']>, T[77]['add']>>,

  Expect<Equal<T['length'], 78>>,
]
