# Doom but in TypeScript Types

This is a WebAssembly runtime implemented purely in TypeScript types.  The basic idea is that you can turn C code (or just straight WebAssembly) into a TypeScript type (as in, with no JavaScript runtime code) that will compile the instructions.

## Technical details

Doom's resolution is 320x200.

It looks like it can be run with 4 MiB which equates to 64 pages.

## Progress

Usage count (in Doom) is the number on the right

### Numeric Instructions

#### Constants

| Instruction       | Calls | Implemented? |
| ----------------- | ----- | ------------ |
| I32Const          | 17073 | ✅           |
| I64Const          | 712   | ✅           |
| F64Const          | 37    | ✅           |
| F32Const          | 4     | ✅           |

#### Comparison

| Instruction       | Calls | Implemented? |
| ----------------- | ----- | ------------ |
| I32Eqz            | 1198  | ✅           |
| I32Eq             | 823   | ✅           |
| I32Ne             | 483   | ✅           |
| I32GtS            | 365   | ✅           |
| I32LtS            | 298   | ✅           |
| I32GeS            | 213   | ✅           |
| I32LeS            | 155   | ✅           |
| I32LtU            | 139   | ✅           |
| I32GtU            | 118   | ✅           |
| I32LeU            | 95    | ✅           |
| I32GeU            | 74    | ✅           |
| I64LtU            | 62    | ✅           |
| I64Eqz            | 57    | ✅           |
| I64GtU            | 35    | ✅           |
| I64Ne             | 30    | ✅           |
| I64Eq             | 26    | ✅           |
| I64GeS            | 21    | ✅           |
| I64LtS            | 19    | ✅           |
| I64LeU            | 8     | ✅           |
| I64LeS            | 5     | ✅           |
| I64GtS            | 5     | ✅           |
| I64GeU            | 5     | ✅           |
| F64Lt             | 4     | ❌           |
| F64Ne             | 4     | ❌           |
| F64Eq             | 3     | ❌           |
| F32Lt             | 1     | ❌           |
| F64Ge             | 1     | ❌           |

#### Arithmetic

| Instruction       | Calls | Implemented? |
| ----------------- | ----- | ------------ |
| I32Add            | 4175  | ✅           |
| I32Sub            | 1424  | ✅           |
| I32Mul            | 478   | ✅           |
| I32DivS           | 165   | ❌           |
| I64Add            | 130   | ✅           |
| I64Sub            | 53    | ✅           |
| I64Mul            | 46    | ✅           |
| I32RemS           | 44    | ❌           |
| I32DivU           | 30    | ❌           |
| F64Mul            | 18    | ❌           |
| I32RemU           | 13    | ❌           |
| F64Sub            | 5     | ❌           |
| F64Add            | 5     | ❌           |
| I64DivU           | 3     | ❌           |
| F32Div            | 2     | ❌           |
| F32Mul            | 2     | ❌           |
| F32Add            | 1     | ❌           |
| I64DivS           | 1     | ❌           |
| F64Div            | 1     | ❌           |

#### Conversion

| Instruction       | Calls | Implemented? |
| ----------------- | ----- | ------------ |
| I64ExtendI32U     | 118   | ❌           |
| I32WrapI64        | 53    | ❌           |
| I64ExtendI32S     | 29    | ❌           |
| F64ConvertI32S    | 9     | ❌           |
| F32ConvertI32S    | 4     | ❌           |
| F64ReinterpretI64 | 3     | ❌           |
| I64ReinterpretF64 | 3     | ❌           |
| F64PromoteF32     | 2     | ❌           |
| I32TruncF32S      | 1     | ❌           |
| F32DemoteF64      | 1     | ❌           |
| I32TruncF64U      | 1     | ❌           |
| F64ConvertI32U    | 1     | ❌           |
| I32TruncF64S      | 1     | ❌           |
| I32ReinterpretF32 | 1     | ❌           |
| F32ReinterpretI32 | 1     | ❌           |

#### Floating Point Specific Instructions

| Instruction       | Calls | Implemented? |
| ----------------- | ----- | ------------ |
| F64Neg            | 5     | ✅           |
| F32Abs            | 2     | ✅           |
| F64Abs            | 1     | ✅           |

#### Bitwise

| Instruction       | Calls | Implemented? |
| ----------------- | ----- | ------------ |
| I32Shl            | 954   | ✅           |
| I32And            | 819   | ✅           |
| I32Or             | 488   | ✅           |
| I32Xor            | 411   | ✅           |
| I32Rotl           | 240   | ❌           |
| I32ShrU           | 234   | ✅           |
| I32ShrS           | 230   | ✅           |
| I64Or             | 129   | 🐛           |
| I64ShrU           | 83    | ❌           |
| I64Shl            | 80    | ❌           |
| I64And            | 73    | 🐛           |
| I64Xor            | 34    | 🐛           |
| I64Clz            | 7     | ❌           |
| I32Clz            | 5     | ❌           |
| I64Rotl           | 1     | ❌           |

### Variable Instructions

| Instruction       | Calls | Implemented? |
| ----------------- | ----- | ------------ |
| LocalGet          | 18967 | ✅           |
| LocalTee          | 4081  | ✅           |
| LocalSet          | 3602  | ✅           |
| GlobalSet         | 349   | ✅           |
| GlobalGet         | 179   | ✅           |

### Memory Instructions

| Instruction       | Calls | Implemented? |
| ----------------- | ----- | ------------ |
| I32Load           | 5853  | 🐛           |
| I32Store          | 3413  | 🐛           |
| I32Load8u         | 460   | ✅           |
| I64Load           | 357   | 🐛           |
| I32Load16s        | 278   | ❌           |
| I32Store8         | 253   | ✅           |
| I64Store          | 196   | 🐛           |
| I32Store16        | 188   | ❌           |
| I32Load16u        | 176   | ❌           |
| I32Load8s         | 71    | ❌           |
| I64Load32u        | 6     | ❌           |
| F64Store          | 4     | ❌           |
| I64Store32        | 4     | ❌           |
| F32Load           | 2     | ❌           |
| F32Store          | 2     | ❌           |
| F64Load           | 2     | ❌           |
| I64Store8         | 2     | ❌           |
| I64Load16s        | 1     | ❌           |
| I64Load16u        | 1     | ❌           |
| I64Load8s         | 1     | ❌           |
| I64Load8u         | 1     | ❌           |
| I64Load32s        | 1     | ❌           |
| I64Store16        | 1     | ❌           |
| MemorySize        | 1     | ✅           |

### Control Flow Instructions

| Instruction       | Calls | Implemented? |
| ----------------- | ----- | ------------ |
| End               | 4218  | ✅           |
| Call              | 3824  | ✅           |
| BrIf              | 2041  | ✅           |
| If                | 1888  | ✅           |
| Block             | 1692  | ✅           |
| Br                | 1479  | ✅           |
| Drop              | 504   | ✅           |
| Loop              | 638   | ✅           |
| Select            | 637   | ✅           |
| Return            | 324   | ✅           |
| Unreachable       | 129   | ✅           |
| BrTable           | 114   | ✅           |
| CallIndirect      | 89    | ✅           |
| Else              | 70    | ✅           |
| Nop               | 40    | ✅           |

<sub>⏸️ means things are in progress</sub>
<sub>🐛 means things are known problems</sub>

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
9. Because in the case of exported WAT functions there's a bit of an overlap situation happening, both the exported name (e.g. `entry`) and the WAT identifier (always starts with a `$`, e.g. `$entry`) have types created for them.  This prevents a situation where there's an overlap.  Probably a smarter way around this to globally deduplicate, but this project is in no sense focused on generalized solutions -> just Doom.  This also means that there's potential to trick the program into overwriting a type by creating an export that starts with a dollar sign.  So.  Don't do that.  Also the reason the `start` instruction is sorta hard to target from C so that's why that's not used as a start convention: we need to be able to get the result of the function as a return value to avoid the whole song-and-dance with reading from memory outside the context wasm (like you do in JS, typically).  So same reason then that `main` is basically disregarded.
10. technically multiple function tables are possible, but Doom doesn't use it.  I bet you know what I'm gonna say next. :)  Same for multiple elements.
11. dynamic dispatch is a fun topic.  in WASM the calling convention means that when you call a function you first pop items off the stack equal to the number of params for that func.  but when you `call_indirect` an element from the function lookup table, you hit the problem of needing to first know _how man_ items you're supposed to pop.  anyone that's tried to do functional programming in languages you shouldn't \*cough cough Go cough cough\* will know that the way most people get around this is to set an upper bound on the number of items you can recursively pop off the stack.  But what number should that limit be set at?? You gotta know what I'm gonna say next at this point.  Doom has a maximum of 7 arguments, so that's the maximum (plus the optional 1 return type, which makes 8).
12. TypeScript is patched with [a pnpm patch](https://pnpm.io/cli/patch) to set the recursion limit to Number.MAX_SAFE_INTEGER (instead of 100, lol).  Hopefully it's painfully obvious that you can't run a program like Doom without a heck of a lot more than 100 loops (which, loops take up recursion count).
13. Don't know and don't care if it works anywhere but on Linux.  On the TypeScript side, I mean, it definitely will because it's just regular TypeScript.  But like.. if you have to increase your computer's default stack size to run this: you're on your own on that one (there is a handy script `determine-stack-size.js` you can run to find out).  Like.. this uses a recursive WASM parser and even on the Rust side if you don't increase the stack limit it'll stack-overflow after like 200 loops (lol).

## Links

- https://diekmann.github.io/wasm-fizzbuzz/doom
- https://diekmann.github.io/wasm-fizzbuzz/doom/doom.wasm
- https://doom.fandom.com/wiki/Doom_source_code_files
- https://github.com/eliben/wasm-wat-samples
- https://github.com/WebAssembly/testsuite

## Tour of Ridiculous Types

> _"we're not in Kansas anymore"_

- [ShiftRight](./packages/ts-type-math/shift.ts)
