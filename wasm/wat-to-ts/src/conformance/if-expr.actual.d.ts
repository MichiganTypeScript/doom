import { Call, Numbers } from 'hotscript'

type $ifexpr<
  $n extends number,
  $control extends number,
  RESULT =
    Call<Numbers.Add<
      $n,
      (Call<Numbers.GreaterThanOrEqual<
        $control,
        0
      >> extends true ? 1 : 0) extends 1
      ? 1
      : -1
    >>
> = RESULT

export type ifexpr<
  $n extends number,
  $control extends number,
  RESULT =
    $ifexpr<
      $n,
      $control
    >
> = RESULT
