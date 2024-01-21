import { Call, Numbers } from 'hotscript'

type $ziltoid<
  RESULT extends number =
    Call<Numbers.Sub<
      10,
      3
    >>
> = RESULT

type $entry<
  RESULT extends number =
    $ziltoid
> = RESULT

export type entry<
  RESULT extends number =
    $entry
> = RESULT
