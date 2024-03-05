import { expect, test } from "vitest";
import { entry } from './single-i32load16_s.actual';
import { t, T, Ops } from "../../ts-type-math/test-cases/memory";
import { numberToTwosComplement, twosComplementToNumber } from "../../ts-type-math/test-utils";
import { getWasm } from "../utils";
import { Expect, Equal } from "type-testing";

test.each(t)('i32load16_s($a) === $load16_s (%#)', async ({ a, a_binary, load16_s, load16_s_binary }) => {
  expect(a).toEqual(twosComplementToNumber(a_binary));
  expect(a_binary).toEqual(numberToTwosComplement(a));
  expect(load16_s).toEqual(twosComplementToNumber(load16_s_binary));
  expect(load16_s_binary).toEqual(numberToTwosComplement(load16_s));
  
  const entry = await getWasm<Ops>("from-wat-single", 'single-i32load16_s');
  expect(entry(a)).toStrictEqual(load16_s);
});

type i = 8
type a = T[i]['a']       // =>
type e = T[i]['load16_s']// =>
type x = entry<[a]>      // =>

type tests = [
  Expect<Equal<entry<[T[ 0]['a']]>, T[ 0]['load16_s']>>,
  Expect<Equal<entry<[T[ 1]['a']]>, T[ 1]['load16_s']>>,
  Expect<Equal<entry<[T[ 2]['a']]>, T[ 2]['load16_s']>>,
  Expect<Equal<entry<[T[ 3]['a']]>, T[ 3]['load16_s']>>,
  Expect<Equal<entry<[T[ 4]['a']]>, T[ 4]['load16_s']>>,
  Expect<Equal<entry<[T[ 5]['a']]>, T[ 5]['load16_s']>>,
  Expect<Equal<entry<[T[ 6]['a']]>, T[ 6]['load16_s']>>,
  Expect<Equal<entry<[T[ 7]['a']]>, T[ 7]['load16_s']>>,
  Expect<Equal<entry<[T[ 8]['a']]>, T[ 8]['load16_s']>>,
  Expect<Equal<entry<[T[ 9]['a']]>, T[ 9]['load16_s']>>,
  Expect<Equal<entry<[T[10]['a']]>, T[10]['load16_s']>>,

  Expect<Equal<T['length'], 11>>,
]