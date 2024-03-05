import { expect, test } from "vitest";
import { entry } from './single-i64store.actual';
import { t, T, Ops } from "../../ts-type-math/test-cases/memory-i64";
import { bigIntToTwosComplement, twosComplementToBigInt } from "../../ts-type-math/test-utils";
import { getWasm } from "../utils";
import { Expect, Equal } from "type-testing";

test.each(t)('i64store($a) === $store (%#)', async ({ a, a_binary64, store, store_binary64 }) => {
  expect(a).toEqual(twosComplementToBigInt(a_binary64));
  expect(a_binary64).toEqual(bigIntToTwosComplement(a));
  expect(store).toEqual(twosComplementToBigInt(store_binary64));
  expect(store_binary64).toEqual(bigIntToTwosComplement(store));
  
  const entry = await getWasm<Ops>("from-wat-single", 'single-i64store');
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