import { ToDecimal } from "./binary";
import { Add } from "./hotscript-fork/numbers/impl/addition";
import { JoinBytes } from "./split";
// import { Add } from 'ts-arithmetic'

export namespace Load {
  export type ReadBytes<
    /** number of bytes to read */
    count extends number,

    /** memory object to read from */
    memory extends Record<number, string>,

    address extends number,

    _Acc extends string[] = [],
  > =
    _Acc['length'] extends count
    ? _Acc
    : ReadBytes<
        count,
        memory,
        Add<address, 1>,
        [
          ..._Acc,
          memory[address]
        ]
      >

  export type I32<
    bytes extends string[],

    RESULT extends number =
      ToDecimal<
        JoinBytes<bytes>
      >
  > = RESULT
}