import { parentPort } from "node:worker_threads";
import { promises as fs } from "node:fs";
import { Biome, Distribution } from "@biomejs/js-api";

const biome = await Biome.create({
  distribution: Distribution.NODE,
});
biome.applyConfiguration({
  files: {
    maxSize: 1024 * 1024 * 1024,
  },
});

parentPort?.on(
  "message",
  async ({ type, filePath, data, options: { format } }) => {
    if (type === "writeFile") {
      if (format) {
        let { content, diagnostics } = biome.formatContent(data, {
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
