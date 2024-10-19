import { Add, Subtract } from "ts-type-math";
import { ProgramState } from "../../../wasm-to-typescript-types/types"
import { I32AddBinary } from "../../../ts-type-math/add";
import { DoomPaletteToAscii } from "./palette";
import { ExpectedMemory, PointerBinary32 } from "./memory";

type Line = string;
type NumberedFrame = Record<number, Line>;
type I32True = '00000000000000000000000000000001'
type evaluate<T> = {
  [K in keyof T]: T[K]
} & unknown

export type GenerateFrame<
  memory extends ProgramState["memory"],
  address extends string,
  
  doneCondition extends [
    column: number,
    row: number,
  ]
> =
  _GenerateFrame<
    memory,
    address,
    doneCondition,
    []
  >

type _GenerateFrame<
  memory extends ProgramState["memory"],

  address extends string,
  
  doneCondition extends [
    column: number,
    row: number,
  ],

  lines extends string[][],

  // _stopAt extends number = 0,

  _rows extends number = lines['length'],

  _columns extends number =
    lines extends [
      ...infer _rest extends string[][],
      infer line extends string[]
    ]
    ? line['length']
    : 0,

  _thisCondition extends [number, number] =
    [
      _columns,
      _rows,
    ],

> = Satisfies<string[][] | string,
  // _stopAt extends 13 ? {
  //   doneCondition: doneCondition,
  //   lines: lines,
  //   _thisCondition: _thisCondition
  //   _columns: _columns,
  //   _rows: _rows,
  // } :

  _thisCondition extends doneCondition
  ? lines
  : // we still have work to do, invoke our dear friend, recursion
    memory[address] extends infer value extends keyof DoomPaletteToAscii
    ? _GenerateFrame<
        memory,
        I32AddBinary<address, I32True>,
        doneCondition,

        lines extends [
          ...infer rest extends string[][],
          infer line extends string[]
        ]

        ? _columns extends doneCondition[0]
          ? // this line is done
            _rows extends doneCondition[1]
            ? // this is the base case of recursion
              lines

            : // start a new line
              [
                ...lines,
                [
                  DoomPaletteToAscii[value]
                ],
              ]

          : // keep adding to this line
            [
              ...rest,
              [
                ...line,
                DoomPaletteToAscii[value]
              ],
            ]

        : // make the very first line
          [
            [DoomPaletteToAscii[value]]
          ]

         // Add<1, _stopAt>
      >
    : `ERROR: memory address ${address} not found` // you fucked up. you. fucked. up... yet again.
>

type test12Grid = GenerateFrame<
//   ^?
  {
    "00000000000000000000000000000000": "00000000", // " +"
    "00000000000000000000000000000001": "00000001", // "^+"
    "00000000000000000000000000000010": "00000010", // "'+"
    "00000000000000000000000000000011": "00000100", // "$O"
    "00000000000000000000000000000100": "00001000", // ", "
    "00000000000000000000000000000101": "00010000", // "w "
    "00000000000000000000000000000110": "00100000", // "[x"
    "00000000000000000000000000000111": "01000000", // "ux"
    "00000000000000000000000000001000": "10000000", // "CO"
    "00000000000000000000000000001001": "01000000", // "ux"
    "00000000000000000000000000001010": "00100000", // "[x"
    "00000000000000000000000000001011": "00010000", // "w "
  },
  "00000000000000000000000000000000",
  [3, 3]
>

type ConcatLine<
  line extends string[],
> =
  line extends [
    infer item extends string,
    ...infer items extends string[],
  ]
  ? `${item}${ConcatLine<items>}`
  : ``

type ConcatLines<
  lines extends string[][],
> =
  lines extends [
    infer line extends string[],
    ...infer rest extends string[][],
  ]
  ? [
      ConcatLine<line>,
      ...ConcatLines<rest>
    ]
  : lines

type C2<
  line extends string[],
> = {
  [k in keyof line]: ConcatLine<line[k]>
}

type test12GridConcat = ConcatLines<test12Grid>;
//   ^?

// VideoIdea: look at which of these is faster
type test12GridConcat = C2<test12Grid>;
//   ^?









type result2x5 = {
  1: " +^+'+$O, ",
  2: "w [xuxCOr+",
}

type DoomFrame = Record<string, string>;

/** some day, we'll be able to trivially get the length of a string and shit like this won't be necessary.  one day.  ONE. DAY. */
type PadNumberToFiveDigits<T extends number | string> = 
    `${T}` extends `${infer N extends string}`
    ? N extends `${infer _}${infer _}${infer _}${infer _}${infer _}`
      ? N
      : N extends `${infer _}${infer _}${infer _}${infer _}`
        ? `0${N}`
        : N extends `${infer _}${infer _}${infer _}`
          ? `00${N}`
            : N extends `${infer _}${infer _}`
            ? `000${N}`
              : N extends `${infer _}`
                ? `0000${N}`
                : never
    : never;

export type MapFrame<
  frame extends NumberedFrame,
> = evaluate<{
  [k in keyof frame & number as PadNumberToFiveDigits<k>]: frame[k]
}>

export type mapped = MapFrame<result2x5>; // =>
type mappedResult = {
  "0002": "w [xuxCOr+";
  "0001": " +^+'+$O, ";
}

export type MeetYourDoom = GenerateFrame<
  ExpectedMemory,
  PointerBinary32,
  [3, 2]
>
export type mockedFrame = MapFrame<mock1>

export type MeetYourDoom<
  state extends ProgramState,
> =
  MapFrame<
    GenerateFrame<
      state["memory"],
      state["stack"][0],
      // [320, 200] // so this works but the current algorithm would take >10 hours to run so gonna have to rework this.
      [32, 2] // lol TypeScript bug, this errors for small numbers, but not large ones
    >
  >
