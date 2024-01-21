import { Call, Numbers } from 'hotscript'

type $andarist<
  $x extends number,
  RESULT extends number =
    Call<Numbers.Add<
      Call<Numbers.Add<
        $x,
        (Call<Numbers.GreaterThan<
          $x,
          -5
        >> extends true ? 1 : 0) extends 0
        ? 10
        : 12
      >>,
      7
    >>
> = RESULT

type $entry<
  $a extends number,
  RESULT extends number =
    $andarist<
      $a
    >
> = RESULT

export type entry<
  $a extends number,
  RESULT extends number =
    $entry<
      $a
    >
> = RESULT
