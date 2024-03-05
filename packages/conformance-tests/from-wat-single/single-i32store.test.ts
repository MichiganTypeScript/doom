import { expect, test } from "vitest";
import { entry } from './single-i32store.actual';
import { t, T, Ops } from "../../ts-type-math/test-cases/memory";
import { numberToTwosComplement, twosComplementToNumber } from "../../ts-type-math/test-utils";
import { getWasm } from "../utils";
import { Expect, Equal } from "type-testing";

test.each(t)('i32store($a) === $store (%#)', async ({ a, a_binary, store, store_binary }) => {
  expect(a).toEqual(twosComplementToNumber(a_binary));
  expect(a_binary).toEqual(numberToTwosComplement(a));
  expect(store).toEqual(twosComplementToNumber(store_binary));
  expect(store_binary).toEqual(numberToTwosComplement(store));
  
  const entry = await getWasm<Ops>("from-wat-single", 'single-i32store');
  expect(entry(a)).toStrictEqual(store);
});

type i = 8
type a = T[i]['a']    // =>
type e = T[i]['store']// =>
type x = entry<[a]>   // =>

type tests = [
  Expect<Equal<entry<[T[ 0]['a']]>, T[ 0]['store']>>,
  Expect<Equal<entry<[T[ 1]['a']]>, T[ 1]['store']>>,
  Expect<Equal<entry<[T[ 2]['a']]>, T[ 2]['store']>>,
  Expect<Equal<entry<[T[ 3]['a']]>, T[ 3]['store']>>,
  Expect<Equal<entry<[T[ 4]['a']]>, T[ 4]['store']>>,
  Expect<Equal<entry<[T[ 5]['a']]>, T[ 5]['store']>>,
  Expect<Equal<entry<[T[ 6]['a']]>, T[ 6]['store']>>,
  Expect<Equal<entry<[T[ 7]['a']]>, T[ 7]['store']>>,
  Expect<Equal<entry<[T[ 8]['a']]>, T[ 8]['store']>>,
  Expect<Equal<entry<[T[ 9]['a']]>, T[ 9]['store']>>,
  Expect<Equal<entry<[T[10]['a']]>, T[10]['store']>>,

  Expect<Equal<T['length'], 11>>,
]