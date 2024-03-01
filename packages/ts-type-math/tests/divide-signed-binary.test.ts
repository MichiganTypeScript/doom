import { Equal, Expect } from "type-testing"
import { t, T } from '../test-cases/arithmetic';
import { expect, test } from 'vitest';
import { twosComplementToNumber, numberToTwosComplement, arithmetic } from "../test-utils";
// import { DivideBinary32 } from "../divide";

test.each(t)('division, yo.  check it. (%#)', ({ a, a_binary, b, b_binary, div_s, div_s_binary }) => {
  expect(a_binary).toEqual(numberToTwosComplement(a));
  expect(a).toEqual(twosComplementToNumber(a_binary));
  expect(b_binary).toEqual(numberToTwosComplement(b));
  expect(b).toEqual(twosComplementToNumber(b_binary));
  expect(div_s_binary).toEqual(numberToTwosComplement(div_s));
  expect(div_s).toEqual(twosComplementToNumber(div_s_binary));

  const actual = arithmetic.div_s(a, b)
  expect(actual).toBe(div_s);
});

type i = 64
type a = T[i]['a_binary']     // =>
type b = T[i]['b_binary']     // =>
type e = T[i]['div_s_binary'] // =>
// type x = DivideBinary32<a, b> // =>

type cases = [
  // Expect<Equal<DivideBinary32<T[ 0]['a_binary'], T[ 0]['b_binary']>, T[ 0]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[ 1]['a_binary'], T[ 1]['b_binary']>, T[ 1]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[ 2]['a_binary'], T[ 2]['b_binary']>, T[ 2]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[ 3]['a_binary'], T[ 3]['b_binary']>, T[ 3]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[ 4]['a_binary'], T[ 4]['b_binary']>, T[ 4]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[ 5]['a_binary'], T[ 5]['b_binary']>, T[ 5]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[ 6]['a_binary'], T[ 6]['b_binary']>, T[ 6]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[ 7]['a_binary'], T[ 7]['b_binary']>, T[ 7]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[ 8]['a_binary'], T[ 8]['b_binary']>, T[ 8]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[ 9]['a_binary'], T[ 9]['b_binary']>, T[ 9]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[10]['a_binary'], T[10]['b_binary']>, T[10]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[11]['a_binary'], T[11]['b_binary']>, T[11]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[12]['a_binary'], T[12]['b_binary']>, T[12]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[13]['a_binary'], T[13]['b_binary']>, T[13]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[14]['a_binary'], T[14]['b_binary']>, T[14]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[15]['a_binary'], T[15]['b_binary']>, T[15]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[16]['a_binary'], T[16]['b_binary']>, T[16]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[17]['a_binary'], T[17]['b_binary']>, T[17]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[18]['a_binary'], T[18]['b_binary']>, T[18]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[19]['a_binary'], T[19]['b_binary']>, T[19]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[20]['a_binary'], T[20]['b_binary']>, T[20]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[21]['a_binary'], T[21]['b_binary']>, T[21]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[22]['a_binary'], T[22]['b_binary']>, T[22]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[23]['a_binary'], T[23]['b_binary']>, T[23]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[24]['a_binary'], T[24]['b_binary']>, T[24]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[25]['a_binary'], T[25]['b_binary']>, T[25]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[26]['a_binary'], T[26]['b_binary']>, T[26]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[27]['a_binary'], T[27]['b_binary']>, T[27]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[28]['a_binary'], T[28]['b_binary']>, T[28]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[29]['a_binary'], T[29]['b_binary']>, T[29]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[30]['a_binary'], T[30]['b_binary']>, T[30]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[31]['a_binary'], T[31]['b_binary']>, T[31]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[32]['a_binary'], T[32]['b_binary']>, T[32]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[33]['a_binary'], T[33]['b_binary']>, T[33]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[34]['a_binary'], T[34]['b_binary']>, T[34]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[35]['a_binary'], T[35]['b_binary']>, T[35]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[36]['a_binary'], T[36]['b_binary']>, T[36]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[37]['a_binary'], T[37]['b_binary']>, T[37]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[38]['a_binary'], T[38]['b_binary']>, T[38]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[39]['a_binary'], T[39]['b_binary']>, T[39]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[40]['a_binary'], T[40]['b_binary']>, T[40]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[41]['a_binary'], T[41]['b_binary']>, T[41]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[42]['a_binary'], T[42]['b_binary']>, T[42]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[43]['a_binary'], T[43]['b_binary']>, T[43]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[44]['a_binary'], T[44]['b_binary']>, T[44]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[45]['a_binary'], T[45]['b_binary']>, T[45]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[46]['a_binary'], T[46]['b_binary']>, T[46]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[47]['a_binary'], T[47]['b_binary']>, T[47]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[48]['a_binary'], T[48]['b_binary']>, T[48]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[49]['a_binary'], T[49]['b_binary']>, T[49]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[50]['a_binary'], T[50]['b_binary']>, T[50]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[51]['a_binary'], T[51]['b_binary']>, T[51]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[52]['a_binary'], T[52]['b_binary']>, T[52]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[53]['a_binary'], T[53]['b_binary']>, T[53]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[54]['a_binary'], T[54]['b_binary']>, T[54]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[55]['a_binary'], T[55]['b_binary']>, T[55]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[56]['a_binary'], T[56]['b_binary']>, T[56]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[57]['a_binary'], T[57]['b_binary']>, T[57]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[58]['a_binary'], T[58]['b_binary']>, T[58]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[59]['a_binary'], T[59]['b_binary']>, T[59]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[60]['a_binary'], T[60]['b_binary']>, T[60]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[61]['a_binary'], T[61]['b_binary']>, T[61]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[62]['a_binary'], T[62]['b_binary']>, T[62]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[63]['a_binary'], T[63]['b_binary']>, T[63]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[64]['a_binary'], T[64]['b_binary']>, T[64]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[65]['a_binary'], T[65]['b_binary']>, T[65]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[66]['a_binary'], T[66]['b_binary']>, T[66]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[67]['a_binary'], T[67]['b_binary']>, T[67]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[68]['a_binary'], T[68]['b_binary']>, T[68]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[69]['a_binary'], T[69]['b_binary']>, T[69]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[70]['a_binary'], T[70]['b_binary']>, T[70]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[71]['a_binary'], T[71]['b_binary']>, T[71]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[72]['a_binary'], T[72]['b_binary']>, T[72]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[73]['a_binary'], T[73]['b_binary']>, T[73]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[74]['a_binary'], T[74]['b_binary']>, T[74]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[75]['a_binary'], T[75]['b_binary']>, T[75]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[76]['a_binary'], T[76]['b_binary']>, T[76]['div_s_binary']>>,
  // Expect<Equal<DivideBinary32<T[77]['a_binary'], T[77]['b_binary']>, T[77]['div_s_binary']>>,

  Expect<Equal<T['length'], 78>>,
]