import { Call, Numbers } from "hotscript";

type $andarist<
  $x extends number,
  $a extends number =
    Call<Numbers.Add<
      $x,
      10
    >>,
  a_1 extends number = 
    (Call<Numbers.GreaterThan<
      $a,
      5
    >> extends true ? 0 : 1) extends 1
    ? Call<Numbers.Add<
        $a,
        2
      >>
    : $a,
  a_2 =
    Call<Numbers.Add<
      $a,
      7
    >>,
  RESULT =
    a_2
> = RESULT

export type andarist<
  $x extends number,
  RESULT =
    $andarist<
      $x
    >
> = RESULT