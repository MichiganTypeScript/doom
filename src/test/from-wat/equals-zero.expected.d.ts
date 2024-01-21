import { Call, Numbers } from 'hotscript'

type $isZero<
  $x extends number,
  RESULT extends number =
    (Call<Numbers.Equal<
      $x,
      0
    >> extends true ? 1 : 0)
> = RESULT

type $entry<
  $a extends number,
  RESULT extends number =
    $isZero<
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
