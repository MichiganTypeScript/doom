import { U8Binary } from "./conversion";
import type { Convert } from "./conversion"
import { Wasm, WasmValue } from "./wasm";
import type { Satisfies } from './utils'

export type ReadUntilNullTerminator<
  memory extends Record<WasmValue, Wasm.Byte>,

  address extends WasmValue,
> =
  address extends keyof memory // POTENTIAL_OPTIMIZATION: `unknown extends memory[address]`
  ? `${
      memory[address] extends U8Binary
      ? Convert.U8Binary.ToAscii<memory[address]>
      : ''
    }${
      ReadUntilNullTerminator<
        memory,
        Wasm.I32Add<Wasm.I32True, address>
      >
    }`
  : '' // we've reached the end of the string (presumably)

export type ReadStringFromMemory<
  state extends {
    memory: Record<WasmValue, Wasm.Byte>

    /** the pointer in memory where the result is stored */
    stack: WasmValue[]
  },
> = Satisfies<string,
  ReadUntilNullTerminator<
    state['memory'],
    state['stack'][0] // the pointer to the string in memory
    // Wasm.I32Add<Wasm.I32True, state['stack'][0]> // the pointer to the string in memory
  >
>