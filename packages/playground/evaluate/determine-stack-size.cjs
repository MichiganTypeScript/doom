// lol is there really not a better way to do this?
function stackSize(depth = 1) {
  try {
      return stackSize(depth + 1);
  } catch (e) {
      return depth;
  }
}

console.log(`Maximum stack size: ${stackSize()}`);

// anyway.  check the system stack size limit with `ulimit -s`
// If you get `Segmentation fault (core dumped)` that's probably why.
