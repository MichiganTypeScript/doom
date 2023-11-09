import { Numbers } from 'hotscript';

type add<
  $a extends number,
  $b extends number
> = Numbers.Add<$a, $b>;
