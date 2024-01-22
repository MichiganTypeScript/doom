import { Equal, Expect } from "type-testing"
import { runProgram } from "./program.js";
import { ModuleField } from "./module.js";

type $add<
  RESULT extends ModuleField.Func = {
    kind: "func";
    signature: {
        params: ["a", "b"];
        result: number;
    }
    locals: [];
    instructions: [
      { kind: "LocalGet"; id: "a" },
      { kind: "LocalGet"; id: "b" },
      { kind: "add" },
    ]
  }
> = RESULT;

type entry<
  RESULT extends ModuleField.Func = {
    kind: "func";
    signature: {
        params: ["a", "b"];
        result: number;
    }
    locals: [];
    instructions: [
        { kind: "LocalGet"; id: "a" },
        { kind: "LocalGet"; id: "b" },
        { kind: "Call", id: "$add" },
    ]
  }
> = RESULT;

type add<
  input extends number[]
> = runProgram<{
  stack: input;
  module: {
    func: {
      $add: $add;
      entry: entry;
    }
  }
}>

type x = add<[2, 2]>
//   ^?

type testCases = [
    Expect<Equal<add<[2, 2]>, 4>>,
    Expect<Equal<add<[1, 2]>, 3>>,
    Expect<Equal<add<[0, 2]>, 2>>,
    Expect<Equal<add<[-1, 2]>, 1>>,
    Expect<Equal<add<[-2, 2]>, 0>>,
    Expect<Equal<add<[-3, -3]>, -6>>
]