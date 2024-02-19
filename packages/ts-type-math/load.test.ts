import { Equal, Expect } from "type-testing";
import { Load } from "./load";
import { test } from 'vitest';
import { Convert } from './conversion';

test('conversion')

export type memory = {
  "00000000000000000000000000001010": '00001000',
  "00000000000000000000000000001011": '00000100',
  "00000000000000000000000000001100": '00000010',
  "00000000000000000000000000001101": '00000001',
}

type testLoad = [
  Expect<Equal<
    Load.ReadBytes<4, memory, Convert.TSNumber.ToWasmValue<10, 'i32'>>,
    ["00001000", "00000100", "00000010", "00000001"]
  >>,
  Expect<Equal<
    Load.ReadBytes<3, memory, Convert.TSNumber.ToWasmValue<10, 'i32'>>,
    ["00001000", "00000100", "00000010"]
  >>,
  Expect<Equal<
    Load.ReadBytes<2, memory, Convert.TSNumber.ToWasmValue<10, 'i32'>>,
    ["00001000", "00000100"]
  >>,
  Expect<Equal<
    Load.ReadBytes<1, memory, Convert.TSNumber.ToWasmValue<10, 'i32'>>,
    ["00001000"]
  >>,
  Expect<Equal<
    Load.ReadBytes<0, memory, Convert.TSNumber.ToWasmValue<10, 'i32'>>,
    []
  >>,
  // Expect<Equal<
  //   Load.ReadBytes<4, memory, Convert.TSNumber.ToWasmValue<11, 'i32'>>,
  //   // this is what happens if you try to read past the end of memory
  //   never
  // >>,
  Expect<Equal<
    Load.ReadBytes<1, memory, Convert.TSNumber.ToWasmValue<11, 'i32'>>,
    ["00000100"]
  >>,
  Expect<Equal<
    Load.ReadBytes<1, memory, Convert.TSNumber.ToWasmValue<12, 'i32'>>,
    ["00000010"]
  >>,
  Expect<Equal<
    Load.ReadBytes<1, memory, Convert.TSNumber.ToWasmValue<13, 'i32'>>,
    ["00000001"]
  >>,
]

type testI32 = [
  Expect<Equal<
    Load.JoinBytes<["00001000", "00000100", "00000010", "00000001"]>,
    "00001000000001000000001000000001"
  >>,

  Expect<Equal<
    Load.JoinBytes<["11111111", "11111111", "11111111", "11111111"]>,
    "11111111111111111111111111111111"
  >>,
]


type t = Load.JoinBytes<["1234567800000000"]>; // =>

type join = [
  Expect<Equal<Load.JoinBytes<["00000000"]>, "00000000">>,
  Expect<Equal<Load.JoinBytes<['12345678', "00000000"]>, "1234567800000000">>,
  Expect<Equal<Load.JoinBytes<['12345678', "00000000", "abcdefgh", "00000000"]>, "1234567800000000abcdefgh00000000">>,
  Expect<Equal<Load.JoinBytes<['12345678', "00000000", "abcdefgh", "00000000", "11111111", "22222222", "33333333", "44444444"]>, "1234567800000000abcdefgh0000000011111111222222223333333344444444">>,
  Expect<Equal<Load.JoinBytes<['11111111', '11111111', '11111111', '11111111']>, '11111111111111111111111111111111'>>,
]