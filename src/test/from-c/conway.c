#include <emscripten.h>

#define true 1
#define false 0

typedef char bool; // this is important: it should be 1 byte
typedef bool Cell;
typedef Cell Row[9]; // Assuming a fixed size of 9 columns
typedef Row Grid[9]; // Assuming a fixed size of 9 rows

void countAliveNeighbors(Grid grid, int rows, int columns, int x, int y, int* count) {
    *count = 0;
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                continue; // Skip the current cell
            }

            int newX = x + i;
            int newY = y + j;

            if (newX >= 0 && newX < rows && newY >= 0 && newY < columns && grid[newX][newY]) {
                (*count)++;
            }
        }
    }
}

void updateGrid(Grid grid, int rows, int columns) {
    Grid newGrid;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < columns; j++) {
            int aliveNeighbors;
            countAliveNeighbors(grid, rows, columns, i, j, &aliveNeighbors);
            newGrid[i][j] = grid[i][j] ? (aliveNeighbors == 2 || aliveNeighbors == 3) : (aliveNeighbors == 3);
        }
    }
    // Copy new grid back to original grid
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < columns; j++) {
            grid[i][j] = newGrid[i][j];
        }
    }
}

// Define a maximum size for the grid string
#define MAX_GRID_SIZE 81

char* displayGrid(Grid grid, int rows, int columns) {
    // - false is a space
    // - true is an x
    // - rows are separated by a newline

    static char gridString[MAX_GRID_SIZE];
    int position = 0;

    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < columns; j++) {
            if (position < MAX_GRID_SIZE - 2) {
                gridString[position++] = grid[i][j] ? '$' : '.';
            }
        }
        if (position < MAX_GRID_SIZE - 2) {
            gridString[position++] = '\n';
        }
    }
    gridString[position] = '\0';
    return gridString;
}


EMSCRIPTEN_KEEPALIVE
char* entry(int iterations) {
    Grid grid;

    Grid initialState = {
        {true, true, false, false, false, false, false, false, false},
        {false, false, false, false, false, false, false, false, false},
        {false, false, false, false, false, false, false, false, false},
        {false, false, false, false, true, false, false, false, false},
        {false, false, false, true, true, true, false, false, false},
        {false, false, false, false, true, false, false, false, false},
        {false, false, false, false, false, false, false, false, false},
        {false, false, false, false, false, false, false, false, false},
        {false, false, false, false, false, false, false, false, false}
    };

    // Copy initialState to grid
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            grid[i][j] = initialState[i][j];
        }
    }

    // Update grid for the specified number of iterations
    for (int i = 0; i < iterations; i++) {
        updateGrid(grid, 9, 9);
    }

    return displayGrid(grid, 9, 9);
}

int main() {
    return 0;
}
