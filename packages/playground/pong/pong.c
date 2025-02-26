#define SCREEN_SIZE 160
#define SCREEN_SIZE_HALF (SCREEN_SIZE / 2)

#define PADDLE_WIDTH 5
#define PADDLE_HEIGHT 15
#define BALL_SIZE 4
#define CHAR_WIDTH 7
#define CHAR_OFFSET_FROM_CENTER 3
#define TEXT_CHAR '#'
#define BALL_CHAR '0'
#define PADDLE_BORDER_CHAR '='
#define PADDLE_INSIDE_CHAR '.'

typedef enum {
  BUTTON_NONE,
  BUTTON_UP,
  BUTTON_DOWN,
} Button;

typedef char Screen[SCREEN_SIZE][SCREEN_SIZE];

typedef struct state {
  int ball_x;
  int ball_y;
  int dir_x;
  int dir_y;
  int paddle_1;
  int paddle_2;
  int score1;
  int score2;
  int button;
  Screen screen;
} state;

typedef int buttonPress;

void draw_ball(state *state) {
  int x_offset = state->ball_x;
  int y_offset = state->ball_y;

  //  01234
  // 0 ++ 
  // 1++++
  // 2++++
  // 3 ++ 

  state->screen[x_offset + 1][y_offset + 0] = BALL_CHAR;
  state->screen[x_offset + 2][y_offset + 0] = BALL_CHAR;

  state->screen[x_offset + 0][y_offset + 1] = BALL_CHAR;
  state->screen[x_offset + 1][y_offset + 1] = BALL_CHAR;
  state->screen[x_offset + 2][y_offset + 1] = BALL_CHAR;
  state->screen[x_offset + 3][y_offset + 1] = BALL_CHAR;

  state->screen[x_offset + 0][y_offset + 2] = BALL_CHAR;
  state->screen[x_offset + 1][y_offset + 2] = BALL_CHAR;
  state->screen[x_offset + 2][y_offset + 2] = BALL_CHAR;
  state->screen[x_offset + 3][y_offset + 2] = BALL_CHAR;

  state->screen[x_offset + 1][y_offset + 3] = BALL_CHAR;
  state->screen[x_offset + 2][y_offset + 3] = BALL_CHAR;
}

void draw_paddle(int player, state *state) {
  int x_offset = player == 1 ? SCREEN_SIZE - PADDLE_WIDTH : 0;
  int y_offset = player == 1 ? state->paddle_1 : state->paddle_2;

  //   01234
  //  0=====
  //  1=...=
  //  2=...=
  //  3=...=
  //  4=...=
  //  5=...=
  //  6=...=
  //  7=...=
  //  8=...=
  //  9=...=
  // 10=...=
  // 11=...=
  // 12=...=
  // 13=...=
  // 14=====
  for (unsigned i = 0; i < PADDLE_HEIGHT; i++) {
    if (i == 0 || i == PADDLE_HEIGHT - 1) {
      for (unsigned j = 0; j < PADDLE_WIDTH; j++) {
        state->screen[x_offset + j][y_offset + i] = PADDLE_BORDER_CHAR;
      }
      continue;
    }
    state->screen[x_offset + 0][y_offset + i] = PADDLE_BORDER_CHAR;
    state->screen[x_offset + 1][y_offset + i] = PADDLE_INSIDE_CHAR;
    state->screen[x_offset + 2][y_offset + i] = PADDLE_INSIDE_CHAR;
    state->screen[x_offset + 3][y_offset + i] = PADDLE_INSIDE_CHAR;
    state->screen[x_offset + 4][y_offset + i] = PADDLE_BORDER_CHAR;
  }
}

void draw_score(int player, state *state) {
  int score = player == 1 ? state->score1 : state->score2;

  // player 1 score on the left 3 pixels from center
  // player 2 score on the right 3 pixels from center
  int start = player == 1 ? (SCREEN_SIZE_HALF - CHAR_OFFSET_FROM_CENTER - CHAR_WIDTH) : (SCREEN_SIZE_HALF + CHAR_OFFSET_FROM_CENTER + 1);

  switch (score) {
    case 0:
      //  01234567
      // 0  ###  
      // 1 #  ## 
      // 2##   ##
      // 3##   ##
      // 4##   ##
      // 5 ##  # 
      // 6  ###  
      state->screen[start + 2][0] = TEXT_CHAR;
      state->screen[start + 3][0] = TEXT_CHAR;
      state->screen[start + 4][0] = TEXT_CHAR;

      state->screen[start + 1][1] = TEXT_CHAR;
      state->screen[start + 4][1] = TEXT_CHAR;
      state->screen[start + 5][1] = TEXT_CHAR;

      state->screen[start + 0][2] = TEXT_CHAR;
      state->screen[start + 1][2] = TEXT_CHAR;
      state->screen[start + 5][2] = TEXT_CHAR;
      state->screen[start + 6][2] = TEXT_CHAR;

      state->screen[start + 0][3] = TEXT_CHAR;
      state->screen[start + 1][3] = TEXT_CHAR;
      state->screen[start + 5][3] = TEXT_CHAR;
      state->screen[start + 6][3] = TEXT_CHAR;
      
      state->screen[start + 0][4] = TEXT_CHAR;
      state->screen[start + 1][4] = TEXT_CHAR;
      state->screen[start + 5][4] = TEXT_CHAR;
      state->screen[start + 6][4] = TEXT_CHAR;
      
      state->screen[start + 1][5] = TEXT_CHAR;
      state->screen[start + 2][5] = TEXT_CHAR;
      state->screen[start + 5][5] = TEXT_CHAR;
      
      state->screen[start + 2][6] = TEXT_CHAR;
      state->screen[start + 3][6] = TEXT_CHAR;
      state->screen[start + 4][6] = TEXT_CHAR;
      break;

    case 1:
      //  01234567
      // 0   ##   
      // 1 ####   
      // 2   ##   
      // 3   ##   
      // 4   ##   
      // 5   ##   
      // 6########
      state->screen[start + 3][0] = TEXT_CHAR;
      state->screen[start + 4][0] = TEXT_CHAR;

      state->screen[start + 1][1] = TEXT_CHAR;
      state->screen[start + 2][1] = TEXT_CHAR;
      state->screen[start + 3][1] = TEXT_CHAR;
      state->screen[start + 4][1] = TEXT_CHAR;

      state->screen[start + 3][2] = TEXT_CHAR;
      state->screen[start + 4][2] = TEXT_CHAR;

      state->screen[start + 3][3] = TEXT_CHAR;
      state->screen[start + 4][3] = TEXT_CHAR;
      
      state->screen[start + 3][4] = TEXT_CHAR;
      state->screen[start + 4][4] = TEXT_CHAR;

      state->screen[start + 3][5] = TEXT_CHAR;
      state->screen[start + 4][5] = TEXT_CHAR;
      
      state->screen[start + 0][6] = TEXT_CHAR;
      state->screen[start + 1][6] = TEXT_CHAR;
      state->screen[start + 2][6] = TEXT_CHAR;
      state->screen[start + 3][6] = TEXT_CHAR;
      state->screen[start + 4][6] = TEXT_CHAR;
      state->screen[start + 5][6] = TEXT_CHAR;
      state->screen[start + 6][6] = TEXT_CHAR;
      break;
  }
}

int paddles_collision(state *state) {
  if (
       state->ball_x < PADDLE_WIDTH
    && state->ball_y < state->paddle_2 + PADDLE_HEIGHT
    && state->ball_y + BALL_SIZE > state->paddle_2
  ) {
    return 1;
  }
  
  if (
       state->ball_x + BALL_SIZE > SCREEN_SIZE - PADDLE_WIDTH
    && state->ball_y < state->paddle_1 + PADDLE_HEIGHT
    && state->ball_y + BALL_SIZE > state->paddle_1
  ) {
    return -1;
  }
  return 0;
}

void handle_collision(state *state) {
  int dir_now = paddles_collision(state);
  if (dir_now) {
    state->dir_x = dir_now;
    state->dir_y = dir_now;
  }
  state->ball_x += state->dir_x;
  state->ball_y += state->dir_y;
}

void reset_screen(state *state) {
  // reset all pixels to ' '
  for (unsigned i = 0; i < SCREEN_SIZE; i++) {
    for (unsigned j = 0; j < SCREEN_SIZE; j++) {
      state->screen[i][j] = ' ';
    }
  }

  // draw court line
  for (unsigned i = 0; i < SCREEN_SIZE; i++) {
    state->screen[SCREEN_SIZE_HALF][i] = '|';
  }
}

// a function to render the screen which is provided by wasm
__attribute__((import_name("render")))
void render(char *screen);

char *draw_screen(state *state) {
  // Format screen into a flat array
  static char flat_screen[SCREEN_SIZE * SCREEN_SIZE];
  for (int y = 0; y < SCREEN_SIZE; y++) {
    int offset = y * SCREEN_SIZE;
    for (int x = 0; x < SCREEN_SIZE; x++) {
      flat_screen[offset + x] = state->screen[x][y];
    }
  }

  render(flat_screen);

  // Return the pointer to the flat array
  return flat_screen;
}

void handle_button_press(state *state) {
  if (state->button == BUTTON_NONE) {
    return;
  }

  if (state->button == BUTTON_UP) {
    if (state->paddle_1 > 0) {
      state->paddle_1 -= 2;
    }
  }

  if (state->button == BUTTON_DOWN) {
    if (state->paddle_1 + PADDLE_HEIGHT <= SCREEN_SIZE) {
      state->paddle_1 += 2;
    }
  }
}

void handle_enemy_paddle(state *state) {
  // make sure the paddle doesn't move past the bottom of the screen
  if (state->ball_y + PADDLE_HEIGHT >= SCREEN_SIZE) {
    state->paddle_2 = SCREEN_SIZE - PADDLE_HEIGHT;
    return;
  }

  // always keep the enemy paddle in line with the ball
  state->paddle_2 = state->ball_y;
}

void handle_scoring(state *state) {
  if (state->ball_y > SCREEN_SIZE || state->ball_y < 0) {
    state->dir_y *= -1;
  }

  if (state->ball_x < 0 || state->ball_x > SCREEN_SIZE) {
    state->ball_x = SCREEN_SIZE_HALF;
    state->ball_y = SCREEN_SIZE_HALF;
    state->dir_x *= -1;
    if (state->ball_x < 0) {
      state->score1++;
    } else {
      state->score2++;
    }
  }
}

void update(state *state) {
  handle_button_press(state);
  handle_enemy_paddle(state);
  handle_collision(state);
  handle_scoring(state);
  reset_screen(state);
  draw_score(1, state);
  draw_score(2, state);
  draw_ball(state);
  draw_paddle(1, state);
  draw_paddle(2, state);
}

char *entry(char *buttonSequence, int sequenceSize) {
  // create the initial game state without malloc
  static state state = {
    .ball_x = SCREEN_SIZE_HALF,
    .ball_y = SCREEN_SIZE_HALF,
    .dir_x = 1,
    .dir_y = 1,
    .paddle_1 = SCREEN_SIZE_HALF,
    .paddle_2 = SCREEN_SIZE_HALF,
    .score1 = 0,
    .score2 = 0,
    .button = 0,
  };

  // for each button sequence, create a new game state
  for (int i = 0; i < sequenceSize; i++) {
    state.button = buttonSequence[i];
    update(&state);
    draw_screen(&state);
  }
  return draw_screen(&state);
}