import type { AddDigits } from "./digits/addition";
import type {
  DigitNumber,
  FromDigitNumber,
  InvertSign,
  MakeDigitNumber,
  Normalize,
  Num,
  Sign,
  ToDigitNumber,
  StringToTSNumber,
  TsNumberToString,
} from "./utils";
import type { CompareDigits } from "./compare"
import type { SubDigits } from "./digits/substraction";

type SubDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber
> = Sign<T> extends Sign<U>
  ? CompareDigits<Num<T>, Num<U>> extends 1
    ? MakeDigitNumber<Sign<T>, SubDigits<Num<T>, Num<U>>>
    : MakeDigitNumber<InvertSign<T>, SubDigits<Num<U>, Num<T>>>
  : MakeDigitNumber<Sign<T>, AddDigits<Num<T>, Num<U>>>;

export type Sub<
  T extends number,
  U extends number
> = StringToTSNumber<
  FromDigitNumber<
    Normalize<
      SubDigitNumbers<ToDigitNumber<TsNumberToString<T>>, ToDigitNumber<TsNumberToString<U>>>
    >
  >
>;
