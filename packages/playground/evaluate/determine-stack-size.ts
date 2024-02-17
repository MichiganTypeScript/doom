// lol is there really not a better way to do this?
export const stackSize = (depth = 1): number => {
  try {
      return stackSize(depth + 1);
  } catch (e) {
      return depth;
  }
}

// anyway.  check the system stack size limit with `ulimit -s`
// If you get `Segmentation fault (core dumped)` that's probably why.
// console.log(stackSize());
