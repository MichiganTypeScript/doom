
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
export const comeUpForAirEvery = 1_000;

export interface InitialConditions {
  /**
   * the current instruction to start from.
   * if greater than 0 it will automatically not clear prior results
   */
  startAt: 0 | number;

  /** if `Infinity`, the fun never stops.  otherwise it will forcibly halt at a the specified instructions count */
  stopAt: number;

  /** the number of digits in the filenames and types.  so a value of 4 will yield "0001", "0002", etc. */
  digits: number;
}

export const initialConditions = {
  startAt: 0,
  stopAt: Infinity, // 1_000_000,
  digits: 8,
} satisfies InitialConditions;

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
export const csvPath = join(statsDirectory, 'program-stats.csv');

export const formatCurrent = (current: number) => String(current).padStart(initialConditions.digits, '0');
export const RESULT_PREFIX = 'result-';
export const createResultFilePath = (current: number) => join(resultsDirectory, `${RESULT_PREFIX}${formatCurrent(current)}.ts`)
export const STATS_PREFIX = 'stats-';
export const statsJsonPath = (current: number) => join(statsDirectory, `${STATS_PREFIX}${formatCurrent(current)}.json`);
export const shouldTakeABreath = (timeSpentUnderwater: number, current: number) => current === 0 || timeSpentUnderwater >= comeUpForAirEvery;
