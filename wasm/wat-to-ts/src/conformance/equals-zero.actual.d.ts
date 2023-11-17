import { Call, Numbers } from 'hotscript'

type $isZero<
  $x extends number,
  RESULT =
    Call<Numbers.Equal<
      $x,
      0
    >>
> = RESULT
