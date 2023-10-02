import { Pixel_000 } from "./constants";

/** can be optimized later with the ${s}${s}${s}${s}${s} trick */
export type StringToTuple<Input extends string> =
  Input extends `${Input[0]}${infer Rest}`
  ? [Input, ...StringToTuple<Rest>]
  : [];

export type LengthOfString<T extends string> =
  StringToTuple<T>['length'];

export type Row<
  Count extends number,
  Value extends string,
  Acc extends string = '',
> =
  LengthOfString<Acc> extends Count
  ? Acc
  : Row<Count, Value, `${Acc}${Value}`>;

export type Fill<
  Count extends number,
  Acc extends string[] = [],
> =
  Acc['length'] extends Count
  ? Acc
  : Fill<Count, [...Acc, `${Acc['length']}`]>;

type x = Fill<11>;

export type Table<
  Columns extends number,
  Rows extends number,
  Blank extends string,
  ColumnFill extends string[] = Fill<Columns>,
  RowFill extends string = Row<Rows, Blank>,
> = {
  [C in ColumnFill[number]]: RowFill
};

/** Table, but with precalculated rows */
export type TablePrecalc<
  Columns extends string[],
  Rows extends number,
  Blank extends string,
> = {
  [C in Columns[number]]: Row<Rows, Blank>
}

export type StringToNumber<StringNumber extends string> =
  StringNumber extends `${infer N extends number}`
  ? N
  : never;
