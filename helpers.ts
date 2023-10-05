import { Pixel_100 } from "./constants";

/** can be optimized later with the ${s}${s}${s}${s}${s} trick */
export type StringToTuple<Input extends string> =
  Input extends `${Input[0]}${infer Rest}`
  ? [Input, ...StringToTuple<Rest>]
  : [];

export type LengthOfString<T extends string> =
  StringToTuple<T>['length'];

export type Row<
  Columns extends number,
  Value extends string,
  _Acc extends string = '',
  _AccCount extends true[] = [],
> =
  _AccCount['length'] extends Columns
  ? _Acc
  : Row<
      Columns,
      Value,
      `${_Acc}${Value}`,
      [..._AccCount, true]
    >;

export type Fill<
  Count extends number,
  _Acc extends string[] = [],
> =
  _Acc['length'] extends Count
  ? _Acc
  : Fill<Count, [..._Acc, `${_Acc['length']}`]>;

type PadAZero<Input extends string[]> =
  Input extends [
    infer Head extends string,
    ...infer Tail extends string[]
  ]
  ? [`0${Head}`, ...PadAZero<Tail>]
  : Input

type MakeStringRows<
  Max extends number,

  _Acc extends string[] = [],

  _AccCount extends true[] = [],
  
  __Count extends number = _AccCount['length'],
> =
  Max extends __Count
  ? _Acc
  : __Count extends 10
    ? MakeStringRows<
        Max,
        PadAZero<[..._Acc, `${__Count}`]>,
        [..._AccCount, true]
      >
    : __Count extends 100
      ? never // TODO
      : MakeStringRows<
          Max,
          [..._Acc, `${0}${__Count}`],
          [..._AccCount, true]
        >;

/** Table, but with precalculated rows */
export type CreateCanvas<
  Rows extends number,
  Columns extends number,
  Blank extends string,

  _StringRows extends string[] = MakeStringRows<Rows>
> = {
  [C in _StringRows[number]]: Row<Columns, Blank>
}

export type StringToNumber<StringNumber extends string> =
  StringNumber extends `${infer N extends number}`
  ? N
  : never;

export type ReplacePixel<
  Input extends string,

  /** the position at which to replace */
  ReplacePosition extends number,

  /** the new value to replace with */
  ReplaceValue extends string,

  _Beginning extends string = '',
  _AccCurrentPosition extends true[] = [],
  _CurrentPosition extends number = _AccCurrentPosition['length'],
> = 
  Input extends `${infer Head}${infer Tail}`
  ? _CurrentPosition extends ReplacePosition
    ? `${_Beginning}${ReplaceValue}${Tail}`
    : ReplacePixel<
        Tail, // the rest of the string becomes the new Input
        ReplacePosition,
        ReplaceValue,
        `${_Beginning}${Head}`, // concat with _Beginning since we didn't find a match
        [..._AccCurrentPosition, true]
      >
  : Input;
  
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ReplaceValueByKey<T, K extends keyof T, V> = {
  [P in keyof T]: P extends K ? V : T[P];
};

export type LeftPadWithZeros<
  Limit extends number,
  Input extends string | number,
> =
  LengthOfString<`${Input}`> extends Limit
  ? `${Input}`
  : LeftPadWithZeros<Limit, `0${Input}`>;

export type FirstKey<T> =
  keyof T extends infer Keys
  ? Keys
  : never;

export type GameFrame = Record<string, string>;

export type SetPixel<
  /** the input frame */
  Frame extends GameFrame,
  
  /** pre-padded _actual_ row to address */
  Row extends string,
  
  /** column to change */
  Column extends number,
  
  /** the value to replace */
  Value extends string,
> = {
  [P in keyof Frame]:
    P extends Row
    ? ReplacePixel<Frame[P], Column, Value>
    : Frame[P]
}

export type Pixel = readonly [row: number, column: number, value: string];

/** this is hardcoded because it's more efficient and we know that every game frame will have at least a single line (which starts at `00`) and that supporting beyond 5 digits would put us well past 8k footage which is (lol) currently beyond the scope of this project so we can bound between 1 and 5 digits safely */
export type GetColumnKeyLength<Frame extends GameFrame> =
  Frame['00'] extends string
  ? 2
  : Frame['000'] extends string
    ? 3
    : Frame['0000'] extends string
      ? 4
      : Frame['00000'] extends string
        ? 5
        : never;

export type SetPixels<
  T extends Pixel[],
  Frame extends GameFrame,

  _ColumnKeyLength extends number = GetColumnKeyLength<Frame>,
> =
  T extends [
    infer Head extends Pixel,
    ...infer Rest extends Pixel[]
  ]
  ? SetPixels<
      Rest,
      SetPixel<
        Frame,
        LeftPadWithZeros<_ColumnKeyLength, Head[0]>,
        Head[1],
        Head[2]
      >,
      _ColumnKeyLength
    >
  : Frame;

export type RepeatCharacters<T extends string> =
  T extends `${infer Char}${infer Rest}`
  ? `${Char}${Char}${RepeatCharacters<Rest>}`
  : '';

export type DisplayFrame<Frame extends GameFrame> = {
  [Row in keyof Frame]: RepeatCharacters<Frame[Row]>
}
