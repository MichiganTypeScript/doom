import { AddDigits } from "./digits/addition..dts";
import type {
  ToNumber,
  ToString,
  Digit,
  DigitNumber,
  FromDigitNumber,
  ToDigitNumber,
  Sign,
  Num,
  MakeDigitNumber,
  InvertSign,
  Normalize,
} from "./utils.ts";
import { CompareDigits } from "./compare.ts";
import { SubDigits } from "./digits/substraction.js";

type AddDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber
> = Sign<T> extends Sign<U>
  ? MakeDigitNumber<Sign<T>, AddDigits<Num<T>, Num<U>>>
  : CompareDigits<Num<T>, Num<U>> extends 1
  ? MakeDigitNumber<Sign<T>, SubDigits<Num<T>, Num<U>>>
  : MakeDigitNumber<InvertSign<T>, SubDigits<Num<U>, Num<T>>>;

export type Add<
  T extends number,
  U extends number
> = ToNumber<
  FromDigitNumber<
    Normalize<
      AddDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
    >
  >
>;
