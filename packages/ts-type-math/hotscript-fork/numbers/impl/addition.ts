import type { AddDigits } from "./digits/addition";
import type {
  StringToTSNumber,
  TsNumberToString,
  DigitNumber,
  FromDigitNumber,
  ToDigitNumber,
  Sign,
  Num,
  MakeDigitNumber,
  InvertSign,
  Normalize,
  StringToTSBigInt,
  TsBigIntToString,
} from "./utils";
import type { CompareDigits } from "./compare"
import type { SubDigits } from "./digits/substraction";

type AddDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber
> =
  Sign<T> extends Sign<U>
  ? MakeDigitNumber<Sign<T>, AddDigits<Num<T>, Num<U>>>
  : CompareDigits<Num<T>, Num<U>> extends 1
    ? MakeDigitNumber<Sign<T>, SubDigits<Num<T>, Num<U>>>
    : MakeDigitNumber<InvertSign<T>, SubDigits<Num<U>, Num<T>>>;

export type Add<
  T extends number,
  U extends number
> = StringToTSNumber<
  FromDigitNumber<
    Normalize<
      AddDigitNumbers<ToDigitNumber<TsNumberToString<T>>, ToDigitNumber<TsNumberToString<U>>>
    >
  >
>;
type AddDigitNumbersBigInt<
  T extends DigitNumber,
  U extends DigitNumber
> =
  Sign<T> extends Sign<U>
  ? MakeDigitNumber<Sign<T>, AddDigits<Num<T>, Num<U>>>
  : CompareDigits<Num<T>, Num<U>> extends 1
    ? MakeDigitNumber<Sign<T>, SubDigits<Num<T>, Num<U>>>
    : MakeDigitNumber<InvertSign<T>, SubDigits<Num<U>, Num<T>>>;

export type AddBigInt<
  T extends bigint,
  U extends bigint
> = StringToTSBigInt<
  FromDigitNumber<
    Normalize<
      AddDigitNumbersBigInt<
        ToDigitNumber<
          TsBigIntToString<T>
        >,
        ToDigitNumber<
          TsBigIntToString<U>
        >
      >
    >
  >
>;
