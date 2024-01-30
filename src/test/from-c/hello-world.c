#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
char* entry() {
  return "Greetings humans, I am Ziltoid... the omniscient.\n"
         "I have come far from across the Omniverse.\n"
         "You shall fetch me your universe's ultimate cup of coffee... Black!\n"
         "You have five Earth minutes.\nMake it perfect!";
}

int main() {
    return 0;
}
