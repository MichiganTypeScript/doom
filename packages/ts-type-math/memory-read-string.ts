import { U8Binary } from "./conversion";
import type { Convert } from "./conversion"
import { Wasm, WasmValue } from "./wasm";

export type NullTerminatorBinary = "00000000";

export type ReadUntilNullTerminator<
  memory extends Record<WasmValue, Wasm.Byte>,

  address extends WasmValue,
> =
  memory[address] extends NullTerminatorBinary
  ? ''
  : `${
      memory[address] extends U8Binary
      ? Convert.U8Binary.ToAscii<memory[address]>
      : ''
    }${
      ReadUntilNullTerminator<
        memory,
        Wasm.I32Add<Wasm.I32True, address>
      >
    }`

export type ReadStringFromMemory<
  state extends {
    stack: WasmValue[]
    memory: Record<WasmValue, Wasm.Byte>
  },
> = Satisfies<string,
  ReadUntilNullTerminator<
    state['memory'],
    state['stack'][0] // startAddress
  >
>