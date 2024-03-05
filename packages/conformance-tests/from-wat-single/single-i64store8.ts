import { expect, test } from "vitest";
import { entry } from './single-i64store8.actual';
import { t, T, Ops } from "../../ts-type-math/test-cases/memory-i64";
import { bigIntToTwosComplement, twosComplementToBigInt } from "../../ts-type-math/test-utils";
import { getWasm } from "../utils";
import { Expect, Equal } from "type-testing";

test.each(t)('i64store8($a) === $store8 (%#)', async ({ a, a_binary64, store8, store8_binary64 }) => {
  expect(a).toEqual(twosComplementToBigInt(a_binary64));
  expect(a_binary64).toEqual(bigIntToTwosComplement(a));
  expect(store8).toEqual(twosComplementToBigInt(store8_binary64));
  expect(store8_binary64).toEqual(bigIntToTwosComplement(store8));
  
  const entry = await getWasm<Ops>("from-wat-single", 'single-i64store8');
  expect(entry(a)).toStrictEqual(store8);
});

type i = 7
type a = T[i]['a']     // =>
type e = T[i]['store8']// =>
type x = entry<[a]>    // =>

type tests = [
  Expect<Equal<entry<[T[ 0]['a']]>, T[ 0]['store8']>>,
  Expect<Equal<entry<[T[ 1]['a']]>, T[ 1]['store8']>>,
  Expect<Equal<entry<[T[ 2]['a']]>, T[ 2]['store8']>>,
  Expect<Equal<entry<[T[ 3]['a']]>, T[ 3]['store8']>>,
  Expect<Equal<entry<[T[ 4]['a']]>, T[ 4]['store8']>>,
  Expect<Equal<entry<[T[ 5]['a']]>, T[ 5]['store8']>>,
  Expect<Equal<entry<[T[ 6]['a']]>, T[ 6]['store8']>>,
  Expect<Equal<entry<[T[ 7]['a']]>, T[ 7]['store8']>>,
  Expect<Equal<entry<[T[ 8]['a']]>, T[ 8]['store8']>>,
  Expect<Equal<entry<[T[ 9]['a']]>, T[ 9]['store8']>>,
  Expect<Equal<entry<[T[10]['a']]>, T[10]['store8']>>,

  Expect<Equal<T['length'], 11>>,
]