import { Call, Numbers } from 'hotscript'

type $ifexpr<
  $n extends number,
  $control extends number
> =
  Call<Numbers.Add<
    $n,
    Call<Numbers.GreaterThanOrEqual<
      $control,
      0
    >> extends true
    ? 1
    : -1
  >>;

export type ifexpr<
  $n extends number,
  $control extends number
> = $ifexpr<$n, $control>

type a = ifexpr<10, 2>;
//   ^?

type b = ifexpr<10, 1>;
//   ^?

type c = ifexpr<10, 0>;
//   ^?

type d = ifexpr<10, -1>;
//   ^?

type e = ifexpr<10, -2>;
//   ^?