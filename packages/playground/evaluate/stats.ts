import { writeFile, readdir, readFile } from 'fs/promises'
import { join } from 'path'
import ts from 'typescript';
import { mkdirSync, readdirSync, statSync, unlinkSync } from 'fs';
import { incrementBy, statsDirectory, statsJsonPath, statsPath } from './config';

const stackSize = (depth = 1): number => {
  try {
      return stackSize(depth + 1);
  } catch (e) {
      return depth;
  }
}

const isPerfBenchmarking = (incrementBy as number) === 1;

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

interface RunStats {
  instantiations: number;
  types: number;
  symbols: number;
  identifiers: number;
  cache: Record<string, number>;
  filesCount: number;
  typeStringLength: number;
  activeInstruction: string;
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

type ProgramTotals = Record<string, Totals>;

interface ProgramStats {
  programTime: number;
  stackSize: number;
  totals: ProgramTotals;
  byInstruction?: ByInstructionStats;
  summary?: Record<string, number>;
}

type Runs = Record<number, RunInfo>;

interface RunInfo {
  stats: RunStats;
  time: Record<string, number>;
}

export const getProgramFiles = (program: ts.Program) => (
  JSON.stringify(program.getSourceFiles().map(file => file.fileName), null, 2)
)

export const getProgramStats = (program: ts.Program) => ({
  instantiations: program.getInstantiationCount(),
  types: program.getTypeCount(),
  symbols: program.getSymbolCount(),
  identifiers: program.getIdentifierCount(),
  cache: program.getRelationCacheSizes(),
  filesCount: program.getSourceFiles().length,
})

export const runStats = (
  programStats: ReturnType<typeof getProgramStats>,
  typeStringLength: number,
  activeInstruction: string,
  tGetTypeAtLocation: number,
  current: number,
  time: Record<string, any>
) => {
  const stats = {
    ...programStats,
    typeStringLength,
    activeInstruction,
  }

  shortStats({
    count: current,
    getTypeAtLocation: tGetTypeAtLocation,
    instantiations: stats.instantiations,
    typeStringLength,
    activeInstruction,
  });


  writeResultsStats(current, time, stats)
};

const getTotal = (path: string[], runs: Runs): Record<string, Totals> => {
  const values = Object.values(runs).map(run => (run as unknown as any)[path[0]][path[1]]);
  const count = Object.keys(runs).map(id => Number(id)).reduce((acc, b) => Math.max(acc, b), 0);
  
  const sum = values.reduce((acc, b) => acc + b, 0);
  const sumPerInstruction = sum / incrementBy;
  const min = values.reduce((acc, b) => Math.min(acc, b), Infinity);
  const minPerInstruction = min / incrementBy;
  const max = values.reduce((acc, b) => Math.max(acc, b), -Infinity);
  const maxPerInstruction = max / incrementBy;
  const avg = sum / incrementBy;
  const avgPerInstruction = avg / count;
  const stdev = values.reduce((acc, value) => {
    const diff = value - avg;
    return acc + diff ** 2
  }, 0) / (incrementBy - 1);

  const unrounded = {
    sum,
    sumPerInstruction,
    min,
    minPerInstruction,
    max,
    maxPerInstruction,
    avg,
    avgPerInstruction,
    stdev,
  }
  const rounded = Object.fromEntries(
    Object.entries(unrounded).map(([key, value]) => [
      key,
      Math.round((value + Number.EPSILON) * 100) / 100
    ])
  );

  return {
    [path.join('.')]: {
      ...(rounded as typeof unrounded),
      values,
    }
  }
}

const programStats = async ({
  programTime,
}: Pick<ProgramStats, 'programTime'>): Promise<ProgramStats> => {
  let runs: Runs = {};
  for (const file of await readdir(statsDirectory)) {
    if (!file.startsWith('stats-') || !file.endsWith(".json")) {
      console.log('skipping', file)
      continue;
    }

    const contents = await readFile(join(statsDirectory, file), 'utf-8');
    const parsed = JSON.parse(contents);
    const count = Number(file.match(/\d+/)?.[0]);
    runs[count] = parsed;
  }

  // min max avg stdev of each stat
  let totals = {
    ...getTotal(['time', 'getTypeAtLocation'], runs),
    ...getTotal(['time', 'typeToString'], runs),
    ...getTotal(['time', 'totalTime'], runs),
    ...getTotal(['stats', 'instantiations'], runs),
    ...getTotal(['stats', 'types'], runs),
    ...getTotal(['stats', 'symbols'], runs),
    ...getTotal(['stats', 'identifiers'], runs),
    ...getTotal(['stats', 'typeStringLength'], runs),
  }

  const byInstruction = isPerfBenchmarking ? {
    byInstruction: Object.values(runs).reduce((acc, run) => {
      const { activeInstruction } = run.stats;
      const { instantiations } = run.stats;
      const { getTypeAtLocation } = run.time;
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
    }, {} as ByInstructionStats)
  } : {};

  const summary = isPerfBenchmarking ? {
    summary:
      Object.fromEntries(
        Object.entries(byInstruction.byInstruction!)
          .map(([ins, v]) => [ins, v.instantiationsPerMs] as const)
          .sort((a, b) => a[1] - b[1])
          .reverse()
      )
  } : {};

  return {
    programTime,
    ...summary,
    stackSize: stackSize(),
    totals,
    ...byInstruction,
  }
}


export const writeProgramStats = async (programTime: number) => {
  const stats = await programStats({ programTime });

  console.log(
    "total time (ms)",
    Math.round(programTime),
    " | total instantiations ",
    stats.totals['stats.instantiations'].sum
  );

  await writeFile(statsPath, JSON.stringify(stats, null, 2), 'utf-8');
  console.log(`wrote program stats to ${statsPath}`);
}

export const shortStats = ({
  count,
  getTypeAtLocation,
  instantiations,
  typeStringLength,
  activeInstruction,
}: {
  count: number,
  getTypeAtLocation: number,
  instantiations: number,
  typeStringLength: number,
  activeInstruction: string,
}) => {
  // you see.. when you console.log a number it shows it in orange.  so we're going through some extra trouble to keep it that way
  const countRounded = Math.round(count)
  const countFiller = ' '.repeat(Math.max(0, 6 - countRounded.toString().length));

  const gTALRounded = Math.round(getTypeAtLocation);
  const gTALFiller = ' '.repeat(Math.max(0, 7 - gTALRounded.toString().length));
  
  const instRounded = Math.round(instantiations);
  const instFiller = ' '.repeat(Math.max(0, 10 - instRounded.toString().length));
  
  const throughputRounded = Math.round(instantiations / getTypeAtLocation);
  const throughputFiller = ' '.repeat(Math.max(0, 7 - throughputRounded.toString().length));
  
  const lenRounded = Math.round(typeStringLength);
  const lenFiller = ' '.repeat(Math.max(0, 7 - lenRounded.toString().length));
  
  console.log(
    `| count${countFiller}`,
    countRounded,
    `| time (ms)${gTALFiller}`,
    gTALRounded,
    `| instantiations${instFiller}`,
    instRounded,
    `| inst/ms${throughputFiller}`,
    throughputRounded,
    `| length${lenFiller}`,
    lenRounded,
    `| ${isPerfBenchmarking ? activeInstruction : ''}`,
  );
}

export const writeResultsStats = async (current: number, time: any, stats: any) => {
  await writeFile(
    statsJsonPath(current),
    JSON.stringify({ time, stats }, null, 2),
    'utf-8'
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
  ]
  
  console.log(phrases[Math.floor(Math.random() * phrases.length)]);
  console.log();
}