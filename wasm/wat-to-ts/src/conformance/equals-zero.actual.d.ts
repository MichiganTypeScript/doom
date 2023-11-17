import { Call, Numbers } from 'hotscript'

type $isZero<
  $x extends number,
  RESULT =
    Call<Numbers.Equal<
      $x,
      0
    >>
> = RESULT

export type isZeroExport<
  $x extends number,
  RESULT =
    $isZero<
      $x
    >
> = RESULT
