import { U8Binary } from "./conversion";
import type { Convert } from "./conversion"
import { Add } from "./hotscript-fork/numbers/impl/addition";


export type NullTerminatorBinary = "00000000";

export type ReadUntilNullTerminator<
  memory extends Record<number, string>,

  address extends number,
> =
  memory[address] extends NullTerminatorBinary
  ? ''
  : `${
      memory[address] extends U8Binary
      ? Convert.U8Binary.ToAscii<memory[address]>
      : ''
    }${
      ReadUntilNullTerminator<memory, Add<1, address>>
    }`

export type ReadStringFromMemory<
  state extends {
    stack: number[]
    memory: Record<number, string>
  },
> = Satisfies<string,
  ReadUntilNullTerminator<
    state['memory'],
    state['stack'][0] // startAddress
  >
>