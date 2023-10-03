import { DisplayFrame, Fill, GameFrame, LeftPadWithZeros, SetPixel, SetPixels, StringToNumber, TablePrecalc } from "./helpers";
import { Pixel_000, Pixel_050, Pixel_100 } from "./constants";

type HardcodedHeart = [
  `${Pixel_000}${Pixel_000}${Pixel_100}${Pixel_100}${Pixel_000}${Pixel_100}${Pixel_100}${Pixel_000}${Pixel_000}`,
  `${Pixel_000}${Pixel_100}${Pixel_050}${Pixel_050}${Pixel_100}${Pixel_050}${Pixel_050}${Pixel_100}${Pixel_000}`,
  `${Pixel_000}${Pixel_100}${Pixel_050}${Pixel_050}${Pixel_050}${Pixel_050}${Pixel_050}${Pixel_100}${Pixel_000}`,
  `${Pixel_000}${Pixel_000}${Pixel_100}${Pixel_050}${Pixel_050}${Pixel_050}${Pixel_100}${Pixel_000}${Pixel_000}`,
  `${Pixel_000}${Pixel_000}${Pixel_000}${Pixel_100}${Pixel_050}${Pixel_100}${Pixel_000}${Pixel_000}${Pixel_000}`,
  `${Pixel_000}${Pixel_000}${Pixel_000}${Pixel_000}${Pixel_100}${Pixel_000}${Pixel_000}${Pixel_000}${Pixel_000}`,
];
  
type HeartTable<
  Rows extends readonly string[],
  ColumnFill extends string[] = Fill<Rows['length']>
> = {
  [C in ColumnFill[number]]: Rows[StringToNumber<C>]
};

type HeartDisplay = HeartTable<HardcodedHeart>;

///////////////////////
// now, not hardcoding the image, but rather setting it from data

type Frame0 = TablePrecalc<8, 9, Pixel_000>;

type Frame1 = SetPixels<[
  [1, 2, Pixel_100],
  [1, 3, Pixel_100],
  [1, 5, Pixel_100],
  [1, 6, Pixel_100],
  [2, 1, Pixel_100],
  [2, 4, Pixel_100],
  [2, 7, Pixel_100],
  [3, 1, Pixel_100],
  [3, 7, Pixel_100],
  [4, 2, Pixel_100],
  [4, 6, Pixel_100],
  [5, 3, Pixel_100],
  [5, 5, Pixel_100],
  [6, 4, Pixel_100],

  [2, 2, Pixel_050],
  [2, 3, Pixel_050],
  [2, 5, Pixel_050],
  [2, 6, Pixel_050],
  [3, 2, Pixel_050],
  [3, 3, Pixel_050],
  [3, 4, Pixel_050],
  [3, 5, Pixel_050],
  [3, 6, Pixel_050],
  [4, 3, Pixel_050],
  [4, 4, Pixel_050],
  [4, 5, Pixel_050],
  [5, 4, Pixel_050],
], Frame0>;

type DisplayFrame0 = DisplayFrame<Frame0>;
type DisplayFrame1 = DisplayFrame<Frame1>;