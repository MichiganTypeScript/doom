import { Call, Numbers } from 'hotscript'

type $ifexpr<
  $n extends number,
  $control extends number,
  RESULT extends number =
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

type $entry<
  $a extends number,
  $b extends number,
  RESULT extends number =
    $ifexpr<
      $a,
      $b
    >
> = RESULT

export type entry<
  $a extends number,
  $b extends number,
  RESULT extends number =
    $entry<
      $a,
      $b
    >
> = RESULT
