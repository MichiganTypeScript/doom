#include <ctype.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
char* entry(char input) {
    static char result[2]; // Array to hold the uppercase character and null terminator
    result[0] = toupper(input); // Convert to uppercase
    result[1] = '\0'; // Null terminator
    return result;
}

int main() {
    // Your main function code
    return 0;
}