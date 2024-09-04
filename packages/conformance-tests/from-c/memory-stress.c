#define MAX_SIZE 1000000

char* entry(int n) {
  // initialize a string
  static char str[MAX_SIZE];
  
  for (int i = 0; i < n; i++) {
    // append to the string
    str[i] = 'a';
  }

  // null terminate the string
  str[n] = '\0';

  // return the string
  return str;
}