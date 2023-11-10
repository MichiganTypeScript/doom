import { Numbers, Call } from 'hotscript';

type ifexpr<
  $n extends number,
  $control extends number
> = Call<Numbers.GreaterThanOrEqual<control, 0>> extends true

? 1
: -1Call<Numbers.Add<$n, $control>>;
