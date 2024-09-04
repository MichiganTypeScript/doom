import { parentPort } from 'node:worker_threads';
import { promises as fs } from 'node:fs';

parentPort?.on('message', async ({ type, filePath, data }) => {
  if (type === 'writeFile') {
    try {
      await fs.writeFile(filePath, data, 'utf-8');
      parentPort?.postMessage({ success: true });
    } catch (error) {
      parentPort?.postMessage({ success: false, error });
    }
  }
});