import { Add } from "./addition.js";
import { AddDigits } from "./digits/addition..dts";
import { Digit, Num, ToDigitNumber, ToString } from "./utils.js";
import { Sub } from "./substraction.js";

export type SequenceOfDigits<
  T extends number,
  Min extends number = 0,
  MinDigits extends Digit[] = Num<ToDigitNumber<ToString<Min>>>,
  Acc extends Digit[][] = [MinDigits]
> = Acc["length"] extends T
  ? Acc
  : SequenceOfDigits<
      T,
      Min,
      MinDigits,
      [
        ...Acc,
        AddDigits<Num<ToDigitNumber<ToString<Acc["length"]>>>, MinDigits>
      ]
    >;

export type RangeOfDigits<
  Min extends number,
  Max extends number
> = SequenceOfDigits<Sub<Add<Max, 1>, Min>, Min>;
