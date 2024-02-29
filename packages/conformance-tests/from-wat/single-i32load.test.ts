import { expect, test } from "vitest";
import { entry } from './single-i32load.actual';
import { t, T, Ops } from "../../ts-type-math/test-cases/memory";
import { numberToTwosComplement, twosComplementToNumber } from "../../ts-type-math/test-utils";
import { getWasm } from "../utils";
import { Expect, Equal } from "type-testing";

test.each(t)('i32load($a) === $load (%#)', async ({ a, a_binary, load, load_binary }) => {
  expect(a).toEqual(twosComplementToNumber(a_binary));
  expect(a_binary).toEqual(numberToTwosComplement(a));
  expect(load).toEqual(twosComplementToNumber(load_binary));
  expect(load_binary).toEqual(numberToTwosComplement(load));
  
  const entry = await getWasm<Ops>("from-wat", 'single-i32load');
  expect(entry(a)).toStrictEqual(load);
});

type i = 8
type a = T[i]['a']   // =>
type e = T[i]['load']// =>
type x = entry<[a]>  // =>

type tests = [
  Expect<Equal<entry<[T[ 0]['a']]>, T[ 0]['load']>>,
  Expect<Equal<entry<[T[ 1]['a']]>, T[ 1]['load']>>,
  Expect<Equal<entry<[T[ 2]['a']]>, T[ 2]['load']>>,
  Expect<Equal<entry<[T[ 3]['a']]>, T[ 3]['load']>>,
  Expect<Equal<entry<[T[ 4]['a']]>, T[ 4]['load']>>,
  Expect<Equal<entry<[T[ 5]['a']]>, T[ 5]['load']>>,
  Expect<Equal<entry<[T[ 6]['a']]>, T[ 6]['load']>>,
  Expect<Equal<entry<[T[ 7]['a']]>, T[ 7]['load']>>,
  Expect<Equal<entry<[T[ 8]['a']]>, T[ 8]['load']>>,
  Expect<Equal<entry<[T[ 9]['a']]>, T[ 9]['load']>>,
  Expect<Equal<entry<[T[10]['a']]>, T[10]['load']>>,

  Expect<Equal<T['length'], 11>>,
]