type Cell = boolean;
type Row = Cell[];
type Grid = Row[];

type Frame = {
  rows: number;
  columns: number;
  grid: Grid;
};

type InitialFrame = {
  rows: 9,
  columns: 9,
  grid: [
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true,  false, false, false, false],
    [false, false, false, true,  true,  true,  false, false, false],
    [false, false, false, false, true,  false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false]
  ];
}

type StringifyCell<C extends boolean> = true extends C ? 'X' : ' ';

type StringifyRow<R extends Row> =
  R extends [infer Head extends Cell, ...infer Rest extends Cell[]]
  ? `${StringifyCell<Head>}${StringifyRow<Rest>}`
  : ''

type StringifyGrid<G extends Grid> = {
  [I in keyof G]: StringifyRow<G[I]>;
}

type Input = [
  "         ",
  "         ",
  "         ",
  "    X    ",
  "   XXX   ",
  "    X    ",
  "         ",
  "         ",
  "         "
];

type CountAliveNeighbors<
  F extends Frame,
  I extends number,
  J extends number,

  _Count extends 1[] = [],

  __Value = Frame['grid'][I][J],
> =
  I extends 0
  ? 0 // I done
  : J extends 0
    ? 1
    : 2

// WOULD ABSOLUTELY LOVE TO KNOW WHY THIS ONLY WORKS IF IT"S EXTRACTED
type UpdateRow<
  Row extends boolean[],
  X extends string,
  Value
> = {
  [XIndex in keyof Row]:
    XIndex extends X
    ? Value
    : Row[XIndex];
};

type UpdateValue<
  Grid extends boolean[][],
  X extends string,
  Y extends string,
  Value
> = {
  [YIndex in keyof Grid]:
    YIndex extends Y
    ? UpdateRow<Grid[YIndex], X, Value>
    : Grid[YIndex];
};

type SetBooleanAtPosition<
  F extends Frame,
  X extends string,
  Y extends string,
  Set extends boolean,
> = {
  [K in keyof F]:
    K extends 'grid'
    ? UpdateValue<F[K], X, Y, Set>
    : F[K]
} & Frame // would REALLY like to remove this cast with Frame;

type UpdateCell<
  F extends Frame,
  I extends number,
  J extends number,

  // __Cell = F['grid'][I][J],
  // __CountAliveNeighbors extends number = CountAliveNeighbors<Frame, I, J>,
> = SetBooleanAtPosition<F, `${I}`, `${J}`, true>

type test_sbap = UpdateCell<InitialFrame, 0, 0>;
//   ^?

type Increment<T extends 1[]> = [...T, 1];

/*
UpdateGrid<
        F,
        _I,
        Increment<_J>,
        UpdateCell<
          _Acc,
          _I['length'],
          _J['length']
        >
      >

*/

type UpdateGrid<
  F extends Frame,

  _I extends 1[] = [],
  _J extends 1[] = [],
  _Acc extends Frame = F,
> =
  _I['length'] extends F['rows']
  ? _J['length'] extends F['columns']

      // no more rows or columns.  all done.
    ? _Acc
    
      // more columns, so increment _J
    : UpdateGrid<
        F,
        _I,
        Increment<_J>,
        // _Acc
        UpdateCell<_Acc, _I['length'], _J['length']>
      >

    // more rows, so increment _I
  : UpdateGrid<
      F,
      Increment<_I>,
      _J,
      // _Acc
      UpdateCell<_Acc, _I['length'], _J['length']>
    >

type Main<
  F extends Frame,
  I extends number,

  _Count extends 1[] = [],
> =
  _Count['length'] extends I
  ? Display<F['grid'], I>
  : Main<
      UpdateGrid<F>,
      I,
      Increment<_Count>
    >

/// Displayment

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type Convert<
  G extends Grid,
  _Acc extends Record<string, string> = {},
  _Count extends 1[] = [],
> =
  G extends [infer R extends Row, ...infer Tail extends Grid]
  ? Convert<
      Tail,
      _Acc & {
        [K in `0${_Count['length']}`]: StringifyRow<R>
      },
      Increment<_Count>
    >
  : _Acc

type Display<G extends Grid, I extends number> = Prettify<
  & {
      [ K in `Generation ${I}`]: ''
    }
  & Convert<G>
>;

type x = Display<InitialFrame['grid'], 0>;
//   ^?

type y = Main<InitialFrame, 5>;
//   ^?