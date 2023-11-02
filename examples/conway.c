#include <stdio.h>
#include <stdlib.h>
#include <time.h>

typedef int bool;
#define true 1
#define false 0

#define ROWS 20
#define COLUMNS 20

#define A ' '
#define M '▒'
#define Z '█'

typedef bool Cell;
typedef Cell Row[COLUMNS];
typedef Row Grid[ROWS];

typedef struct {
    int rows;
    int columns;
    Grid grid;
} Frame;

Frame createFrame(int rows, int columns) {
    Frame frame;
    frame.rows = rows;
    frame.columns = columns;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < columns; j++) {
            frame.grid[i][j] = false;
        }
    }
    return frame;
}

Frame seedRandom(Frame frame, float chance) {
    for (int i = 0; i < frame.rows; i++) {
        for (int j = 0; j < frame.columns; j++) {
            frame.grid[i][j] = (rand() / (float)RAND_MAX < chance) ? true : false;
        }
    }
    return frame;
}

int countAliveNeighbors(Frame frame, int x, int y) {
    int count = 0;
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                // skip counting ourself
                continue;
            }

            int newX = x + i;
            int newY = y + j;

            if (newX >= 0 && newX < frame.rows && newY >= 0 && newY < frame.columns && frame.grid[newX][newY]) {
                count++;
            }
        }
    }
    return count;
}

Frame updateGrid(Frame frame) {
    Frame newFrame;
    newFrame.rows = frame.rows;
    newFrame.columns = frame.columns;
    
    for (int i = 0; i < frame.rows; i++) {
        for (int j = 0; j < frame.columns; j++) {
            int aliveNeighbors = countAliveNeighbors(frame, i, j);
            if (frame.grid[i][j]) {
                // cell is currently alive
                newFrame.grid[i][j] = (aliveNeighbors == 2 || aliveNeighbors == 3) ? true : false;
            } else {
                // cell is currently dead
                newFrame.grid[i][j] = (aliveNeighbors == 3) ? true : false;
            }
        }
    }
    return newFrame;
}

// stuff for display

void clearConsole() {
    printf("\033[2J\033[H"); // ANSI escape codes to clear the screen
}

void displayGrid(Frame frame) {
    for (int i = 0; i < frame.rows; i++) {
        for (int j = 0; j < frame.columns; j++) {
            printf("%c", frame.grid[i][j] ? Z : A);
        }
        printf("\n");
    }
}

void animateGrid(Frame frame, int iterations, int delay) {
    for (int i = 0; i <= iterations; i++) {
        clearConsole();
        printf("Generation %d:\n", i);
        displayGrid(frame);
        fflush(stdout);
        usleep(delay * 1000);
        frame = updateGrid(frame);
    }
}

int main() {
    Frame frame = createFrame(ROWS, COLUMNS);
    frame = seedRandom(frame, 0.15);
    animateGrid(frame, 20, 250);
    return 0;
}
