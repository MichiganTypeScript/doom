
import { dirname, join } from "path";
import { fileURLToPath } from "url";

/** this is the magic type alias that the script is looking for in the evaluationFilePath */
export const targetTypeAlias = 'Evaluate';
export const incrementBy = 50;
export const readStringFromMemory = true;

/**
 * controls how often the program prints to file.
 * set to 0 for it to always print
 */
export const comeUpForAirEvery = 500;

export const initialConditions = {
  current: 0,
  stopAt: 1_000_000,
}

export const simpleTypeMode = process.argv.includes('--simple');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const projectRoot = join(__dirname, '../../../');
export const globalDefinitions = join(__dirname, '../../../global.d.ts');
export const tsconfigFilePath = join(projectRoot, './tsconfig.json');
export const resultsDirectory = join(__dirname, 'results');
export const playgroundFilePath = join(__dirname, 'playground.ts');
export const finalResultPath = join(resultsDirectory, 'results.ts');
export const bootstrapFilePath = join(resultsDirectory, 'bootstrap.ts');
export const statsDirectory = join(resultsDirectory, 'stats');
export const statsPath = join(statsDirectory, 'program-stats.json');

export const formatCurrent = (current: number) => String(current).padStart(6, '0');
export const createResultFilePath = (current: number) => join(resultsDirectory, `results-${formatCurrent(current)}.ts`)
export const statsJsonPath = (current: number) => join(statsDirectory, `stats-${formatCurrent(current)}.json`);
export const shouldTakeABreath = (timeSpentUnderwater: number, current: number) => current === 0 || timeSpentUnderwater >= comeUpForAirEvery;
