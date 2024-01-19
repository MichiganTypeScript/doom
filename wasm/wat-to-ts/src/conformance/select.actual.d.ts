type $selectTrue<
  RESULT extends number =
    0 extends 0
    ? 20
    : 10
> = RESULT

export type selectTrue<
  RESULT extends number =
    $selectTrue
> = RESULT

type $selectFalse<
  RESULT extends number =
    1 extends 0
    ? 20
    : 10
> = RESULT

export type selectFalse<
  RESULT extends number =
    $selectFalse
> = RESULT
