#include <emscripten.h>

#define true 1
#define false 0

typedef int bool;
typedef bool Cell;
typedef Cell Row[9]; // Assuming a fixed size of 9 columns
typedef Row Grid[9]; // Assuming a fixed size of 9 rows

typedef struct {
    int rows;
    int columns;
    Grid grid;
} Frame;

void countAliveNeighbors(Frame frame, int x, int y, int* count) {
    *count = 0;
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                // Skip the current cell
                continue;
            }

            int newX = x + i;
            int newY = y + j;

            if (newX >= 0 && newX < frame.rows && newY >= 0 && newY < frame.columns && frame.grid[newX][newY]) {
                (*count)++;
            }
        }
    }
}

Frame updateGrid(Frame frame) {
    Frame newFrame;
    newFrame.rows = frame.rows;
    newFrame.columns = frame.columns;

    for (int i = 0; i < frame.rows; i++) {
        for (int j = 0; j < frame.columns; j++) {
            int aliveNeighbors;
            countAliveNeighbors(frame, i, j, &aliveNeighbors);
            if (frame.grid[i][j]) {
                // Cell is currently alive
                newFrame.grid[i][j] = (aliveNeighbors == 2 || aliveNeighbors == 3) ? true : false;
            } else {
                // Cell is currently dead
                newFrame.grid[i][j] = (aliveNeighbors == 3) ? true : false;
            }
        }
    }

    return newFrame;
}

// Define a maximum size for the grid string
#define MAX_GRID_SIZE 1000

char* displayGrid(Frame frame) {
    // - false is a space
    // - true is an x
    // - rows are separated by a newline

    static char gridString[MAX_GRID_SIZE];
    int position = 0;

    for (int i = 0; i < frame.rows; i++) {
        for (int j = 0; j < frame.columns; j++) {
            if (position < MAX_GRID_SIZE - 2) {
                gridString[position++] = frame.grid[i][j] ? 'x' : ' ';
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
    Frame frame;
    frame.rows = 9;
    frame.columns = 9;

    Grid initialState = {
        {false, false, false, false, false, false, false, false, false},
        {false, false, false, false, false, false, false, false, false},
        {false, false, false, false, false, false, false, false, false},
        {false, false, false, false, true, false, false, false, false},
        {false, false, false, true, true, true, false, false, false},
        {false, false, false, false, true, false, false, false, false},
        {false, false, false, false, false, false, false, false, false},
        {false, false, false, false, false, false, false, false, false},
        {false, false, false, false, false, false, false, false, false}
    };

    for (int i = 0; i < frame.rows; i++) {
        for (int j = 0; j < frame.columns; j++) {
            frame.grid[i][j] = initialState[i][j];
        }
    }

    for (int i = 0; i < iterations; i++) {
        frame = updateGrid(frame);
    }

    return displayGrid(frame);
}

int main() {
    return 0;
}
