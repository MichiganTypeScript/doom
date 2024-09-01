int toupper(int c) {
    if (c >= 'a' && c <= 'z') {
        return c - ('a' - 'A');
    }
    return c;
}

char* entry(char input) {
    static char result[2]; // Array to hold the uppercase character and null terminator
    result[0] = toupper(input); // Convert to uppercase
    result[1] = '\0'; // Null terminator
    return result;
}
