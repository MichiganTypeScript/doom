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
