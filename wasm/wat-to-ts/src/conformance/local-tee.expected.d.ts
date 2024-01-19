import { Call, Numbers } from 'hotscript'

type $useLocalTee<
  $x extends number,
  $y extends number =
    $x,
  RESULT extends number =
    Call<Numbers.Add<
      $x,
      $y
    >>
> = RESULT

export type localTee<
  $x extends number,
  RESULT extends number =
    $useLocalTee<
      $x
    >
> = RESULT
