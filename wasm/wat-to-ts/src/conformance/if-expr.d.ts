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
  >>

export type ifexpr<
  $n extends number,
  $control extends number
> = $ifexpr<$n, $control>
