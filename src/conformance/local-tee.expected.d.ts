import { Call, Numbers } from 'hotscript'

type $localTee<
  $x extends number,
  $y extends number =
    $x,
  RESULT extends number =
    Call<Numbers.Add<
      $x,
      $y
    >>
> = RESULT

type $entry<
  $a extends number,
  RESULT extends number =
    $localTee<
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
