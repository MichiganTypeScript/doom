import { Equal, Expect } from "type-testing"
import type { I32ClzBinary } from '../binary';
import { t, T } from '../test-cases/arithmetic';
import { expect, test } from 'vitest';
import { twosComplementToNumber, numberToTwosComplement, arithmetic } from "../test-utils";

test.each(t)('$a_binary === $clz_binary', ({ a_binary, clz_binary }) => {
  const a = twosComplementToNumber(a_binary);
  const actual = arithmetic.clz(a)
  const actual_binary = numberToTwosComplement(actual);
  expect(actual_binary).toBe(clz_binary);
});

type i = 35
type a = T[i]['a']  // =>
type e = T[i]['clz']// =>
type ab = T[i]['a_binary']  // =>
type eb = T[i]['clz_binary']// =>
type xb = I32ClzBinary<ab>  // =>

type tests = [
  Expect<Equal<I32ClzBinary<T[ 0]['a_binary']>, T[ 0]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[ 1]['a_binary']>, T[ 1]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[ 2]['a_binary']>, T[ 2]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[ 3]['a_binary']>, T[ 3]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[ 4]['a_binary']>, T[ 4]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[ 5]['a_binary']>, T[ 5]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[ 6]['a_binary']>, T[ 6]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[ 7]['a_binary']>, T[ 7]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[ 8]['a_binary']>, T[ 8]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[ 9]['a_binary']>, T[ 9]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[10]['a_binary']>, T[10]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[11]['a_binary']>, T[11]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[12]['a_binary']>, T[12]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[13]['a_binary']>, T[13]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[14]['a_binary']>, T[14]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[15]['a_binary']>, T[15]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[16]['a_binary']>, T[16]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[17]['a_binary']>, T[17]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[18]['a_binary']>, T[18]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[19]['a_binary']>, T[19]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[20]['a_binary']>, T[20]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[21]['a_binary']>, T[21]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[22]['a_binary']>, T[22]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[23]['a_binary']>, T[23]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[24]['a_binary']>, T[24]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[25]['a_binary']>, T[25]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[26]['a_binary']>, T[26]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[27]['a_binary']>, T[27]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[28]['a_binary']>, T[28]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[29]['a_binary']>, T[29]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[30]['a_binary']>, T[30]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[31]['a_binary']>, T[31]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[32]['a_binary']>, T[32]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[33]['a_binary']>, T[33]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[34]['a_binary']>, T[34]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[35]['a_binary']>, T[35]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[36]['a_binary']>, T[36]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[37]['a_binary']>, T[37]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[38]['a_binary']>, T[38]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[39]['a_binary']>, T[39]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[40]['a_binary']>, T[40]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[41]['a_binary']>, T[41]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[42]['a_binary']>, T[42]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[43]['a_binary']>, T[43]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[44]['a_binary']>, T[44]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[45]['a_binary']>, T[45]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[46]['a_binary']>, T[46]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[47]['a_binary']>, T[47]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[48]['a_binary']>, T[48]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[49]['a_binary']>, T[49]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[50]['a_binary']>, T[50]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[51]['a_binary']>, T[51]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[52]['a_binary']>, T[52]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[53]['a_binary']>, T[53]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[54]['a_binary']>, T[54]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[55]['a_binary']>, T[55]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[56]['a_binary']>, T[56]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[57]['a_binary']>, T[57]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[58]['a_binary']>, T[58]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[59]['a_binary']>, T[59]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[60]['a_binary']>, T[60]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[61]['a_binary']>, T[61]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[62]['a_binary']>, T[62]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[63]['a_binary']>, T[63]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[64]['a_binary']>, T[64]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[65]['a_binary']>, T[65]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[66]['a_binary']>, T[66]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[67]['a_binary']>, T[67]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[68]['a_binary']>, T[68]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[69]['a_binary']>, T[69]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[70]['a_binary']>, T[70]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[71]['a_binary']>, T[71]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[72]['a_binary']>, T[72]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[73]['a_binary']>, T[73]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[74]['a_binary']>, T[74]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[75]['a_binary']>, T[75]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[76]['a_binary']>, T[76]['clz_binary']>>,
  Expect<Equal<I32ClzBinary<T[77]['a_binary']>, T[77]['clz_binary']>>,

  Expect<Equal<T['length'], 78>>,
]
