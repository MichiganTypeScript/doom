import { Call, Numbers } from 'hotscript'

type $add<
  $a extends number,
  $b extends number
> =
  Call<Numbers.Add<
    $a,
    $b
  >>

export type add<
  $a extends number,
  $b extends number
> = $add<$a, $b>

type $program =
  add<1, 2>

export type program = $program
