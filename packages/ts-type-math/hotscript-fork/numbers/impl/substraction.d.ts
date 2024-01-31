import type { AddDigits } from "./digits/addition.d.ts";
import type {
  DigitNumber,
  FromDigitNumber,
  InvertSign,
  MakeDigitNumber,
  Normalize,
  Num,
  Sign,
  ToDigitNumber,
  ToNumber,
  ToString,
} from "./utils.ts";
import type { CompareDigits } from "./compare.d.ts";
import type { SubDigits } from "./digits/substraction.d.ts";

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
> = ToNumber<
  FromDigitNumber<
    Normalize<
      SubDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
    >
  >
>;
