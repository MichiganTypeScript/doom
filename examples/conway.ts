import process from 'process';

type Cell<T = boolean> = T;
type Row<T> = Cell<T>[];
type Grid<T> = Row<T>[];

const A = ' ';
const M = '▒';
const Z = '█';

interface Frame<T> {
  rows: number;
  columns: number;
  grid: Grid<T>;
}

const countAliveNeighbors = <T>({
  rows,
  columns,
  grid,
}: Frame<T>, x: number, y: number) => {
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
}

const updateGrid = (frame: Frame<boolean>) => {
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
  const next: typeof frame = {
    ...frame,
    grid: newGrid,
  }
  return next;
}

const createFrame = (rows: number, columns: number) => {
  const grid: Grid<false> = Array(rows).fill(Array(columns).fill(false, 0));
  return grid;
}

const seedRandom = <T>(frame: Frame<T>, chance: number) => {
  return operate(frame, _ => Math.random() < chance);
}

const operate = <T, U>(frame: Frame<T>, operator: (cell: T) => U) => {
  const next: Frame<U> = {
    ...frame,
    grid: frame.grid.map(row => row.map(operator))
  };
  return next;
}

const displayGrid = (frame: Frame<boolean>) => {
  const strings = operate(frame, cell => cell ? Z : A);
  return strings.grid.map(columns => columns.join("")).join("\n")
}

////////////////////////////////
// Example usage:
const clearConsole = () => {
  process.stdout.write('\x1B[2J\x1B[H'); // ANSI escape codes to clear the screen
};

const animateGrid = async (
  frame: Frame<boolean>,
  iterations: number,
  delay: number,
) => {
  // recursive version instead of `for` loop
  const doAnimation = async (i: number) => {
    clearConsole();
    process.stdout.write(`Generation ${i}:\n`);
    process.stdout.write(displayGrid(frame));
    await new Promise((resolve) => setTimeout(resolve, delay));
    frame = updateGrid(frame);

    if (i < iterations) {
      doAnimation(i + 1);
    }
  }
  await doAnimation(0);
};

const main = async () => {
  const rows = 20;
  const columns = 20;
  const frame = {
    rows,
    columns,
    grid: createFrame(rows, columns),
  } as Frame<boolean>;

  let workingFrame = seedRandom(frame, 0.15);

  await animateGrid(workingFrame, 20, 250);
};

main();