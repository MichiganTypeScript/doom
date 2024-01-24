# Doom but in TypeScript Types

## Technical details

Doom's resolution is 320x200.

It looks like it can be run with 4 MiB which equates to 64 pages.

## Links

- https://diekmann.github.io/wasm-fizzbuzz/doom
- https://diekmann.github.io/wasm-fizzbuzz/doom/doom.wasm
- https://doom.fandom.com/wiki/Doom_source_code_files
- https://github.com/eliben/wasm-wat-samples

## Progress

Usage count (in Doom) is the number on the right

| Instruction       | Calls | Implemented? |
| ----------------- | ----- | ------------ |
| LocalGet          | 18967 | ✅           |
| I32Const          | 17073 | ✅           |
| I32Load           | 5853  | ✅           |
| End               | 4218  | ❌ c-add     |
| I32Add            | 4175  | ✅           |
| LocalTee          | 4081  | ✅           |
| Call              | 3824  | ✅           |
| LocalSet          | 3602  | ✅           |
| I32Store          | 3413  | ✅           |
| BrIf              | 2041  | ❌ c-add     |
| If                | 1888  | ⏸️           |
| Block             | 1692  | ❌ c-add     |
| Br                | 1479  | ❌           |
| I32Sub            | 1424  | ✅           |
| I32Eqz            | 1198  | ✅           |
| I32Shl            | 954   | ❌           |
| I32Eq             | 823   | ❌           |
| I32And            | 819   | ❌ c-add     |
| I64Const          | 712   | ✅           |
| Loop              | 638   | ❌           |
| Select            | 637   | ❌           |
| Drop              | 504   | ❌           |
| I32Or             | 488   | ❌           |
| I32Ne             | 483   | ❌           |
| I32Mul            | 478   | ✅           |
| I32Load8u         | 460   | ❌           |
| I32Xor            | 411   | ❌           |
| I32GtS            | 365   | ✅           |
| I64Load           | 357   | ✅           |
| GlobalSet         | 349   | ✅           |
| Return            | 324   | ✅           |
| I32LtS            | 298   | ✅           |
| I32Load16s        | 278   | ❌           |
| I32Store8         | 253   | ❌           |
| I32Rotl           | 240   | ❌           |
| I32ShrU           | 234   | ❌           |
| I32ShrS           | 230   | ❌           |
| I32GeS            | 213   | ✅           |
| I64Store          | 196   | ✅           |
| I32Store16        | 188   | ❌           |
| GlobalGet         | 179   | ✅           |
| I32Load16u        | 176   | ❌           |
| I32DivS           | 165   | ❌           |
| I32LeS            | 155   | ✅           |
| I32LtU            | 139   | ✅           |
| I64Add            | 130   | ✅           |
| Unreachable       | 129   | ❌           |
| I64Or             | 129   | ❌           |
| I32GtU            | 118   | ✅           |
| I64ExtendI32U     | 118   | ❌           |
| BrTable           | 114   | ❌           |
| I32LeU            | 95    | ✅           |
| CallIndirect      | 89    | ❌           |
| I64ShrU           | 83    | ❌           |
| I64Shl            | 80    | ❌           |
| I32GeU            | 74    | ✅           |
| I64And            | 73    | ❌           |
| I32Load8s         | 71    | ❌           |
| Else              | 70    | ❌           |
| I64LtU            | 62    | ✅           |
| I64Eqz            | 57    | ✅           |
| I32WrapI64        | 53    | ❌           |
| I64Sub            | 53    | ❌           |
| I64Mul            | 46    | ✅           |
| I32RemS           | 44    | ❌           |
| Nop               | 40    | ✅           |
| F64Const          | 37    | ❌           |
| I64GtU            | 35    | ✅           |
| I64Xor            | 34    | ❌           |
| I32DivU           | 30    | ❌           |
| I64Ne             | 30    | ❌           |
| I64ExtendI32S     | 29    | ❌           |
| I64Eq             | 26    | ❌           |
| I64GeS            | 21    | ✅           |
| I64LtS            | 19    | ✅           |
| F64Mul            | 18    | ✅           |
| I32RemU           | 13    | ❌           |
| F64ConvertI32S    | 9     | ❌           |
| I64LeU            | 8     | ✅           |
| I64Clz            | 7     | ❌           |
| I64Load32u        | 6     | ❌           |
| F64Sub            | 5     | ❌           |
| F64Add            | 5     | ✅           |
| I64LeS            | 5     | ✅           |
| I64GtS            | 5     | ✅           |
| F64Neg            | 5     | ✅           |
| I64GeU            | 5     | ✅           |
| I32Clz            | 5     | ❌           |
| F32Const          | 4     | ❌           |
| F64Lt             | 4     | ✅           |
| F32ConvertI32S    | 4     | ❌           |
| F64Store          | 4     | ❌           |
| I64Store32        | 4     | ❌           |
| F64Ne             | 4     | ❌           |
| F64ReinterpretI64 | 3     | ❌           |
| I64DivU           | 3     | ❌           |
| I64ReinterpretF64 | 3     | ❌           |
| F64Eq             | 3     | ❌           |
| F32Load           | 2     | ❌           |
| F32Abs            | 2     | ❌           |
| F64PromoteF32     | 2     | ❌           |
| F32Div            | 2     | ❌           |
| F32Store          | 2     | ❌           |
| F32Mul            | 2     | ✅           |
| F64Load           | 2     | ❌           |
| I64Store8         | 2     | ❌           |
| I64Rotl           | 1     | ❌           |
| F32Add            | 1     | ✅           |
| F32Lt             | 1     | ✅           |
| I32TruncF32S      | 1     | ❌           |
| I64DivS           | 1     | ❌           |
| F32DemoteF64      | 1     | ❌           |
| F64Div            | 1     | ❌           |
| I64Load16s        | 1     | ❌           |
| I64Load16u        | 1     | ❌           |
| I64Load8s         | 1     | ❌           |
| I64Load8u         | 1     | ❌           |
| I64Load32s        | 1     | ❌           |
| F64Ge             | 1     | ✅           |
| I32TruncF64U      | 1     | ❌           |
| F64ConvertI32U    | 1     | ❌           |
| F64Abs            | 1     | ❌           |
| I32TruncF64S      | 1     | ❌           |
| I64Store16        | 1     | ❌           |
| MemorySize        | 1     | ❌           |
| I32ReinterpretF32 | 1     | ❌           |
| F32ReinterpretI32 | 1     | ❌           |

<sub>⏸️ means things are in progress</sub>

## Design decisions

EVERY effort has been taken to not support something that Doom doesn't explicitly need.  This project is LASER-FUCKING-FOCUSED on Doom and nothing else (and, at the expense of all else).

1. all instructions not explicitly needed by Doom are not implemented.
2. multiple returns aren't needed because Doom doesn't use them.  this was actually implemented by accident (under the assumption that Doom needs it) and then removed when it was discovered that it doesn't need it (it is much simpler overall to not need to implement it).
3. you can technically remove `param` and `result` declarations for a function and use a `type` declaration instead.  while that's a nice optimization, it isn't needed to run Doom and therefore the `type` declarations are all ignored.
4. module field exports were implemented before I knew that there's an emcc flag to disable them.  so although that code wasn't technically removed (because it's so small) it is not a tested path anymore.
5. wherever possible, the folded expression variants are used (i.e. `if`, `select`, `block`, etc.).  there may be places where unfolded expressions are supported just because it's identical or almost identical in the parser library (wast), but it's not something being directly tested.
6. module-level declarations that aren't needed including: recursion groups, start, tag, custom, and more.
7. unnamed types, funcs, or variables.  it's quite common in .wat files to omit the name (i.e. the thing starting with `$` for a declaration) but it's required for this program.  there's an emcc flag that will force this.
8. In C, you can't really return anything from a `main` function (just an integer representing an exit code).  That means we need to create our own entry point since we want the program to return some output (rather than, for example, writing to standard out or something, which we have no way to capture).  So we use the convention of creating an `entry` function for the whole program that acts as the entry point.
9. Because in the case of exported WAT functions there's a bit of an overlap situation happening, both the exported name (e.g. `entry`) and the WAT identifier (always starts with a `$`, e.g. `$entry`) have types created for them.  This prevents a situation where there's an overlap.  Probably a smarter way around this to globally deduplicate, but this project is in no sense focused on generalized solutions -> just Doom.  This also means that there's potential to trick the program into overwriting a type by creating an export that starts with a dollar sign.  So.  Don't do that.
