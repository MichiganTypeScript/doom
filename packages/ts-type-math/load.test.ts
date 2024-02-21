import { Equal, Expect } from "type-testing";
import { Load } from "./load";
import { test } from 'vitest';

test('load')


type k = [
  "00000000000000000000010000000000",
  "00000000000000000000010000000001",
  "00000000000000000000010000000010",
  "00000000000000000000010000000011",
  "00000000000000000000010000000100",
  "00000000000000000000010000000101",
  "00000000000000000000010000000110",
  "00000000000000000000010000000111",
]

type v = [
  '00000001',
  '00000010',
  '00000100',
  '00001000',
  '00010000',
  '00100000',
  '01000000',
  '10000000',
]

export type memory = {
  "00000000000000000000010000000000": v[0]
  "00000000000000000000010000000001": v[1]
  "00000000000000000000010000000010": v[2]
  "00000000000000000000010000000011": v[3]
  "00000000000000000000010000000100": v[4]
  "00000000000000000000010000000101": v[5]
  "00000000000000000000010000000110": v[6]
  "00000000000000000000010000000111": v[7]
}

type i = 0
type ki = k[i]                       // =>
type vi = v[i]                       // =>
type xi = Load.Read2Bytes<memory, ki>// =>

type testRead1Byte = [
  Expect<Equal<Load.Read1Byte<memory, k[0]>, v[0]>>,
  Expect<Equal<Load.Read1Byte<memory, k[1]>, v[1]>>,
  Expect<Equal<Load.Read1Byte<memory, k[2]>, v[2]>>,
  Expect<Equal<Load.Read1Byte<memory, k[3]>, v[3]>>,
  Expect<Equal<Load.Read1Byte<memory, k[4]>, v[4]>>,
  Expect<Equal<Load.Read1Byte<memory, k[5]>, v[5]>>,
  Expect<Equal<Load.Read1Byte<memory, k[6]>, v[6]>>,
  Expect<Equal<Load.Read1Byte<memory, k[7]>, v[7]>>,

  Expect<Equal<Load.Read2Bytes<memory, k[0]>, `${v[0]}${v[1]}`>>,
  Expect<Equal<Load.Read2Bytes<memory, k[1]>, `${v[1]}${v[2]}`>>,
  Expect<Equal<Load.Read2Bytes<memory, k[2]>, `${v[2]}${v[3]}`>>,
  Expect<Equal<Load.Read2Bytes<memory, k[3]>, `${v[3]}${v[4]}`>>,
  Expect<Equal<Load.Read2Bytes<memory, k[4]>, `${v[4]}${v[5]}`>>,
  Expect<Equal<Load.Read2Bytes<memory, k[5]>, `${v[5]}${v[6]}`>>,
  Expect<Equal<Load.Read2Bytes<memory, k[6]>, `${v[6]}${v[7]}`>>,

  Expect<Equal<Load.Read4Bytes<memory, k[0]>, `${v[0]}${v[1]}${v[2]}${v[3]}`>>,
  Expect<Equal<Load.Read4Bytes<memory, k[1]>, `${v[1]}${v[2]}${v[3]}${v[4]}`>>,
  Expect<Equal<Load.Read4Bytes<memory, k[2]>, `${v[2]}${v[3]}${v[4]}${v[5]}`>>,
  Expect<Equal<Load.Read4Bytes<memory, k[3]>, `${v[3]}${v[4]}${v[5]}${v[6]}`>>,
  Expect<Equal<Load.Read4Bytes<memory, k[4]>, `${v[4]}${v[5]}${v[6]}${v[7]}`>>,
];

type testJoinBytes = [
  Expect<Equal<Load.JoinBytes<["00001000", "00000100", "00000010", "00000001"]>, "00001000000001000000001000000001">>,
  Expect<Equal<Load.JoinBytes<["11111111", "11111111", "11111111", "11111111"]>, "11111111111111111111111111111111">>,
  Expect<Equal<Load.JoinBytes<["00000000"]>, "00000000">>,
  Expect<Equal<Load.JoinBytes<['12345678', "00000000"]>, "1234567800000000">>,
  Expect<Equal<Load.JoinBytes<['12345678', "00000000", "abcdefgh", "00000000"]>, "1234567800000000abcdefgh00000000">>,
  Expect<Equal<Load.JoinBytes<['12345678', "00000000", "abcdefgh", "00000000", "11111111", "22222222", "33333333", "44444444"]>, "1234567800000000abcdefgh0000000011111111222222223333333344444444">>,
  Expect<Equal<Load.JoinBytes<['11111111', '11111111', '11111111', '11111111']>, '11111111111111111111111111111111'>>,
]

type y = Load.JoinBytes<['12345678', "00000000"]>; // =>

