type $selectTrue<
  RESULT =
    0 extends 0
    ? 20
    : 10
> = RESULT

export type selectTrue<
  RESULT =
    $selectTrue
> = RESULT

type $selectFalse<
  RESULT =
    1 extends 0
    ? 20
    : 10
> = RESULT

export type selectFalse<
  RESULT =
    $selectFalse
> = RESULT
