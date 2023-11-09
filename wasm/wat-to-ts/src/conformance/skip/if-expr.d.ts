import { Call, Numbers } from "hotscript";

type ifexpr<
  n extends number,
  control extends number
> =
  Call<
    Numbers.Add<
      n,
      Numbers.GreaterThanOrEqual<
        control,
        0
      > extends true
      ? 1
      : -1
    >
  >;
