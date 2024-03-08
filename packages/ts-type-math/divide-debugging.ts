type Example<
  A extends string = "a",
  Count extends 1[] = [],
> = Count["length"] extends 1
  ? A
  : Example<
      any extends string
        ? "b"
        : "c",
      [...Count, 1]
    >;



type RESTART_TYPESCRIPT_AND_SEE_THAT_THIS_IS_A_UNION_WHILE_ITS_LOADING = Example;

type MiTS = any extends string ? "a" : "b"
//   ^?
