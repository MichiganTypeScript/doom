import { expect, test } from "vitest";
import { entry } from './single-i32store16';
import { t, T, Ops } from "../../ts-type-math/test-cases/memory";
import { numberToTwosComplement, twosComplementToNumber } from "../../ts-type-math/test-utils";
import { getWasm } from "../utils";
import { Expect, Equal } from "type-testing";

test.each(t)('i32store16($a) === $store16 (%#)', async ({ a, a_binary, store16, store16_binary }) => {
  expect(a).toEqual(twosComplementToNumber(a_binary));
  expect(a_binary).toEqual(numberToTwosComplement(a));
  expect(store16).toEqual(twosComplementToNumber(store16_binary));
  expect(store16_binary).toEqual(numberToTwosComplement(store16));
  
  const entry = await getWasm<Ops>("from-wat-single", 'single-i32store16');
  expect(entry(a)).toStrictEqual(store16);
});

type i = 7
type a = T[i]['a']      // =>
type e = T[i]['store16']// =>
type x = entry<[a]>     // =>

type tests = [
  Expect<Equal<entry<[T[ 0]['a']]>, T[ 0]['store16']>>,
  Expect<Equal<entry<[T[ 1]['a']]>, T[ 1]['store16']>>,
  Expect<Equal<entry<[T[ 2]['a']]>, T[ 2]['store16']>>,
  Expect<Equal<entry<[T[ 3]['a']]>, T[ 3]['store16']>>,
  Expect<Equal<entry<[T[ 4]['a']]>, T[ 4]['store16']>>,
  Expect<Equal<entry<[T[ 5]['a']]>, T[ 5]['store16']>>,
  Expect<Equal<entry<[T[ 6]['a']]>, T[ 6]['store16']>>,
  Expect<Equal<entry<[T[ 7]['a']]>, T[ 7]['store16']>>,
  Expect<Equal<entry<[T[ 8]['a']]>, T[ 8]['store16']>>,
  Expect<Equal<entry<[T[ 9]['a']]>, T[ 9]['store16']>>,
  Expect<Equal<entry<[T[10]['a']]>, T[10]['store16']>>,

  Expect<Equal<T['length'], 11>>,
]