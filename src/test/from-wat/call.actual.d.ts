import { Call, Numbers } from 'hotscript'

type $get42<
  RESULT extends number =
    42
> = RESULT

type $get42Plus1<
  RESULT extends number =
    Call<Numbers.Add<
      $get42,
      1
    >>
> = RESULT

type $entry<
  RESULT extends number =
    $get42Plus1
> = RESULT

export type entry<
  RESULT extends number =
    $entry
> = RESULT
