static int arr[] = {4, 5, 0, 6};

int* entry() {
    return arr;
}

int entrySize() {
    return sizeof(arr) / sizeof(arr[0]);
}

