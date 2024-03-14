import { expect, test } from "vitest";
import { entry } from './single-i32load8_s';
import { t, T, Ops } from "../../ts-type-math/test-cases/memory";
import { numberToTwosComplement, twosComplementToNumber } from "../../ts-type-math/test-utils";
import { getWasm } from "../utils";
import { Expect, Equal } from "type-testing";

test.each(t)('i32load8_s($a) === $load8_s (%#)', async ({ a, a_binary, load8_s, load8_s_binary }) => {
  expect(a).toEqual(twosComplementToNumber(a_binary));
  expect(a_binary).toEqual(numberToTwosComplement(a));
  expect(load8_s).toEqual(twosComplementToNumber(load8_s_binary));
  expect(load8_s_binary).toEqual(numberToTwosComplement(load8_s));
  
  const entry = await getWasm<Ops>("from-wat-single", 'single-i32load8_s');
  expect(entry(a)).toStrictEqual(load8_s);
});

type i = 2
type a = T[i]['a']      // =>
type e = T[i]['load8_s']// =>
type x = entry<[a]>     // =>

type tests = [
  Expect<Equal<entry<[T[ 0]['a']]>, T[ 0]['load8_s']>>,
  Expect<Equal<entry<[T[ 1]['a']]>, T[ 1]['load8_s']>>,
  Expect<Equal<entry<[T[ 2]['a']]>, T[ 2]['load8_s']>>,
  Expect<Equal<entry<[T[ 3]['a']]>, T[ 3]['load8_s']>>,
  Expect<Equal<entry<[T[ 4]['a']]>, T[ 4]['load8_s']>>,
  Expect<Equal<entry<[T[ 5]['a']]>, T[ 5]['load8_s']>>,
  Expect<Equal<entry<[T[ 6]['a']]>, T[ 6]['load8_s']>>,
  Expect<Equal<entry<[T[ 7]['a']]>, T[ 7]['load8_s']>>,
  Expect<Equal<entry<[T[ 8]['a']]>, T[ 8]['load8_s']>>,
  Expect<Equal<entry<[T[ 9]['a']]>, T[ 9]['load8_s']>>,
  Expect<Equal<entry<[T[10]['a']]>, T[10]['load8_s']>>,

  Expect<Equal<T['length'], 11>>,
]