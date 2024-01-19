import { Call, Numbers } from 'hotscript'

type $isZero<
  $x extends number,
  RESULT extends number =
    (Call<Numbers.Equal<
      $x,
      0
    >> extends true ? 1 : 0)
> = RESULT

export type isZeroExport<
  $x extends number,
  RESULT extends number =
    $isZero<
      $x
    >
> = RESULT
