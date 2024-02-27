import type {
  StringToTSNumber,
  MakeDigitNumber,
  FromDigitNumber,
  Normalize,
  DigitNumber,
  Sign,
  Num,
  ToDigitNumber,
  TsNumberToString,
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
> = StringToTSNumber<
  FromDigitNumber<
    Normalize<
      MulDigitNumbers<ToDigitNumber<TsNumberToString<T>>, ToDigitNumber<TsNumberToString<U>>>
    >
  >
>;
