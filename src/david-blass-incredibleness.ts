import { Equal, Expect } from "type-testing"
import { runProgram } from "./program.js";

type virtualMachine = runProgram<{
    input: []
    instructions: [
        { kind: "push"; arg: 2 },
        { kind: "push"; arg: 2 },
        { kind: "add" },
        { kind: "push"; arg: 3 },
        { kind: "add" },
    ]
}>['stack'][0]

type testCases = [
    Expect<Equal<add<2, 2>, 4>>,
    Expect<Equal<add<1, 2>, 3>>,
    Expect<Equal<add<0, 2>, 2>>,
    Expect<Equal<add<-1, 2>, 1>>,
    Expect<Equal<add<-2, 2>, 0>>,
    Expect<Equal<add<-3, -3>, -6>>
]
