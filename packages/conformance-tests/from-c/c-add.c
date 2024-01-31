#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int entry(int a, int b) {
  return a + b;
}

int main() {
    return 0;
}
