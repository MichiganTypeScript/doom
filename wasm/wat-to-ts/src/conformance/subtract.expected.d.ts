import { Call, Numbers } from 'hotscript'

type $theOmniscient<
  RESULT =
    Call<Numbers.Sub<
      10,
      3
    >>
> = RESULT

export type ziltoid<
  RESULT =
    $theOmniscient
> = RESULT
