import { Call, Numbers } from 'hotscript'

type $useLocalTee<
  $x extends number,
  $y extends number =
    $x,
  RESULT =
    Call<Numbers.Add<
      $x,
      $y
    >>
> = RESULT

export type useLocalTee<
  $x extends number,
  RESULT =
    $useLocalTee<
      $x
    >
> = RESULT
