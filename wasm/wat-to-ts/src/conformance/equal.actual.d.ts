import { Call, Numbers } from 'hotscript'

type $main<
  $a extends number,
  $b extends number,
  RESULT extends number =
    (Call<Numbers.Equal<
      $a,
      $b
    >> extends true ? 1 : 0)
> = RESULT

export type equal<
  $a extends number,
  $b extends number,
  RESULT extends number =
    $main<
      $a,
      $b
    >
> = RESULT
