import process from "process";

type Cell = boolean;
type Row = Cell[];
type Grid = Row[];

interface Frame {
  rows: number;
  columns: number;
  grid: Grid;
}

const initialState: Grid = [
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, true, false, false, false, false],
  [false, false, false, true, true, true, false, false, false],
  [false, false, false, false, true, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
];

const countAliveNeighbors = (
  { rows, columns, grid }: Frame,
  x: number,
  y: number
) => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        // Skip the current cell
        continue;
      }

      const newX = x + i;
      const newY = y + j;

      if (
        newX >= 0 &&
        newX < rows &&
        newY >= 0 &&
        newY < columns &&
        grid[newX][newY]
      ) {
        count++;
      }
    }
  }
  return count;
};

const updateGrid = (frame: Frame) => {
  const newGrid: typeof frame.grid = [];

  for (let i = 0; i < frame.rows; i++) {
    newGrid[i] = [];
    for (let j = 0; j < frame.columns; j++) {
      const aliveNeighbors = countAliveNeighbors(frame, i, j);
      if (frame.grid[i][j]) {
        // Cell is currently alive
        newGrid[i][j] = aliveNeighbors === 2 || aliveNeighbors === 3;
      } else {
        // Cell is currently dead
        newGrid[i][j] = aliveNeighbors === 3;
      }
    }
  }
  const next: Frame = {
    ...frame,
    grid: newGrid,
  };
  return next;
};

const displayGrid = (frame: Frame) => {
  return frame.grid
    .map((columns) => columns.map((cell) => (cell ? "█" : " ")).join(""))
    .join("\n");
};

const main = () => {
  const rows = initialState.length;
  const columns = initialState[0].length;
  const grid = initialState;
  const iterations = 1;

  let frame: Frame = {
    rows,
    columns,
    grid,
  };

  for (let i = 0; i < iterations; i += 1) {
    frame = updateGrid(frame);
  }

  process.stdout.write(`Generation ${iterations}:`);
  process.stdout.write("\n");
  process.stdout.write(displayGrid(frame));
  process.stdout.write("\n");
};

main();
