import { Call, Numbers } from 'hotscript'

type $exampleFunction<
  $x extends number =
    5,
  RESULT =
    Call<Numbers.GreaterThan<
      $x,
      3
    >>
> = RESULT
