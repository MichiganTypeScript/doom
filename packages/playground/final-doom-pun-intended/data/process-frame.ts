import { Add, Subtract } from "ts-type-math";
import { ProgramState } from "../../../wasm-to-typescript-types/types"
import type { I32AddBinary } from "../../../ts-type-math/add";
import { DoomPaletteToAscii } from "./palette";
import { ExpectedMemory, PointerBinary32 } from "./memory";

type Line = string;
type NumberedFrame = Record<number, Line>;
type I32True = '00000000000000000000000000000001'
type evaluate<T> = {
  [K in keyof T]: T[K]
} & unknown

type I32PlusOne<Val extends string, Suffix extends string = ''> =
  Val extends `${infer Val1}1` | `${infer Val0}0`
    ? Val0 extends `${any}`
      ? `${Val0}1${Suffix}`
      : I32PlusOne<Val1, `0${Suffix}`>
    : `1${Suffix}`;

type I32Plus<A extends string, B extends string, Carry extends string = '0', Suffix extends string = ''> =
  `${Carry}${A}+${B}` extends `1${infer A111}1+${infer B111}1` |
      `0${infer A110}1+${infer B110}1` | `1${infer A110}1+${infer B110}0` | `1${infer A110}0+${infer B110}1` |
      `0${infer A100}1+${infer B100}0` | `0${infer A100}0+${infer B100}1` | `1${infer A100}0+${infer B100}0` |
      `0${infer A000}0+${infer B000}0`
    ? A000 extends `${any}`
      ? I32Plus<A000, B000, '0', `0${Suffix}`>
      : A100 extends `${any}`
        ? I32Plus<A100, B100, '0', `1${Suffix}`>
        : A110 extends `${any}`
          ? I32Plus<A110, B110, '1', `0${Suffix}`>
          : I32Plus<A111, B111, '1', `1${Suffix}`>
    : `${A}${B}${Suffix}`;

// export type GenerateFrame<
//   memory extends ProgramState["memory"],
//   address extends string,
  
//   doneCondition extends [
//     column: number,
//     row: number,
//   ]
// > =
//   _GenerateFrame<
//     memory,
//     address,
//     doneCondition,
//     []
//   >

// type _GenerateFrame<
//   memory extends ProgramState["memory"],

//   address extends string,
  
//   doneCondition extends [
//     column: number,
//     row: number,
//   ],

//   lines extends string[][],

//   // _stopAt extends number = 0,

//   _rows extends number = lines['length'],

//   _columns extends number = lines extends [...any, { length: infer L }] ? L : 0,

//   _thisCondition extends [number, number] =
//     [
//       _columns,
//       _rows,
//     ],

// > = Satisfies<string[][] | string,
//   // _stopAt extends 13 ? {
//   //   doneCondition: doneCondition,
//   //   lines: lines,
//   //   _thisCondition: _thisCondition
//   //   _columns: _columns,
//   //   _rows: _rows,
//   // } :

//   _thisCondition extends doneCondition
//   ? lines
//   : // we still have work to do, invoke our dear friend, recursion
//     memory[address] extends infer value extends keyof DoomPaletteToAscii
//     ? _GenerateFrame<
//         memory,
//         I32PlusOne<address>,
//         doneCondition,

//         lines extends [
//           ...infer rest extends string[][],
//           infer line extends string[]
//         ]

//         ? _columns extends doneCondition[0]
//           ? // this line is done
//             _rows extends doneCondition[1]
//             ? // this is the base case of recursion
//               lines

//             : // start a new line
//               [
//                 ...lines,
//                 [
//                   DoomPaletteToAscii[value]
//                 ],
//               ]

//           : // keep adding to this line
//             [
//               ...rest,
//               [
//                 ...line,
//                 DoomPaletteToAscii[value]
//               ],
//             ]

//         : // make the very first line
//           [
//             [DoomPaletteToAscii[value]]
//           ]

//          // Add<1, _stopAt>
//       >
//     : `ERROR: memory address ${address} not found` // you fucked up. you. fucked. up... yet again.
// >

// type test12Grid = GenerateFrame<
// //   ^?
//   {
//     "00000000000000000000000000000000": "00000000", // " +"
//     "00000000000000000000000000000001": "00000001", // "^+"
//     "00000000000000000000000000000010": "00000010", // "'+"
//     "00000000000000000000000000000011": "00000100", // "$O"
//     "00000000000000000000000000000100": "00001000", // ", "
//     "00000000000000000000000000000101": "00010000", // "w "
//     "00000000000000000000000000000110": "00100000", // "[x"
//     "00000000000000000000000000000111": "01000000", // "ux"
//     "00000000000000000000000000001000": "10000000", // "CO"
//     "00000000000000000000000000001001": "01000000", // "ux"
//     "00000000000000000000000000001010": "00100000", // "[x"
//     "00000000000000000000000000001011": "00010000", // "w "
//   },
//   "00000000000000000000000000000000",
//   [3, 3]
// >

// type ConcatLine<
//   line extends string[],
// > =
//   line extends [
//     infer item extends string,
//     ...infer items extends string[],
//   ]
//   ? `${item}${ConcatLine<items>}`
//   : ``

// type ConcatLines<
//   lines extends string[][],
// > =
//   lines extends [
//     infer line extends string[],
//     ...infer rest extends string[][],
//   ]
//   ? [
//       ConcatLine<line>,
//       ...ConcatLines<rest>
//     ]
//   : lines

// type C2<
//   line extends string[],
// > = {
//   [k in keyof line]: ConcatLine<line[k]>
// }

// type test12GridConcat = ConcatLines<test12Grid>;
// //   ^?

// // VideoIdea: look at which of these is faster
// type test12GridConcat = C2<test12Grid>;
// //   ^?









// type result2x5 = {
//   1: " +^+'+$O, ",
//   2: "w [xuxCOr+",
// }

// type DoomFrame = Record<string, string>;

// /** some day, we'll be able to trivially get the length of a string and shit like this won't be necessary.  one day.  ONE. DAY. */
// // type PadNumberToFiveDigits<T extends number | string> = 
// //   `${T}` extends `${infer N extends string}`
// //   ? N extends `${infer _}${infer _}${infer _}${infer _}${infer _}`
// //     ? N
// //     : N extends `${infer _}${infer _}${infer _}${infer _}`
// //       ? `0${N}`
// //       : N extends `${infer _}${infer _}${infer _}`
// //         ? `00${N}`
// //           : N extends `${infer _}${infer _}`
// //           ? `000${N}`
// //             : N extends `${infer _}`
// //               ? `0000${N}`
// //               : never
// //   : never;
// type PadNumberToFiveDigits<T extends number | string> = 
//     number extends T
//     ? '00000'
//     : string extends T
//       ? '00000'
//       : `${T}` extends infer N extends string
//         ? N extends `${any}${any}${any}${any}${any}${any}`
//           ? N
//           : N extends `${any}${any}${any}${any}${any}`
//             ? `0${N}`
//             : N extends `${any}${any}${any}${any}`
//               ? `00${N}`
//               : N extends `${any}${any}${any}`
//                 ? `000${N}`
//                 : N extends `${any}${any}`
//                   ? `0000${N}`
//                   : '000000'
//         : '00000';

// export type MapFrame<
//   frame extends NumberedFrame,
// > = evaluate<{
//   [k in keyof frame & number as PadNumberToFiveDigits<k>]: frame[k]
// }>

// export type mapped = MapFrame<result2x5>; // =>
// type mappedResult = {
//   "0002": "w [xuxCOr+";
//   "0001": " +^+'+$O, ";
// }

// export type MeetYourDoom = GenerateFrame<
//   ExpectedMemory,
//   PointerBinary32,
//   [3, 2]
// >
// export type mockedFrame = MapFrame<mock1>

type _GenerateLine<
  memory extends ProgramState["memory"],
  address extends string,
  count extends string = '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
  line extends string = '',
> =
  count extends `1${infer S}`
    ? memory[address] extends infer value extends keyof DoomPaletteToAscii
      ? _GenerateLine<memory, I32PlusOne<address>, S, `${line}${DoomPaletteToAscii[value]}`>
      : `ERROR: memory address ${address} not found` // you fucked up. you. fucked. up... yet again.
    : line

export type MeetYourDoom<
  state extends ProgramState,
  memory extends ProgramState["memory"] = state['memory'],
  address extends string = state['stack'][0],
> =
  // MapFrame<
  //   GenerateFrame<
  //     state["memory"],
  //     state["stack"][0],
  //     // [320, 200] // so this works but the current algorithm would take >10 hours to run so gonna have to rework this.
  //     [320, 40] // lol TypeScript bug, this errors for small numbers, but not large ones
  //   >
  // >
  {
    "00000": _GenerateLine<memory, I32Plus<address, '00000000000000000000000000000000'>>,
    "00001": _GenerateLine<memory, I32Plus<address, '00000000000000000000000101000000'>>,
    "00002": _GenerateLine<memory, I32Plus<address, '00000000000000000000001010000000'>>,
    "00003": _GenerateLine<memory, I32Plus<address, '00000000000000000000001111000000'>>,
    "00004": _GenerateLine<memory, I32Plus<address, '00000000000000000000010100000000'>>,
    "00005": _GenerateLine<memory, I32Plus<address, '00000000000000000000011001000000'>>,
    "00006": _GenerateLine<memory, I32Plus<address, '00000000000000000000011110000000'>>,
    "00007": _GenerateLine<memory, I32Plus<address, '00000000000000000000100011000000'>>,
    "00008": _GenerateLine<memory, I32Plus<address, '00000000000000000000101000000000'>>,
    "00009": _GenerateLine<memory, I32Plus<address, '00000000000000000000101101000000'>>,
    "00010": _GenerateLine<memory, I32Plus<address, '00000000000000000000110010000000'>>,
    "00011": _GenerateLine<memory, I32Plus<address, '00000000000000000000110111000000'>>,
    "00012": _GenerateLine<memory, I32Plus<address, '00000000000000000000111100000000'>>,
    "00013": _GenerateLine<memory, I32Plus<address, '00000000000000000001000001000000'>>,
    "00014": _GenerateLine<memory, I32Plus<address, '00000000000000000001000110000000'>>,
    "00015": _GenerateLine<memory, I32Plus<address, '00000000000000000001001011000000'>>,
    "00016": _GenerateLine<memory, I32Plus<address, '00000000000000000001010000000000'>>,
    "00017": _GenerateLine<memory, I32Plus<address, '00000000000000000001010101000000'>>,
    "00018": _GenerateLine<memory, I32Plus<address, '00000000000000000001011010000000'>>,
    "00019": _GenerateLine<memory, I32Plus<address, '00000000000000000001011111000000'>>,
    "00020": _GenerateLine<memory, I32Plus<address, '00000000000000000001100100000000'>>,
    "00021": _GenerateLine<memory, I32Plus<address, '00000000000000000001101001000000'>>,
    "00022": _GenerateLine<memory, I32Plus<address, '00000000000000000001101110000000'>>,
    "00023": _GenerateLine<memory, I32Plus<address, '00000000000000000001110011000000'>>,
    "00024": _GenerateLine<memory, I32Plus<address, '00000000000000000001111000000000'>>,
    "00025": _GenerateLine<memory, I32Plus<address, '00000000000000000001111101000000'>>,
    "00026": _GenerateLine<memory, I32Plus<address, '00000000000000000010000010000000'>>,
    "00027": _GenerateLine<memory, I32Plus<address, '00000000000000000010000111000000'>>,
    "00028": _GenerateLine<memory, I32Plus<address, '00000000000000000010001100000000'>>,
    "00029": _GenerateLine<memory, I32Plus<address, '00000000000000000010010001000000'>>,
    "00030": _GenerateLine<memory, I32Plus<address, '00000000000000000010010110000000'>>,
    "00031": _GenerateLine<memory, I32Plus<address, '00000000000000000010011011000000'>>,
    "00032": _GenerateLine<memory, I32Plus<address, '00000000000000000010100000000000'>>,
    "00033": _GenerateLine<memory, I32Plus<address, '00000000000000000010100101000000'>>,
    "00034": _GenerateLine<memory, I32Plus<address, '00000000000000000010101010000000'>>,
    "00035": _GenerateLine<memory, I32Plus<address, '00000000000000000010101111000000'>>,
    "00036": _GenerateLine<memory, I32Plus<address, '00000000000000000010110100000000'>>,
    "00037": _GenerateLine<memory, I32Plus<address, '00000000000000000010111001000000'>>,
    "00038": _GenerateLine<memory, I32Plus<address, '00000000000000000010111110000000'>>,
    "00039": _GenerateLine<memory, I32Plus<address, '00000000000000000011000011000000'>>,
    "00040": _GenerateLine<memory, I32Plus<address, '00000000000000000011001000000000'>>,
    "00041": _GenerateLine<memory, I32Plus<address, '00000000000000000011001101000000'>>,
    "00042": _GenerateLine<memory, I32Plus<address, '00000000000000000011010010000000'>>,
    "00043": _GenerateLine<memory, I32Plus<address, '00000000000000000011010111000000'>>,
    "00044": _GenerateLine<memory, I32Plus<address, '00000000000000000011011100000000'>>,
    "00045": _GenerateLine<memory, I32Plus<address, '00000000000000000011100001000000'>>,
    "00046": _GenerateLine<memory, I32Plus<address, '00000000000000000011100110000000'>>,
    "00047": _GenerateLine<memory, I32Plus<address, '00000000000000000011101011000000'>>,
    "00048": _GenerateLine<memory, I32Plus<address, '00000000000000000011110000000000'>>,
    "00049": _GenerateLine<memory, I32Plus<address, '00000000000000000011110101000000'>>,
    "00050": _GenerateLine<memory, I32Plus<address, '00000000000000000011111010000000'>>,
    "00051": _GenerateLine<memory, I32Plus<address, '00000000000000000011111111000000'>>,
    "00052": _GenerateLine<memory, I32Plus<address, '00000000000000000100000100000000'>>,
    "00053": _GenerateLine<memory, I32Plus<address, '00000000000000000100001001000000'>>,
    "00054": _GenerateLine<memory, I32Plus<address, '00000000000000000100001110000000'>>,
    "00055": _GenerateLine<memory, I32Plus<address, '00000000000000000100010011000000'>>,
    "00056": _GenerateLine<memory, I32Plus<address, '00000000000000000100011000000000'>>,
    "00057": _GenerateLine<memory, I32Plus<address, '00000000000000000100011101000000'>>,
    "00058": _GenerateLine<memory, I32Plus<address, '00000000000000000100100010000000'>>,
    "00059": _GenerateLine<memory, I32Plus<address, '00000000000000000100100111000000'>>,
    "00060": _GenerateLine<memory, I32Plus<address, '00000000000000000100101100000000'>>,
    "00061": _GenerateLine<memory, I32Plus<address, '00000000000000000100110001000000'>>,
    "00062": _GenerateLine<memory, I32Plus<address, '00000000000000000100110110000000'>>,
    "00063": _GenerateLine<memory, I32Plus<address, '00000000000000000100111011000000'>>,
    "00064": _GenerateLine<memory, I32Plus<address, '00000000000000000101000000000000'>>,
    "00065": _GenerateLine<memory, I32Plus<address, '00000000000000000101000101000000'>>,
    "00066": _GenerateLine<memory, I32Plus<address, '00000000000000000101001010000000'>>,
    "00067": _GenerateLine<memory, I32Plus<address, '00000000000000000101001111000000'>>,
    "00068": _GenerateLine<memory, I32Plus<address, '00000000000000000101010100000000'>>,
    "00069": _GenerateLine<memory, I32Plus<address, '00000000000000000101011001000000'>>,
    "00070": _GenerateLine<memory, I32Plus<address, '00000000000000000101011110000000'>>,
    "00071": _GenerateLine<memory, I32Plus<address, '00000000000000000101100011000000'>>,
    "00072": _GenerateLine<memory, I32Plus<address, '00000000000000000101101000000000'>>,
    "00073": _GenerateLine<memory, I32Plus<address, '00000000000000000101101101000000'>>,
    "00074": _GenerateLine<memory, I32Plus<address, '00000000000000000101110010000000'>>,
    "00075": _GenerateLine<memory, I32Plus<address, '00000000000000000101110111000000'>>,
    "00076": _GenerateLine<memory, I32Plus<address, '00000000000000000101111100000000'>>,
    "00077": _GenerateLine<memory, I32Plus<address, '00000000000000000110000001000000'>>,
    "00078": _GenerateLine<memory, I32Plus<address, '00000000000000000110000110000000'>>,
    "00079": _GenerateLine<memory, I32Plus<address, '00000000000000000110001011000000'>>,
    "00080": _GenerateLine<memory, I32Plus<address, '00000000000000000110010000000000'>>,
    "00081": _GenerateLine<memory, I32Plus<address, '00000000000000000110010101000000'>>,
    "00082": _GenerateLine<memory, I32Plus<address, '00000000000000000110011010000000'>>,
    "00083": _GenerateLine<memory, I32Plus<address, '00000000000000000110011111000000'>>,
    "00084": _GenerateLine<memory, I32Plus<address, '00000000000000000110100100000000'>>,
    "00085": _GenerateLine<memory, I32Plus<address, '00000000000000000110101001000000'>>,
    "00086": _GenerateLine<memory, I32Plus<address, '00000000000000000110101110000000'>>,
    "00087": _GenerateLine<memory, I32Plus<address, '00000000000000000110110011000000'>>,
    "00088": _GenerateLine<memory, I32Plus<address, '00000000000000000110111000000000'>>,
    "00089": _GenerateLine<memory, I32Plus<address, '00000000000000000110111101000000'>>,
    "00090": _GenerateLine<memory, I32Plus<address, '00000000000000000111000010000000'>>,
    "00091": _GenerateLine<memory, I32Plus<address, '00000000000000000111000111000000'>>,
    "00092": _GenerateLine<memory, I32Plus<address, '00000000000000000111001100000000'>>,
    "00093": _GenerateLine<memory, I32Plus<address, '00000000000000000111010001000000'>>,
    "00094": _GenerateLine<memory, I32Plus<address, '00000000000000000111010110000000'>>,
    "00095": _GenerateLine<memory, I32Plus<address, '00000000000000000111011011000000'>>,
    "00096": _GenerateLine<memory, I32Plus<address, '00000000000000000111100000000000'>>,
    "00097": _GenerateLine<memory, I32Plus<address, '00000000000000000111100101000000'>>,
    "00098": _GenerateLine<memory, I32Plus<address, '00000000000000000111101010000000'>>,
    "00099": _GenerateLine<memory, I32Plus<address, '00000000000000000111101111000000'>>,
    "00100": _GenerateLine<memory, I32Plus<address, '00000000000000000111110100000000'>>,
    "00101": _GenerateLine<memory, I32Plus<address, '00000000000000000111111001000000'>>,
    "00102": _GenerateLine<memory, I32Plus<address, '00000000000000000111111110000000'>>,
    "00103": _GenerateLine<memory, I32Plus<address, '00000000000000001000000011000000'>>,
    "00104": _GenerateLine<memory, I32Plus<address, '00000000000000001000001000000000'>>,
    "00105": _GenerateLine<memory, I32Plus<address, '00000000000000001000001101000000'>>,
    "00106": _GenerateLine<memory, I32Plus<address, '00000000000000001000010010000000'>>,
    "00107": _GenerateLine<memory, I32Plus<address, '00000000000000001000010111000000'>>,
    "00108": _GenerateLine<memory, I32Plus<address, '00000000000000001000011100000000'>>,
    "00109": _GenerateLine<memory, I32Plus<address, '00000000000000001000100001000000'>>,
    "00110": _GenerateLine<memory, I32Plus<address, '00000000000000001000100110000000'>>,
    "00111": _GenerateLine<memory, I32Plus<address, '00000000000000001000101011000000'>>,
    "00112": _GenerateLine<memory, I32Plus<address, '00000000000000001000110000000000'>>,
    "00113": _GenerateLine<memory, I32Plus<address, '00000000000000001000110101000000'>>,
    "00114": _GenerateLine<memory, I32Plus<address, '00000000000000001000111010000000'>>,
    "00115": _GenerateLine<memory, I32Plus<address, '00000000000000001000111111000000'>>,
    "00116": _GenerateLine<memory, I32Plus<address, '00000000000000001001000100000000'>>,
    "00117": _GenerateLine<memory, I32Plus<address, '00000000000000001001001001000000'>>,
    "00118": _GenerateLine<memory, I32Plus<address, '00000000000000001001001110000000'>>,
    "00119": _GenerateLine<memory, I32Plus<address, '00000000000000001001010011000000'>>,
    "00120": _GenerateLine<memory, I32Plus<address, '00000000000000001001011000000000'>>,
    "00121": _GenerateLine<memory, I32Plus<address, '00000000000000001001011101000000'>>,
    "00122": _GenerateLine<memory, I32Plus<address, '00000000000000001001100010000000'>>,
    "00123": _GenerateLine<memory, I32Plus<address, '00000000000000001001100111000000'>>,
    "00124": _GenerateLine<memory, I32Plus<address, '00000000000000001001101100000000'>>,
    "00125": _GenerateLine<memory, I32Plus<address, '00000000000000001001110001000000'>>,
    "00126": _GenerateLine<memory, I32Plus<address, '00000000000000001001110110000000'>>,
    "00127": _GenerateLine<memory, I32Plus<address, '00000000000000001001111011000000'>>,
    "00128": _GenerateLine<memory, I32Plus<address, '00000000000000001010000000000000'>>,
    "00129": _GenerateLine<memory, I32Plus<address, '00000000000000001010000101000000'>>,
    "00130": _GenerateLine<memory, I32Plus<address, '00000000000000001010001010000000'>>,
    "00131": _GenerateLine<memory, I32Plus<address, '00000000000000001010001111000000'>>,
    "00132": _GenerateLine<memory, I32Plus<address, '00000000000000001010010100000000'>>,
    "00133": _GenerateLine<memory, I32Plus<address, '00000000000000001010011001000000'>>,
    "00134": _GenerateLine<memory, I32Plus<address, '00000000000000001010011110000000'>>,
    "00135": _GenerateLine<memory, I32Plus<address, '00000000000000001010100011000000'>>,
    "00136": _GenerateLine<memory, I32Plus<address, '00000000000000001010101000000000'>>,
    "00137": _GenerateLine<memory, I32Plus<address, '00000000000000001010101101000000'>>,
    "00138": _GenerateLine<memory, I32Plus<address, '00000000000000001010110010000000'>>,
    "00139": _GenerateLine<memory, I32Plus<address, '00000000000000001010110111000000'>>,
    "00140": _GenerateLine<memory, I32Plus<address, '00000000000000001010111100000000'>>,
    "00141": _GenerateLine<memory, I32Plus<address, '00000000000000001011000001000000'>>,
    "00142": _GenerateLine<memory, I32Plus<address, '00000000000000001011000110000000'>>,
    "00143": _GenerateLine<memory, I32Plus<address, '00000000000000001011001011000000'>>,
    "00144": _GenerateLine<memory, I32Plus<address, '00000000000000001011010000000000'>>,
    "00145": _GenerateLine<memory, I32Plus<address, '00000000000000001011010101000000'>>,
    "00146": _GenerateLine<memory, I32Plus<address, '00000000000000001011011010000000'>>,
    "00147": _GenerateLine<memory, I32Plus<address, '00000000000000001011011111000000'>>,
    "00148": _GenerateLine<memory, I32Plus<address, '00000000000000001011100100000000'>>,
    "00149": _GenerateLine<memory, I32Plus<address, '00000000000000001011101001000000'>>,
    "00150": _GenerateLine<memory, I32Plus<address, '00000000000000001011101110000000'>>,
    "00151": _GenerateLine<memory, I32Plus<address, '00000000000000001011110011000000'>>,
    "00152": _GenerateLine<memory, I32Plus<address, '00000000000000001011111000000000'>>,
    "00153": _GenerateLine<memory, I32Plus<address, '00000000000000001011111101000000'>>,
    "00154": _GenerateLine<memory, I32Plus<address, '00000000000000001100000010000000'>>,
    "00155": _GenerateLine<memory, I32Plus<address, '00000000000000001100000111000000'>>,
    "00156": _GenerateLine<memory, I32Plus<address, '00000000000000001100001100000000'>>,
    "00157": _GenerateLine<memory, I32Plus<address, '00000000000000001100010001000000'>>,
    "00158": _GenerateLine<memory, I32Plus<address, '00000000000000001100010110000000'>>,
    "00159": _GenerateLine<memory, I32Plus<address, '00000000000000001100011011000000'>>,
    "00160": _GenerateLine<memory, I32Plus<address, '00000000000000001100100000000000'>>,
    "00161": _GenerateLine<memory, I32Plus<address, '00000000000000001100100101000000'>>,
    "00162": _GenerateLine<memory, I32Plus<address, '00000000000000001100101010000000'>>,
    "00163": _GenerateLine<memory, I32Plus<address, '00000000000000001100101111000000'>>,
    "00164": _GenerateLine<memory, I32Plus<address, '00000000000000001100110100000000'>>,
    "00165": _GenerateLine<memory, I32Plus<address, '00000000000000001100111001000000'>>,
    "00166": _GenerateLine<memory, I32Plus<address, '00000000000000001100111110000000'>>,
    "00167": _GenerateLine<memory, I32Plus<address, '00000000000000001101000011000000'>>,
    "00168": _GenerateLine<memory, I32Plus<address, '00000000000000001101001000000000'>>,
    "00169": _GenerateLine<memory, I32Plus<address, '00000000000000001101001101000000'>>,
    "00170": _GenerateLine<memory, I32Plus<address, '00000000000000001101010010000000'>>,
    "00171": _GenerateLine<memory, I32Plus<address, '00000000000000001101010111000000'>>,
    "00172": _GenerateLine<memory, I32Plus<address, '00000000000000001101011100000000'>>,
    "00173": _GenerateLine<memory, I32Plus<address, '00000000000000001101100001000000'>>,
    "00174": _GenerateLine<memory, I32Plus<address, '00000000000000001101100110000000'>>,
    "00175": _GenerateLine<memory, I32Plus<address, '00000000000000001101101011000000'>>,
    "00176": _GenerateLine<memory, I32Plus<address, '00000000000000001101110000000000'>>,
    "00177": _GenerateLine<memory, I32Plus<address, '00000000000000001101110101000000'>>,
    "00178": _GenerateLine<memory, I32Plus<address, '00000000000000001101111010000000'>>,
    "00179": _GenerateLine<memory, I32Plus<address, '00000000000000001101111111000000'>>,
    "00180": _GenerateLine<memory, I32Plus<address, '00000000000000001110000100000000'>>,
    "00181": _GenerateLine<memory, I32Plus<address, '00000000000000001110001001000000'>>,
    "00182": _GenerateLine<memory, I32Plus<address, '00000000000000001110001110000000'>>,
    "00183": _GenerateLine<memory, I32Plus<address, '00000000000000001110010011000000'>>,
    "00184": _GenerateLine<memory, I32Plus<address, '00000000000000001110011000000000'>>,
    "00185": _GenerateLine<memory, I32Plus<address, '00000000000000001110011101000000'>>,
    "00186": _GenerateLine<memory, I32Plus<address, '00000000000000001110100010000000'>>,
    "00187": _GenerateLine<memory, I32Plus<address, '00000000000000001110100111000000'>>,
    "00188": _GenerateLine<memory, I32Plus<address, '00000000000000001110101100000000'>>,
    "00189": _GenerateLine<memory, I32Plus<address, '00000000000000001110110001000000'>>,
    "00190": _GenerateLine<memory, I32Plus<address, '00000000000000001110110110000000'>>,
    "00191": _GenerateLine<memory, I32Plus<address, '00000000000000001110111011000000'>>,
    "00192": _GenerateLine<memory, I32Plus<address, '00000000000000001111000000000000'>>,
    "00193": _GenerateLine<memory, I32Plus<address, '00000000000000001111000101000000'>>,
    "00194": _GenerateLine<memory, I32Plus<address, '00000000000000001111001010000000'>>,
    "00195": _GenerateLine<memory, I32Plus<address, '00000000000000001111001111000000'>>,
    "00196": _GenerateLine<memory, I32Plus<address, '00000000000000001111010100000000'>>,
    "00197": _GenerateLine<memory, I32Plus<address, '00000000000000001111011001000000'>>,
    "00198": _GenerateLine<memory, I32Plus<address, '00000000000000001111011110000000'>>,
    "00199": _GenerateLine<memory, I32Plus<address, '00000000000000001111100011000000'>>,
  };
