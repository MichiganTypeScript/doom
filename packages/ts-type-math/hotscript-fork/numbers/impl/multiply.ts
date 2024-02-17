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
  MulSign,
} from "./utils"
import type { MulDigits } from "./digits/multiply";

export type MulDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber
> = MakeDigitNumber<MulSign<Sign<T>, Sign<U>>, MulDigits<Num<T>, Num<U>>>;

export type Mul<
  T extends number,
  U extends number
> = ToNumber<
  FromDigitNumber<
    Normalize<
      MulDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
    >
  >
>;
