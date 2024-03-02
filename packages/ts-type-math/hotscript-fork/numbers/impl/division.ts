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
  Digit,
  TsBigIntToString,
  StringToTSBigInt,
} from "./utils"
import type { DivDigits, ModDigits, DivModDigits } from "./digits/division";

export type DivDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber
> = MakeDigitNumber<MulSign<Sign<T>, Sign<U>>, DivDigits<Num<T>, Num<U>>>;

export type DivTSNumbers<
  T extends number,
  U extends number
> = StringToTSNumber<
  FromDigitNumber<
    Normalize<
      DivDigitNumbers<ToDigitNumber<TsNumberToString<T>>, ToDigitNumber<TsNumberToString<U>>>
    >
  >
>;

export type DivTSBigInt<
  T extends bigint,
  U extends bigint
> = StringToTSBigInt<
  FromDigitNumber<
    Normalize<
      DivDigitNumbers<
        ToDigitNumber<TsBigIntToString<T>>,
        ToDigitNumber<TsBigIntToString<U>>
      >
    >
  >
>;

export type ModDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber
> =
  MakeDigitNumber<
    Sign<T>,
    ModDigits<Num<T>,
    Num<U>>
  >;

export type Mod<
  T extends number,
  U extends number
> = StringToTSNumber<
  FromDigitNumber<
    Normalize<
      ModDigitNumbers<
        ToDigitNumber<TsNumberToString<T>>,
        ToDigitNumber<TsNumberToString<U>>
      >
    >
  >
>;

export type ModBigInt<
  T extends bigint,
  U extends bigint
> = StringToTSBigInt<
  FromDigitNumber<
    Normalize<
      ModDigitNumbers<
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

export type DivModDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber,
  DivMod extends { Quotient: Digit[]; Remainder: Digit[] } = DivModDigits<
    Num<T>,
    Num<U>
  >
> = {
  Quotient: MakeDigitNumber<MulSign<Sign<T>, Sign<U>>, DivMod["Quotient"]>;
  Remainder: MakeDigitNumber<Sign<T>, DivMod["Remainder"]>;
};

export type DivMod<
  T extends number,
  U extends number,
  DivModNumbers extends {
    Quotient: DigitNumber;
    Remainder: DigitNumber;
  } = DivModDigitNumbers<ToDigitNumber<TsNumberToString<T>>, ToDigitNumber<TsNumberToString<U>>>
> = {
  Quotient: StringToTSNumber<FromDigitNumber<Normalize<DivModNumbers["Quotient"]>>>;
  Remainder: StringToTSNumber<FromDigitNumber<Normalize<DivModNumbers["Remainder"]>>>;
};
