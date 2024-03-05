import { expect, test } from "vitest";
import { entry } from './single-i64load32_u.actual';
import { t, T, Ops } from "../../ts-type-math/test-cases/memory-i64";
import { bigIntToTwosComplement, twosComplementToBigInt } from "../../ts-type-math/test-utils";
import { getWasm } from "../utils";
import { Expect, Equal } from "type-testing";

test.each(t)('i64load32_u($a) === $load32_u (%#)', async ({ a, a_binary64, load32_u, load32_u_binary64 }) => {
  expect(a).toEqual(twosComplementToBigInt(a_binary64));
  expect(a_binary64).toEqual(bigIntToTwosComplement(a));
  expect(load32_u).toEqual(twosComplementToBigInt(load32_u_binary64));
  expect(load32_u_binary64).toEqual(bigIntToTwosComplement(load32_u));
  
  const entry = await getWasm<Ops>("from-wat-single", 'single-i64load32_u');
  expect(entry(a)).toStrictEqual(load32_u);
});

type i = 2
type a = T[i]['a']       // =>
type e = T[i]['load32_u']// =>
type x = entry<[a]>      // =>

type tests = [
  Expect<Equal<entry<[T[ 0]['a']]>, T[ 0]['load32_u']>>,
  Expect<Equal<entry<[T[ 1]['a']]>, T[ 1]['load32_u']>>,
  Expect<Equal<entry<[T[ 2]['a']]>, T[ 2]['load32_u']>>,
  Expect<Equal<entry<[T[ 3]['a']]>, T[ 3]['load32_u']>>,
  Expect<Equal<entry<[T[ 4]['a']]>, T[ 4]['load32_u']>>,
  Expect<Equal<entry<[T[ 5]['a']]>, T[ 5]['load32_u']>>,
  Expect<Equal<entry<[T[ 6]['a']]>, T[ 6]['load32_u']>>,
  Expect<Equal<entry<[T[ 7]['a']]>, T[ 7]['load32_u']>>,
  Expect<Equal<entry<[T[ 8]['a']]>, T[ 8]['load32_u']>>,
  Expect<Equal<entry<[T[ 9]['a']]>, T[ 9]['load32_u']>>,
  Expect<Equal<entry<[T[10]['a']]>, T[10]['load32_u']>>,

  Expect<Equal<T['length'], 11>>,
]