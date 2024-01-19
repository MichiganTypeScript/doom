import { Call, Numbers } from 'hotscript'

type $theOmniscient<
  RESULT extends number =
    Call<Numbers.Sub<
      10,
      3
    >>
> = RESULT

export type ziltoid<
  RESULT extends number =
    $theOmniscient
> = RESULT
