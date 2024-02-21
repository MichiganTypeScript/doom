import { ReverseString } from "./binary"
import { Wasm } from "./wasm"

export type SplitToBytes<
  T extends string,

  Acc extends string[] = []
> = Satisfies<string[],
  T extends `${infer b1}${infer b2}${infer b3}${infer b4}${infer b5}${infer b6}${infer b7}${infer b8}${infer Tail}`
  ? SplitToBytes<Tail, [...Acc, `${b1}${b2}${b3}${b4}${b5}${b6}${b7}${b8}`]>
  : Acc
>

export namespace Clamp {
  export type Last32Bits<
    to32BitClamp extends string
  > = Satisfies<string,
    ReverseString<to32BitClamp> extends `${
         infer b01}${infer b02}${infer b03}${infer b04}${infer b05}${infer b06}${infer b07}${infer b08
      }${infer b09}${infer b10}${infer b11}${infer b12}${infer b13}${infer b14}${infer b15}${infer b16
      }${infer b17}${infer b18}${infer b19}${infer b20}${infer b21}${infer b22}${infer b23}${infer b24
      }${infer b25}${infer b26}${infer b27}${infer b28}${infer b29}${infer b30}${infer b31}${infer b32
      }${
        // if the string is exactly 32 bits, this will be an empty string
        // if it's more, it'll just be the rest
        infer Tail
      }`

    ? // put the characters back in the right order
      `${
         b32}${b31}${b30}${b29}${b28}${b27}${b26}${b25
      }${b24}${b23}${b22}${b21}${b20}${b19}${b18}${b17
      }${b16}${b15}${b14}${b13}${b12}${b11}${b10}${b09
      }${b08}${b07}${b06}${b05}${b04}${b03}${b02}${b01
      }`

    : // we have less than 32 bits.  this is probably an error (?)
      to32BitClamp
  >
  
  export type Last8Bits<
    toLast8Bits extends string
  > = Satisfies<string,
    ReverseString<toLast8Bits> extends
      `${
        infer b1
      }${
        infer b2
      }${
        infer b3
      }${
        infer b4
      }${
        infer b5
      }${
        infer b6
      }${
        infer b7
      }${
        infer b8
      }${
        // if the string is exactly 8 bits, this will be an empty string
        // if it's more, it'll just be the rest
        infer Tail
      }`

    ? // put the characters back in the right order
      `${b8}${b7}${b6}${b5}${b4}${b3}${b2}${b1}`

    : // we have less than 8 bits.  this is probably an error (?)
      toLast8Bits
  >
}
