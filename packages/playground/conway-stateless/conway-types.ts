// credit: https://github.com/RuyiLi/cursed-typescript/blob/master/random/game-of-life"

type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;

type Cell = 'x' | '.'
type Board = Cell[][]

// Union of all valid indices for an array
type ValidIndex<Arr extends unknown[]> =
  Exclude<keyof Arr, Exclude<keyof Arr, `${number}`>> extends `${infer N extends number}`
  ? N
  : never

// Doesn't handle negative or decimal cases
// It's annoying to handle the never case, so I'm using -1 as a sentinel value instead
type Sub1<N extends number, C extends 0[] = []> =
  true extends Equals<N, 0> | Equals<N, number>
  ? -1
  : N extends [...C, 0]['length']
    ? C['length']
    : Sub1<N, [...C, 0]>

type Add1<N extends PossValues, PossValues extends number, C extends 0[] = []> =
  Equals<N, number> extends true
  ? -1
  : N extends C['length']
    ? [...C, 0]['length'] extends PossValues
      ? [...C, 0]['length']
      : -1  // prevent index out of bounds
    : Add1<N, PossValues, [...C, 0]>

type IsLive<BoardState extends Board, X extends number, Y extends number> =
  X extends ColIndexOf<BoardState>
  ? Y extends RowIndexOf<BoardState>
    ? BoardState[Y][X] extends 'x'
      ? true
      : false
    : false
  : false

type CountTrue<Arr extends any[], C extends 0[] = []> =
  Arr extends [infer L, ...infer R]
  ? L extends true
    ? CountTrue<R, [...C, 0]>
    : CountTrue<R, C>
  : C['length']

// Count the number of live cells surrounding the current cell
// This doesn't handle cells that go off of the board, so patterns like the Gosper gun get messed up after a few cycles
type CellState<
  BoardState extends Board,
  X extends ColIndexOf<BoardState>,
  Y extends RowIndexOf<BoardState>
> =
  CountTrue<[
    IsLive<BoardState, Sub1<X>, Sub1<Y>>,
    IsLive<BoardState, X, Sub1<Y>>,
    IsLive<BoardState, Add1<X, ColIndexOf<BoardState>>, Sub1<Y>>,
    IsLive<BoardState, Add1<X, ColIndexOf<BoardState>>, Y>,
    IsLive<BoardState, Add1<X, ColIndexOf<BoardState>>, Add1<Y, RowIndexOf<BoardState>>>,
    IsLive<BoardState, X, Add1<Y, RowIndexOf<BoardState>>>,
    IsLive<BoardState, Sub1<X>, Add1<Y, RowIndexOf<BoardState>>>,
    IsLive<BoardState, Sub1<X>, Y>
  ]>

type EvolveCell<BoardState extends Board, X extends ColIndexOf<BoardState>, Y extends RowIndexOf<BoardState>> =
  BoardState[Y][X] extends '.'
  ? CellState<BoardState, X, Y> extends 3
    ? 'x'
    : '.'
  : BoardState[Y][X] extends 'x'
    ? CellState<BoardState, X, Y> extends 2 | 3
      ? 'x'
      : '.'
    : never

type EvolveRow<
  OrigBoardState extends Board,
  Y extends RowIndexOf<OrigBoardState>,
  CX extends 0[] = [],
  CurrRow extends Cell[] = [],
> = 
  CX['length'] extends ColIndexOf<OrigBoardState>
  ? EvolveRow<
      OrigBoardState,
      Y,
      [...CX, 0],
      [...CurrRow, EvolveCell<OrigBoardState, CX['length'], Y>]
    >
  : CurrRow

type Evolve<
  OrigBoardState extends Board,
  CurrBoardState extends Board = [],
  CY extends 0[] = [],
> = 
  CY['length'] extends RowIndexOf<OrigBoardState>
  ? Evolve<
      OrigBoardState,
      [
        ...CurrBoardState,
        EvolveRow<OrigBoardState, CY['length']>
      ],
      [...CY, 0]
    >
  : CurrBoardState

type EvolveN<BoardState extends Board, N extends number, C extends 0[] = []> =
  C['length'] extends N
  ? BoardState
  : EvolveN<Evolve<BoardState>, N, [...C, 0]>

type RowIndexOf<BoardState extends Board> = ValidIndex<BoardState>
type ColIndexOf<BoardState extends Board> = ValidIndex<BoardState[number]>

// ================================
// ======== BEGIN TESTING =========
// ================================

// Testing Utilities

type JoinRow<Row extends Cell[], S extends string = ''> =
  Row extends [infer L extends Cell, ...infer R extends Cell[]]
  ? JoinRow<R, `${S}${L}`>
  : S

type PrintBoard<BoardState extends Board, LineSep extends string = '\n', S extends string = ''> = 
  BoardState extends [infer CurrRow extends Cell[], ...infer NextRows extends Board]
  ? S extends ''
    ? PrintBoard<NextRows, LineSep, JoinRow<CurrRow>>
    : PrintBoard<NextRows, LineSep, `${S}${LineSep}${JoinRow<CurrRow>}`>
  : S

type StringToBoard<S extends string, CurrBoard extends Board = [], CurrRow extends Cell[] = []> =
  S extends `${infer L}${infer R}`
  ? L extends '\n'
    ? CurrRow['length'] extends 0
      ? StringToBoard<R, CurrBoard, []>
      : StringToBoard<R, [...CurrBoard, CurrRow], []>
    : L extends Cell
      ? StringToBoard<R, CurrBoard, [...CurrRow, L]>
      : StringToBoard<R, CurrBoard, CurrRow>
  : CurrBoard

// Test Cases
// Hover over the type names to see the output

// https://conwaylife.com/wiki/Blinker
// Period 2
type Blinker = StringToBoard<`
...
xxx
...
`>

type PBlinker1 = PrintBoard<Blinker>
type PBlinker2 = PrintBoard<Evolve<Blinker>>
type PBlinker3 = PrintBoard<EvolveN<Blinker, 2>>
type PBlinker4 = PrintBoard<EvolveN<Blinker, 3>>

// https://conwaylife.com/wiki/Gosper_glider_gun
// Period 30
// https://conwaylife.com/wiki/Gosper_glider_gun
// Period 30
type GosperGliderGun = StringToBoard<`
............................................
.........................x..................
.......................x.x..................
.............xx......xx............xx.......
............x...x....xx............xx.......
.xx........x.....x...xx.....................
.xx........x...x.xx....x.x..................
...........x.....x.......x..................
............x...x...........................
.............xx.............................
............................................
............................................
............................................
............................................
............................................
............................................
`>

type PGun1 = PrintBoard<GosperGliderGun>
// type PGun2 = PrintBoard<EvolveN<GosperGliderGun, 1>>
// type PGun3 = PrintBoard<EvolveN<GosperGliderGun, 2>>
// type PGun4 = PrintBoard<EvolveN<GosperGliderGun, 3>>
// type PGun5 = PrintBoard<EvolveN<GosperGliderGun, 4>>
// type PGun6 = PrintBoard<EvolveN<GosperGliderGun, 5>>
// type PGun7 = PrintBoard<EvolveN<GosperGliderGun, 6>>
// type PGun8 = PrintBoard<EvolveN<GosperGliderGun, 7>>
// type PGun9 = PrintBoard<EvolveN<GosperGliderGun, 8>>
// type PGun10 = PrintBoard<EvolveN<GosperGliderGun, 9>>
// type PGun11 = PrintBoard<EvolveN<GosperGliderGun, 10>>
// type PGun12 = PrintBoard<EvolveN<GosperGliderGun, 11>>
// type PGun13 = PrintBoard<EvolveN<GosperGliderGun, 12>>
// type PGun14 = PrintBoard<EvolveN<GosperGliderGun, 13>>
// type PGun15 = PrintBoard<EvolveN<GosperGliderGun, 14>>
// type PGun16 = PrintBoard<EvolveN<GosperGliderGun, 15>>
// type PGun17 = PrintBoard<EvolveN<GosperGliderGun, 16>>
// type PGun18 = PrintBoard<EvolveN<GosperGliderGun, 17>>
// type PGun19 = PrintBoard<EvolveN<GosperGliderGun, 18>>
// type PGun20 = PrintBoard<EvolveN<GosperGliderGun, 19>>
// type PGun21 = PrintBoard<EvolveN<GosperGliderGun, 20>>
// type PGun22 = PrintBoard<EvolveN<GosperGliderGun, 21>>
// type PGun23 = PrintBoard<EvolveN<GosperGliderGun, 22>>
// type PGun24 = PrintBoard<EvolveN<GosperGliderGun, 23>>
// type PGun25 = PrintBoard<EvolveN<GosperGliderGun, 24>>
// type PGun26 = PrintBoard<EvolveN<GosperGliderGun, 25>>
// type PGun27 = PrintBoard<EvolveN<GosperGliderGun, 26>>
// type PGun28 = PrintBoard<EvolveN<GosperGliderGun, 27>>
// type PGun29 = PrintBoard<EvolveN<GosperGliderGun, 28>>
// type PGun30 = PrintBoard<EvolveN<GosperGliderGun, 29>>
type PGun31 = PrintBoard<EvolveN<GosperGliderGun, 30>>
// type PGun32 = PrintBoard<EvolveN<GosperGliderGun, 31>>