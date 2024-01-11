[](https://github.com/eliben/wasm-wat-samples)



```
cargo test
```

```ts
// 69
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
  "Select",
  "Unreachable",
]
```

Remaining: (46)

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
