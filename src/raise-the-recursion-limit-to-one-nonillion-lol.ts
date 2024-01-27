/*

That's right, bitches. I'm raising the recursion limit to one nonillion.

DEAL WITH IT.

depending on your package manager this may actually patch the TypeScript compiler you use for everything else.  Sorry not sorry.

*/

import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const __dirname = new URL('.', import.meta.url).pathname;
const filePath = join(__dirname, "..", "node_modules/typescript/lib/tsserver.js");

console.log(filePath)

const doTheDeed = async () => {
  let data = await readFile(filePath, "utf8");
  data = data.replace(/\(tailCount === 1e3\)/gm, "tailCount === 1e30");
  data = data.replace(/\(instantiationDepth === 100 \|\| instantiationCount >= 5e6\)/, "instantiationDepth === 1e30 || instantiationCount >= 5e60");
  await writeFile(filePath, data, "utf8");
};

doTheDeed().then(console.log).catch(console.error);
