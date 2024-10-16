import { parentPort } from "node:worker_threads";
import { promises as fs } from "node:fs";
import { Rome, Distribution } from "@biomejs/js-api";

const rome = await Rome.create({
  distribution: Distribution.NODE,
});
rome.applyConfiguration({
  // @ts-ignore there's a problem with the biome js-api.  there's also a pnpm patch to fix this
  gitignore_matches: [],
  files: {
    maxSize: 1024 * 1024 * 1024,
  },
});

parentPort?.on(
  "message",
  async ({ type, filePath, data, options: { format } }) => {
    if (type === "writeFile") {
      if (format) {
        let { content, diagnostics } = rome.formatContent(data, {
          filePath,
        });
        if (diagnostics.length > 0) {
          throw new Error(`diagnostics from formatter ${diagnostics}`);
        }
        data = content;
      }

      await fs.writeFile(filePath, data, "utf-8");

    }
  },
);
