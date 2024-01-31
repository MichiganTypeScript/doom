import type {
  ToNumber,
  MakeDigitNumber,
  FromDigitNumber,
  Normalize,
  DigitNumber,
  Sign,
  Num,
  ToDigitNumber,
  ToString,
  Digit,
} from "./utils.d.ts";
import type { PowerDigits } from "./digits/power.d.ts";

type PowerSign<S extends "" | "-", U extends DigitNumber> = S extends "-"
  ? Num<U> extends [...Digit[], 0 | 2 | 4 | 6 | 8]
    ? ""
    : "-"
  : "";

export type PowerDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber
> = Sign<U> extends "-"
  ? MakeDigitNumber<Sign<T>, [0]>
  : MakeDigitNumber<PowerSign<Sign<T>, U>, PowerDigits<Num<T>, Num<U>>>;

export type Power<
  T extends number,
  U extends number
> = ToNumber<
  FromDigitNumber<
    Normalize<
      PowerDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
    >
  >
>;
