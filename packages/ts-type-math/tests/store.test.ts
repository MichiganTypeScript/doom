import type { Expect, Equal } from "type-testing";
import type { AsciiToU8Binary, AsciiToU8Decimal, BytePatch, Store, StoreString, U8BinaryToAscii, U8DecimalToAscii } from "../store";
import { test } from 'vitest';
import { ReadStringFromMemory } from "../memory-read-string";

test('store')

type atodtoa = U8DecimalToAscii<AsciiToU8Decimal<"from ascii to decimal and back">>;
//   ^?

type atobtoa = U8BinaryToAscii<AsciiToU8Binary<"from ascii to binary and back">>;
//   ^?

type p1024 = '00000000000000000000010000000000';
type memory = StoreString<p1024, "Let's hope this works..">;
type read = ReadStringFromMemory<{ memory: memory, stack: [p1024] }>;

type encode = [
  Expect<Equal<memory['00000000000000000000010000000000'], '01001100'>>,
  Expect<Equal<memory['00000000000000000000010000000001'], '01100101'>>,
  Expect<Equal<memory['00000000000000000000010000000010'], '01110100'>>,
  Expect<Equal<memory['00000000000000000000010000000011'], '00100111'>>,
  Expect<Equal<memory['00000000000000000000010000000100'], '01110011'>>,
  Expect<Equal<memory['00000000000000000000010000000101'], '00100000'>>,
  Expect<Equal<memory['00000000000000000000010000000110'], '01101000'>>,
  Expect<Equal<memory['00000000000000000000010000000111'], '01101111'>>,
  Expect<Equal<memory['00000000000000000000010000001000'], '01110000'>>,
  Expect<Equal<memory['00000000000000000000010000001001'], '01100101'>>,
  Expect<Equal<memory['00000000000000000000010000001010'], '00100000'>>,
  Expect<Equal<memory['00000000000000000000010000001011'], '01110100'>>,
  Expect<Equal<memory['00000000000000000000010000001100'], '01101000'>>,
  Expect<Equal<memory['00000000000000000000010000001101'], '01101001'>>,
  Expect<Equal<memory['00000000000000000000010000001110'], '01110011'>>,
  Expect<Equal<memory['00000000000000000000010000001111'], '00100000'>>,
  Expect<Equal<memory['00000000000000000000010000010000'], '01110111'>>,
  Expect<Equal<memory['00000000000000000000010000010001'], '01101111'>>,
  Expect<Equal<memory['00000000000000000000010000010010'], '01110010'>>,
  Expect<Equal<memory['00000000000000000000010000010011'], '01101011'>>,
  Expect<Equal<memory['00000000000000000000010000010100'], '01110011'>>,
  Expect<Equal<memory['00000000000000000000010000010101'], '00101110'>>,
  Expect<Equal<memory['00000000000000000000010000010110'], '00101110'>>,

  Expect<Equal<read, "Let's hope this works..">>,
]

type z = memory['00000000000000000000010000010100'] // =>

type numbers = [
  '00000000000000000000000000000000',
  '00000000000000000000000000000001',
  '00000000000000000000000000000010',
  '00000000000000000000000000000011',
  '00000001000000100000010000001000', // 16909320
]

type x = Store.I32<numbers[4]>; // =>

type storeTests = [
  Expect<Equal<Store.I32<numbers[0]>, ["00000000", "00000000", "00000000", "00000000"]>>,
  Expect<Equal<Store.I32<numbers[1]>, ["00000000", "00000000", "00000000", "00000001"]>>,
  Expect<Equal<Store.I32<numbers[2]>, ["00000000", "00000000", "00000000", "00000010"]>>,
  Expect<Equal<Store.I32<numbers[3]>, ["00000000", "00000000", "00000000", "00000011"]>>,
  Expect<Equal<Store.I32<numbers[4]>, ["00000001", "00000010", "00000100", "00001000"]>>,
]

type y = Store.GetLSB<numbers[0]> // =>

type lsb = [
  Expect<Equal<Store.GetLSB<numbers[0]>, ['00000000']>>,
  Expect<Equal<Store.GetLSB<numbers[1]>, ['00000001']>>,
  Expect<Equal<Store.GetLSB<numbers[2]>, ['00000010']>>,
  Expect<Equal<Store.GetLSB<numbers[3]>, ['00000011']>>,
  Expect<Equal<Store.GetLSB<numbers[4]>, ['00001000']>>,
]


type S = {
  "00000000000000000000000000000000": "00101110"; // keeping because it hasn't changed
  "00000000000000000000000000000001": "00101110"; // removing because the update is false
  //TODO "00000000000000000000000000000010": "00000000"; // removing because it shouldn't be here anyway

  "00000000000000000000000100000011": "00000001"; // keeping because it's random other data
}

type U = {
  "00000000000000000000000000000000": "00101110"; // no change because it matches the input
  "00000000000000000000000000000001": "00000000"; // remove from the input
//"00000000000000000000000000000010" // not present
  "00000000000000000000000000000011": "00000000"; // skipping because it's false
  "00000000000000000000000000000100": "00000001"; // appending because it's not false
}

type X = BytePatch<S, U>; // =>

type t = Expect<Equal<X, {
  "00000000000000000000000000000000": "00101110";
  "00000000000000000000000100000011": "00000001";
  "00000000000000000000000000000100": "00000001";
}>>;
