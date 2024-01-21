# Doom but in TypeScript Types

## Technical details

Doom's resolution is 320x200.

## Links

https://diekmann.github.io/wasm-fizzbuzz/doom/

https://diekmann.github.io/wasm-fizzbuzz/doom/doom.wasm

https://doom.fandom.com/wiki/Doom_source_code_files

https://github.com/eliben/wasm-wat-samples

## Progress

### Done (70)

```ts
const currentlyImplemented = [
  "Block",
  "Br",
  "BrIf",
  "Call",
  "Else",
  "End",
  "F32Abs",
  "F32Add",
  "F32Eq",
  "F32Ge",
  "F32Gt",
  "F32Le",
  "F32Lt",
  "F32Mul",
  "F32Ne",
  "F32Neg",
  "F32Sub",
  "F64Abs",
  "F64Add",
  "F64Const",
  "F64Eq",
  "F64Ge",
  "F64Gt",
  "F64Le",
  "F64Lt",
  "F64Mul",
  "F64Ne",
  "F64Neg",
  "F64Sub",
  "I32Add",
  "I32Const",
  "I32DivS",
  "I32DivU",
  "I32Eq",
  "I32Eqz",
  "I32GeS",
  "I32GeU",
  "I32GtS",
  "I32GtU",
  "I32LeS",
  "I32LeU",
  "I32LtS",
  "I32LtU",
  "I32Mul",
  "I32Ne",
  "I32Sub",
  "I64Add",
  "I64Const",
  "I64DivS",
  "I64DivU",
  "I64Eq",
  "I64Eqz",
  "I64GeS",
  "I64GeU",
  "I64GtS",
  "I64GtU",
  "I64LeS",
  "I64LeU",
  "I64LtS",
  "I64LtU",
  "I64Mul",
  "I64Ne",
  "I64Sub",
  "If",
  "LocalGet",
  "LocalSet",
  "LocalTee",
  "Nop",
  "Select",
  "Unreachable",
]
```

### Remaining (46)

Usage count (in Doom) is the number on the right

```text
BrTable: 4

CallIndirect: 8

Drop: 17

GlobalGet: 18

GlobalSet: 26

I32And: 92
I64And: 11

F64ConvertI32S: 1
F64ConvertI32U: 1

I64ExtendI32S: 3S
I64ExtendI32U: 11

I32Load8s: 16
I64Load8s: 1
I32Load8u: 27
I64Load8u: 1
I64Load16s: 1
I64Load16u: 1
I64Load32s: 3
I64Load32u: 8
F64Load: 2
I32Load: 203
I64Load: 20

I32Or: 31
I64Or: 11

F64ReinterpretI64: 2
I64ReinterpretF64: 2

I32RemU: 2

I32Shl: 24
I64Shl: 8

I32ShrS: 8
I32ShrU: 11
I64ShrU: 11

I64Store8: 1
I32Store8: 42
I32Store16: 1
I64Store32: 2
F64Store: 2
I32Store: 161
I64Store: 31

I32TruncF64S: 1
I32TruncF64U: 1

I32WrapI64: 7

I32Xor: 18
I64Xor: 2

Loop: 58

Return: 32
```

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
