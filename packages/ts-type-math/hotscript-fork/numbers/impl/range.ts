import type { Add } from "./addition"
import type { AddDigits } from "./digits/addition";
import type { Digit, Num, ToDigitNumber, TsNumberToString } from "./utils"
import type { Sub } from "./substraction"

export type SequenceOfDigits<
  T extends number,
  Min extends number = 0,
  MinDigits extends Digit[] = Num<ToDigitNumber<TsNumberToString<Min>>>,
  Acc extends Digit[][] = [MinDigits]
> = Acc["length"] extends T
  ? Acc
  : SequenceOfDigits<
      T,
      Min,
      MinDigits,
      [
        ...Acc,
        AddDigits<Num<ToDigitNumber<TsNumberToString<Acc["length"]>>>, MinDigits>
      ]
    >;

export type RangeOfDigits<
  Min extends number,
  Max extends number
> = SequenceOfDigits<Sub<Add<Max, 1>, Min>, Min>;
