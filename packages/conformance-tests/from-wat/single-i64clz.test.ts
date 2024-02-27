import type { Expect, Equal } from 'type-testing';
import type { entry } from './single-i64clz.actual'
import { t, T, Ops } from '../../ts-type-math/test-cases/arithmetic-i64'

import { test, expect } from 'vitest';
import { getWasm } from '../utils'

test.todo.each(t)('clz($a) === $clz', async ({ a, b, clz }) => {
  const entry = await getWasm<Ops['clz']>("from-wat", 'single-i64clz');
  expect(entry(a)).toStrictEqual(clz);
});

type i = 0
type a = T[i]['a']     // =>
type shl = T[i]['clz'] // =>
type x = entry<[a]>    // =>

type tests = [
  Expect<Equal<entry<[T[ 0]['a']]>, T[ 0]['clz']>>,
  Expect<Equal<entry<[T[ 1]['a']]>, T[ 1]['clz']>>,
  Expect<Equal<entry<[T[ 2]['a']]>, T[ 2]['clz']>>,
  Expect<Equal<entry<[T[ 3]['a']]>, T[ 3]['clz']>>,
  Expect<Equal<entry<[T[ 4]['a']]>, T[ 4]['clz']>>,
  Expect<Equal<entry<[T[ 5]['a']]>, T[ 5]['clz']>>,
  Expect<Equal<entry<[T[ 6]['a']]>, T[ 6]['clz']>>,
  Expect<Equal<entry<[T[ 7]['a']]>, T[ 7]['clz']>>,
  Expect<Equal<entry<[T[ 8]['a']]>, T[ 8]['clz']>>,
  Expect<Equal<entry<[T[ 9]['a']]>, T[ 9]['clz']>>,
  Expect<Equal<entry<[T[10]['a']]>, T[10]['clz']>>,
  Expect<Equal<entry<[T[11]['a']]>, T[11]['clz']>>,
  Expect<Equal<entry<[T[12]['a']]>, T[12]['clz']>>,
  Expect<Equal<entry<[T[13]['a']]>, T[13]['clz']>>,
  Expect<Equal<entry<[T[14]['a']]>, T[14]['clz']>>,
  Expect<Equal<entry<[T[15]['a']]>, T[15]['clz']>>,
  Expect<Equal<entry<[T[16]['a']]>, T[16]['clz']>>,
  Expect<Equal<entry<[T[17]['a']]>, T[17]['clz']>>,
  Expect<Equal<entry<[T[18]['a']]>, T[18]['clz']>>,
  Expect<Equal<entry<[T[19]['a']]>, T[19]['clz']>>,
  Expect<Equal<entry<[T[20]['a']]>, T[20]['clz']>>,
  Expect<Equal<entry<[T[21]['a']]>, T[21]['clz']>>,
  Expect<Equal<entry<[T[22]['a']]>, T[22]['clz']>>,
  Expect<Equal<entry<[T[23]['a']]>, T[23]['clz']>>,
  Expect<Equal<entry<[T[24]['a']]>, T[24]['clz']>>,
  Expect<Equal<entry<[T[25]['a']]>, T[25]['clz']>>,
  Expect<Equal<entry<[T[26]['a']]>, T[26]['clz']>>,
  Expect<Equal<entry<[T[27]['a']]>, T[27]['clz']>>,
  Expect<Equal<entry<[T[28]['a']]>, T[28]['clz']>>,
  Expect<Equal<entry<[T[29]['a']]>, T[29]['clz']>>,
  Expect<Equal<entry<[T[30]['a']]>, T[30]['clz']>>,
  Expect<Equal<entry<[T[31]['a']]>, T[31]['clz']>>,
  Expect<Equal<entry<[T[32]['a']]>, T[32]['clz']>>,
  Expect<Equal<entry<[T[33]['a']]>, T[33]['clz']>>,
  Expect<Equal<entry<[T[34]['a']]>, T[34]['clz']>>,
  Expect<Equal<entry<[T[35]['a']]>, T[35]['clz']>>,
  Expect<Equal<entry<[T[36]['a']]>, T[36]['clz']>>,
  Expect<Equal<entry<[T[37]['a']]>, T[37]['clz']>>,
  Expect<Equal<entry<[T[38]['a']]>, T[38]['clz']>>,
  Expect<Equal<entry<[T[39]['a']]>, T[39]['clz']>>,
  Expect<Equal<entry<[T[40]['a']]>, T[40]['clz']>>,
  Expect<Equal<entry<[T[41]['a']]>, T[41]['clz']>>,
  Expect<Equal<entry<[T[42]['a']]>, T[42]['clz']>>,
  Expect<Equal<entry<[T[43]['a']]>, T[43]['clz']>>,
  Expect<Equal<entry<[T[44]['a']]>, T[44]['clz']>>,
  Expect<Equal<entry<[T[45]['a']]>, T[45]['clz']>>,
  Expect<Equal<entry<[T[46]['a']]>, T[46]['clz']>>,
  Expect<Equal<entry<[T[47]['a']]>, T[47]['clz']>>,
  Expect<Equal<entry<[T[48]['a']]>, T[48]['clz']>>,
  Expect<Equal<entry<[T[49]['a']]>, T[49]['clz']>>,
  Expect<Equal<entry<[T[50]['a']]>, T[50]['clz']>>,
  Expect<Equal<entry<[T[51]['a']]>, T[51]['clz']>>,
  Expect<Equal<entry<[T[52]['a']]>, T[52]['clz']>>,
  Expect<Equal<entry<[T[53]['a']]>, T[53]['clz']>>,
  Expect<Equal<entry<[T[54]['a']]>, T[54]['clz']>>,
  Expect<Equal<entry<[T[55]['a']]>, T[55]['clz']>>,
  Expect<Equal<entry<[T[56]['a']]>, T[56]['clz']>>,
  Expect<Equal<entry<[T[57]['a']]>, T[57]['clz']>>,
  Expect<Equal<entry<[T[58]['a']]>, T[58]['clz']>>,
  Expect<Equal<entry<[T[59]['a']]>, T[59]['clz']>>,
  Expect<Equal<entry<[T[60]['a']]>, T[60]['clz']>>,
  Expect<Equal<entry<[T[61]['a']]>, T[61]['clz']>>,
  Expect<Equal<entry<[T[62]['a']]>, T[62]['clz']>>,
  Expect<Equal<entry<[T[63]['a']]>, T[63]['clz']>>,
  Expect<Equal<entry<[T[64]['a']]>, T[64]['clz']>>,
  Expect<Equal<entry<[T[65]['a']]>, T[65]['clz']>>,
  Expect<Equal<entry<[T[66]['a']]>, T[66]['clz']>>,
  Expect<Equal<entry<[T[67]['a']]>, T[67]['clz']>>,
  Expect<Equal<entry<[T[68]['a']]>, T[68]['clz']>>,
  Expect<Equal<entry<[T[69]['a']]>, T[69]['clz']>>,
  Expect<Equal<entry<[T[70]['a']]>, T[70]['clz']>>,
  Expect<Equal<entry<[T[71]['a']]>, T[71]['clz']>>,
  Expect<Equal<entry<[T[72]['a']]>, T[72]['clz']>>,
  Expect<Equal<entry<[T[73]['a']]>, T[73]['clz']>>,
  Expect<Equal<entry<[T[74]['a']]>, T[74]['clz']>>,
  Expect<Equal<entry<[T[75]['a']]>, T[75]['clz']>>,
  Expect<Equal<entry<[T[76]['a']]>, T[76]['clz']>>,
  Expect<Equal<entry<[T[77]['a']]>, T[77]['clz']>>,

  Expect<Equal<T['length'], 78>>,
]
