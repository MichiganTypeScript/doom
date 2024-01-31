import type { Add } from "./addition.d.ts";
import type { AddDigits } from "./digits/addition.d.ts";
import type { Digit, Num, ToDigitNumber, ToString } from "./utils.d.ts";
import type { Sub } from "./substraction.d.ts";

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
