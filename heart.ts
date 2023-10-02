import { Fill, StringToNumber } from "./helpers";
import { Pixel_000, Pixel_050, Pixel_100 } from "./constants";

type HardcodedHeart = [
  `${Pixel_000}${Pixel_000}${Pixel_100}${Pixel_100}${Pixel_000}${Pixel_100}${Pixel_100}${Pixel_000}${Pixel_000}`,
  `${Pixel_000}${Pixel_100}${Pixel_050}${Pixel_050}${Pixel_100}${Pixel_050}${Pixel_050}${Pixel_100}${Pixel_000}`,
  `${Pixel_000}${Pixel_100}${Pixel_050}${Pixel_050}${Pixel_050}${Pixel_050}${Pixel_050}${Pixel_100}${Pixel_000}`,
  `${Pixel_000}${Pixel_000}${Pixel_100}${Pixel_050}${Pixel_050}${Pixel_050}${Pixel_100}${Pixel_000}${Pixel_000}`,
  `${Pixel_000}${Pixel_000}${Pixel_000}${Pixel_100}${Pixel_050}${Pixel_100}${Pixel_000}${Pixel_000}${Pixel_000}`,
  `${Pixel_000}${Pixel_000}${Pixel_000}${Pixel_000}${Pixel_100}${Pixel_000}${Pixel_000}${Pixel_000}${Pixel_000}`,
];
  
type HeartTable<ColumnFill extends string[] = Fill<HardcodedHeart['length']>> = {
  [C in ColumnFill[number]]: HardcodedHeart[StringToNumber<C>]
};

type HeartDisplay = HeartTable;