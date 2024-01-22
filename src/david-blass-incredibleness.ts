import { Equal, Expect } from "type-testing"
import { runProgram } from "./program.js";
import { ModuleField } from "./module.js";

type $add<
  RESULT extends ModuleField.Func = {
    kind: "func";
    params: ["$a", "$b"];
    result: number;
    locals: [];
    instructions: [
      { kind: "LocalGet"; id: "$a" },
      { kind: "LocalGet"; id: "$b" },
      { kind: "Add" },
    ];
  }
> = RESULT;

type $entry<
  RESULT extends ModuleField.Func = {
    kind: "func";
    params: ["$a", "$b"];
    result: number;
    locals: [];
    instructions: [
        { kind: "LocalGet"; id: "$a" },
        { kind: "LocalGet"; id: "$b" },
        { kind: "Call", id: "$add" },
    ];
  }
> = RESULT;

type entry<
  input extends number[]
> = runProgram<
  {
    stack: input;
    module: {
      func: {
        $add: $add;
        $entry: $entry;
      }
      globals: {}
    };
  },
  false
>

type dbg = entry<[1, 2]>;
//   ^?

type testCases = [
    Expect<Equal<entry<[2, 2]>, 4>>,
    Expect<Equal<entry<[1, 2]>, 3>>,
    Expect<Equal<entry<[0, 2]>, 2>>,
    Expect<Equal<entry<[-1, 2]>, 1>>,
    Expect<Equal<entry<[-2, 2]>, 0>>,
    Expect<Equal<entry<[-3, -3]>, -6>>
]