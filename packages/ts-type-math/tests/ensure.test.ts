import { Equal, Expect } from "type-testing";
import { Ensure } from "../ensure";
import { Wasm } from "../wasm";
import { test } from "vitest";

test('Ensure.Length', () => {});

type test = [
  Expect<Equal<
    Ensure.Length<
    "abcdefghijk",
       "00000000"
    >,
       "defghijk"
  >>,

  Expect<Equal<
    Ensure.Length<
           "abcd",
       "00000000"
    >,
       "0000abcd"
  >>,

  Expect<Equal<
    Ensure.I32<"">,
    Wasm.I32False
  >>,

  Expect<Equal<
    Ensure.I32<"0">,
    Wasm.I32False
  >>,

  Expect<Equal<
    Ensure.I32<"1111111111111100000000000000000000000000000000">,
    Wasm.I32False
  >>,

  Expect<Equal<
    Ensure.I32<Wasm.I32True>,
    Wasm.I32True
  >>,
]