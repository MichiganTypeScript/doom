type $selectBranch<
  $condition extends number,
  RESULT extends number =
    $condition extends 0
    ? 20
    : 10
> = RESULT

type $entry<
  $a extends number,
  RESULT extends number =
    $selectBranch<
      $a
    >
> = RESULT

export type entry<
  $a extends number,
  RESULT extends number =
    $entry<
      $a
    >
> = RESULT
