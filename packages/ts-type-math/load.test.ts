import { Equal, Expect } from "type-testing";
import { Load } from "./load";
import { test } from 'vitest';
test('conversion')

type memory = {
  10: "00001000";
  11: "00000100";
  12: "00000010";
  13: "00000001";
}

type testLoad = [
  Expect<Equal<
    Load.ReadBytes<4, memory, 10>,
    ["00001000", "00000100", "00000010", "00000001"]
  >>,
  Expect<Equal<
    Load.ReadBytes<3, memory, 10>,
    ["00001000", "00000100", "00000010"]
  >>,
  Expect<Equal<
    Load.ReadBytes<2, memory, 10>,
    ["00001000", "00000100"]
  >>,
  Expect<Equal<
    Load.ReadBytes<1, memory, 10>,
    ["00001000"]
  >>,
  Expect<Equal<
    Load.ReadBytes<0, memory, 10>,
    []
  >>,
  Expect<Equal<
    Load.ReadBytes<4, memory, 11>,
    // this is what happens if you try to read past the end of memory
    ["00000100", "00000010", "00000001", unknown]
  >>,
  Expect<Equal<
    Load.ReadBytes<1, memory, 11>,
    ["00000100"]
  >>,
  Expect<Equal<
    Load.ReadBytes<1, memory, 12>,
    ["00000010"]
  >>,
  Expect<Equal<
    Load.ReadBytes<1, memory, 13>,
    ["00000001"]
  >>,
]

type testI32 = [
  Expect<Equal<
    Load.I32<["00001000", "00000100", "00000010", "00000001"]>,
    134480385
  >>,

  Expect<Equal<
    Load.I32<["11111111", "11111111", "11111111", "11111111"]>,
    -1
  >>,
]
