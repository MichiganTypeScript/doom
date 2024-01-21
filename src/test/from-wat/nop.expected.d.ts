type $nop<
  RESULT =
    unknown
> = RESULT

type $entry<
  RESULT =
    $nop
> = RESULT

export type entry<
  RESULT =
    $entry
> = RESULT
