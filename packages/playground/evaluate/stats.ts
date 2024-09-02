import { writeFile, readdir, readFile } from 'fs/promises'
import { join } from 'path'
import ts, { Program } from 'typescript';
import { mkdirSync, readdirSync, statSync, unlinkSync } from 'fs';
import {  incrementBy, initialConditions, statsDirectory, statsJsonPath, statsPath } from './config';
import { MeteringDefinite } from './metering';

const stackSize = (depth = 1): number => {
  try {
      return stackSize(depth + 1);
  } catch (e) {
      return depth;
  }
}

/**
 * There is a mode of operation where the program will run one instruction at a time, so we can benchmark individual instructions.
 */
export const isBenchmarkingIndividualInstructions = (incrementBy as number) === 1;

export const clearStats = () => {
  try {
    statSync(statsDirectory);
    const files = readdirSync(statsDirectory);
    for (const file of files) {
      unlinkSync(join(statsDirectory, file));
    }
  } catch (e) {
    if ((e as unknown as any).code === 'ENOENT') {
      // if the directory doesn't exist, create it
      mkdirSync(statsDirectory);
    }
  }
}

const getStdev = (array: number[]) => {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

type SimpleTotals = {
  sum: number;
  min: number;
  max: number;
  avg: number;
  stdev: number;
  values: number[];
}

interface Totals extends SimpleTotals {
  sumPerInstruction: number;
  minPerInstruction: number;
  maxPerInstruction: number;
  avgPerInstruction: number;
}

type ByInstructionStats = Record<string, {
  instantiations: SimpleTotals;
  time: SimpleTotals;
  instantiationsPerMs: number;
}>

type ProgramTotals = Record<keyof RunInfo, Record<string, Totals>>;

interface ProgramStats {
  programTime: number;
  stackSize: number;
  totals: ProgramTotals;
  byInstruction?: ByInstructionStats;
  summary?: Record<string, number>;
}

type Runs = Record<string, RunInfo>;

interface RunInfo {
  stats: TSProgramStats;
  metering: MeteringDefinite;
  metadata: RunMetadata;
}

export const getProgramFiles = (program: ts.Program) => (
  JSON.stringify(program.getSourceFiles().map(file => file.fileName), null, 2)
)

interface TSProgramStats {
  instantiations: number;
  types: number;
  symbols: number;
  identifiers: number;
  cache: Record<string, number>;
  files: number;
}

export const getProgramStats = (program: ts.Program): TSProgramStats => ({
  instantiations: program.getInstantiationCount(),
  types: program.getTypeCount(),
  symbols: program.getSymbolCount(),
  identifiers: program.getIdentifierCount(),
  files: program.getSourceFiles().length,
  cache: program.getRelationCacheSizes(),
})

type RunMetadata = {
  typeStringLength: number;
  activeInstruction: string | null;
  instructions: number;
  current: number;
}

export const runStats = async ({
  program,
  metadata,
  metering,
}: {
  program: ts.Program,
  metadata: RunMetadata,
  metering: MeteringDefinite,
}) => {
  const stats = getProgramStats(program);
  shortStats({
    stats,
    metadata,
    metering,
  });

  await writeFile(
    statsJsonPath(metadata.current),
    JSON.stringify({ metering, stats, metadata }, null, 2),
    'utf-8'
  );
};

const getTotals = (runs: Runs) => {
  const result = {} as ProgramTotals;

  const [runId, runInfo] = Object.entries(runs)[0] as unknown as [keyof Runs, RunInfo];
  Object.entries(runInfo).forEach((entry) => {
    const [groupId, group] = (entry as [keyof RunInfo, RunInfo[keyof RunInfo]]);
    
    result[groupId as keyof RunInfo] = {} as ProgramTotals[keyof RunInfo];
    
    Object.entries(group).forEach((stat) => {
      const [statId, statValue] = stat as [keyof RunInfo[keyof RunInfo], RunInfo[keyof RunInfo][keyof RunInfo[keyof RunInfo]]];
      if (typeof statValue !== 'number') {
        return;
      }

      /*
        Up to this point, we've essentially just been getting a path to all available statistics in such a way that doesn't require us to remember to add those statistics to this list in the future if more are ever added or removed
      */

      const values = Object.values(runs).map(run => run[groupId][statId]) as number[];
      const sum = values.reduce((acc, b) => acc + b, 0);
      const min = values.reduce((acc, b) => Math.min(acc, b), Infinity);
      const max = values.reduce((acc, b) => Math.max(acc, b), -Infinity);
      const avg = sum / values.length;
      const stdev = getStdev(values);

      const unrounded: Omit<Totals, 'values'> = {
        sum,
        sumPerInstruction: sum / incrementBy,
        min,
        minPerInstruction: min / incrementBy,
        max,
        maxPerInstruction: max / incrementBy,
        avg,
        avgPerInstruction: avg / incrementBy,
        stdev,
      };

      const rounded = Object.fromEntries(
        Object.entries(unrounded).map(([key, value]) => [
          key,
          Math.round((value + Number.EPSILON) * 100) / 100
        ])
      );

      const totals = {
        ...rounded,
        values,
      } as Totals;

      result[groupId][statId] = totals;
    });
  });

  return result;
}

const byInstruction = (runs: Runs) => {
  if (!isBenchmarkingIndividualInstructions) {
    return {};
  }

  const byInstruction = Object.values(runs).reduce((acc, run) => {
    const { activeInstruction } = run.metadata;
    if (typeof activeInstruction !== "string") {
      throw new Error("activeInstruction must be a string by this point in the program because isPerfBenchmarking is true");
    }

    const { instantiations } = run.stats;
    const { getTypeAtLocation } = run.metering;
    if (!Object.hasOwn(acc, activeInstruction)) {
      acc[activeInstruction] = {
        instantiations: {
          sum: 0,
          min: Infinity,
          max: -Infinity,
          avg: 0,
          stdev: 0,
          values: [],
        },
        time: {
          sum: 0,
          min: Infinity,
          max: -Infinity,
          avg: 0,
          stdev: 0,
          values: [],
        },
        instantiationsPerMs: 0,
      }
    }

    const current = acc[activeInstruction];

    const insts = {
      sum: current.instantiations.sum + instantiations,
      min: Math.min(current.instantiations.min, instantiations),
      max: Math.max(current.instantiations.max, instantiations),
      avg: (current.instantiations.sum  + instantiations ) / [...current.instantiations.values, instantiations].length,
      stdev: getStdev([...current.instantiations.values, instantiations]),
      values: [...current.instantiations.values, instantiations],
    };

    const time = {
      sum: current.time.sum + getTypeAtLocation,
      min: Math.min(current.time.min, getTypeAtLocation),
      max: Math.max(current.time.max, getTypeAtLocation),
      avg: (current.time.sum + getTypeAtLocation) /  [...current.time.values, getTypeAtLocation].length,
      stdev: getStdev([...current.time.values, getTypeAtLocation]),
      values: [...current.time.values, getTypeAtLocation],
    }

    return {
      ...acc,
      [activeInstruction]: {
        instantiations: insts,
        time,
        instantiationsPerMs: Math.round(time.avg),
      }
    }
  }, {} as ByInstructionStats);

  const summary =
    Object.fromEntries(
      Object.entries(byInstruction!)
        .map(([ins, v]) => [ins, v.instantiationsPerMs] as const)
        .sort((a, b) => a[1] - b[1])
        .reverse()
    )

  return {
    summary,
    byInstruction,
  }
}

const calculateTotals = async (
  programTime: ProgramStats['programTime']
): Promise<ProgramStats> => {
  let runs: Runs = {};
  for (const file of await readdir(statsDirectory)) {
    if (!file.startsWith('stats-') || !file.endsWith(".json")) {
      // console.log('skipping', file)
      continue;
    }

    const contents = await readFile(join(statsDirectory, file), 'utf-8');
    const parsed = JSON.parse(contents);
    const count = Number(file.match(/\d+/)?.[0]);
    runs[count] = parsed;
  }

  return {
    programTime,
    stackSize: stackSize(),
    totals: getTotals(runs),
    // ...byInstruction(runs), // TODO I broke this.  oops.
  }
}

export const logFinalStats = async (programTime: number) => {
  const programStats = await calculateTotals(programTime);
  await writeFile(statsPath, JSON.stringify(programStats, null, 2), 'utf-8');

  console.log(
    "total time (ms)",
    Math.round(programTime),
    " | total instantiations ",
    programStats.totals.stats.instantiations.sum
  );

  console.log(`wrote program stats to ${statsPath}`);
}

export const printColumn = (
  name: string,
  columnWidth: number,
  value: number,
) => {
  const valueRounded = Math.round(value);
  const filler = ' '.repeat(Math.max(0, columnWidth - valueRounded.toString().length));

  return [
    `| ${name}${filler}`,
    valueRounded, // you see.. when you console.log a number it shows it in orange.  so we're going through some extra trouble to keep it that way
  ]
}

export const shortStats = ({
  stats: {
    instantiations,
  },
  metadata: {
    typeStringLength,
    activeInstruction,
    current: count,
    instructions,
  },
  metering: {
    total: totalTime,
    getTypeAtLocation,
  }
}: {
  stats: TSProgramStats,
  metadata: RunMetadata,
  metering: MeteringDefinite,
}) => {
  console.log(
    ...printColumn('count', initialConditions.digits, count),
    ...printColumn('time (ms)', 7, getTypeAtLocation),
    ...printColumn('wasm/sec', 5, instructions / (totalTime / 1000)),
    ...printColumn('instantiations', 10, instantiations),
    ...printColumn('instan/ms', 7, instantiations / getTypeAtLocation),
    ...printColumn('length', 10, typeStringLength),
    `|${activeInstruction ? ` ${activeInstruction} |` : ''}`,
  );
}

export const encourage = () => {
  const phrases = [
    "Expecto Patronum!",
    "Here's to escaping the Sarlacc pit.",
    "May your mana *cough cough* err. recursion limit.. never run out",
    "Achieve victory and return with honor",
    "You're probably going to need a bigger boat",
    "You're off to great places, today is your day!",
    "The truth is out there",
    "Are you tryna create a union that's too complex to represent.. again?",
    "I always trusted code more than people anyway.",
    "To excessive and possibly infinite depth and beyond!", // credit: DBlass
    "10 bucks says what comes next starts with \"RangeError: Maximum call stack size exceeded at `instantiateTypes`\"",
    "just another few months and this thing will finally work.. right?",
  ]
  
  console.log(phrases[Math.floor(Math.random() * phrases.length)]);
  console.log();
}