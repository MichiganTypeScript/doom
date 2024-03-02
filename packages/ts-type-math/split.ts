import { ReverseString8Segments } from "./binary"
import { Ensure } from "./ensure"
import { WasmValue } from "./wasm"

/** this algorithm ABSO-FUCKING-LUTELY requires the string to be some multiple of 8 in length.  Don't fuck it up. */
export type SplitToBytes<
  T extends string,

  Acc extends string[] = []
> = Satisfies<string[],
  T extends `${infer b1}${infer b2}${infer b3}${infer b4}${infer b5}${infer b6}${infer b7}${infer b8}${infer Tail}`
  ? SplitToBytes<Tail, [...Acc, `${b1}${b2}${b3}${b4}${b5}${b6}${b7}${b8}`]>
  : Acc
>

export namespace Clamp {
  export type Last64Bits<
    to64BitClamp extends string
  > = Satisfies<string,
    ReverseString8Segments<to64BitClamp> extends `${
         infer b01}${infer b02}${infer b03}${infer b04}${infer b05}${infer b06}${infer b07}${infer b08
      }${infer b09}${infer b10}${infer b11}${infer b12}${infer b13}${infer b14}${infer b15}${infer b16
      }${infer b17}${infer b18}${infer b19}${infer b20}${infer b21}${infer b22}${infer b23}${infer b24
      }${infer b25}${infer b26}${infer b27}${infer b28}${infer b29}${infer b30}${infer b31}${infer b32
      }${
         infer b33}${infer b34}${infer b35}${infer b36}${infer b37}${infer b38}${infer b39}${infer b40
      }${infer b41}${infer b42}${infer b43}${infer b44}${infer b45}${infer b46}${infer b47}${infer b48
      }${infer b49}${infer b50}${infer b51}${infer b52}${infer b53}${infer b54}${infer b55}${infer b56
      }${infer b57}${infer b58}${infer b59}${infer b60}${infer b61}${infer b62}${infer b63}${infer b64
      }${
        // if the string is exactly 64 bits, this will be an empty string
        // if it's more, it'll just be the rest
        infer Tail
      }`

    ? // put the characters back in the right order
      `${
         b64}${b63}${b62}${b61}${b60}${b59}${b58}${b57
      }${b56}${b55}${b54}${b53}${b52}${b51}${b50}${b49
      }${b48}${b47}${b46}${b45}${b44}${b43}${b42}${b41
      }${b40}${b39}${b38}${b37}${b36}${b35}${b34}${b33
      }${b32}${b31}${b30}${b29}${b28}${b27}${b26}${b25
      }${b24}${b23}${b22}${b21}${b20}${b19}${b18}${b17
      }${b16}${b15}${b14}${b13}${b12}${b11}${b10}${b09
      }${b08}${b07}${b06}${b05}${b04}${b03}${b02}${b01
      }`

    
    : // we have fewer than 64 bits.  this is probably an error (?)
      never
  >

  export type First32Bits<
    to32BitClamp extends string
  > = Satisfies<string,
    to32BitClamp extends `${
        infer b01}${infer b02}${infer b03}${infer b04}${infer b05}${infer b06}${infer b07}${infer b08
      }${infer b09}${infer b10}${infer b11}${infer b12}${infer b13}${infer b14}${infer b15}${infer b16
      }${infer b17}${infer b18}${infer b19}${infer b20}${infer b21}${infer b22}${infer b23}${infer b24
      }${infer b25}${infer b26}${infer b27}${infer b28}${infer b29}${infer b30}${infer b31}${infer b32
      }${
        // if the string is exactly 32 bits, this will be an empty string
        // if it's more, it'll just be the rest
        infer Tail
      }`

    ? // assemble the cake again
      `${
          b01}${b02}${b03}${b04}${b05}${b06}${b07}${b08
      }${b09}${b10}${b11}${b12}${b13}${b14}${b15}${b16
      }${b17}${b18}${b19}${b20}${b21}${b22}${b23}${b24
      }${b25}${b26}${b27}${b28}${b29}${b30}${b31}${b32
      }`

    : // we have fewer than 32 bits.  this is probably an error (?)
      never
  >

  export type Last32Bits<
    to32BitClamp extends string
  > = Satisfies<string,
    ReverseString8Segments<to32BitClamp> extends `${
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

    : // we have fewer than 32 bits.  this is probably an error (?)
      never
  >

  export type Last16Bits<
    toLast8Bits extends string
  > = Satisfies<string,
    ReverseString8Segments<toLast8Bits> extends
       `${infer b01}${infer b02}${infer b03}${infer b04}${infer b05}${infer b06}${infer b07}${infer b08
       }${infer b09}${infer b10}${infer b11}${infer b12}${infer b13}${infer b14}${infer b15}${infer b16
       }${
         // if the string is exactly 8 bits, this will be an empty string
         // if it's more, it'll just be the rest
         infer Tail
       }`

    ? // put the characters back in the right order
      `${b16}${b15}${b14}${b13}${b12}${b11}${b10}${b09
      }${b08}${b07}${b06}${b05}${b04}${b03}${b02}${b01
      }`

    : // we have fewer than 8 bits.  this is probably an error (?)
      never
  >

  export type Last8Bits<
    toLast8Bits extends string
  > = Satisfies<string,
    ReverseString8Segments<toLast8Bits> extends
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

    : // we have fewer than 8 bits.  this is probably an error (?)
      never
  >
}


export type WrapBinary<
  a extends WasmValue,
> = Satisfies<WasmValue,
  Ensure.I32<a>
>