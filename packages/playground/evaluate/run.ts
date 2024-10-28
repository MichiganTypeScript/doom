import { join } from "path";
import { statSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import {
  clearStats,
  encourage,
  logFinalStats,
  logStats,
} from "./stats";
import {
  config,
  startFilePath,
  resultsDirectory,
  simpleTypeMode,
  statsOnlyMode,
  reportDiagnosticsMode,
} from "./config";
import { Meter } from "./metering";
import { getFuncImportLine, printType, programIsComplete, ProgramRun } from './utils';
import { createEnv, createNewFile, evaluateType, reportErrors } from "./ts";

const isolatedProgram = async ({
  env,
  stopAt,
  filePath: thisFilePath,
  justPrint,
  funcImportLine,
  startProgramTime,
  timeSpentUnderwater,
  cleanup: thisCleanup,
  previousCount,
  startingCount,
  // program,
}: ProgramRun): Promise<ProgramRun> => {
  const meter = new Meter();
  meter.start("total");

  // TODO: REALLLLLY wanna be able to remove this line and use the same program instance over and over because it's really expensive to create a new one every single
  const program = env.languageService.getProgram();
  if (!program) {
    throw new Error("unable to obtain TypeScript program");
  }

  const {
    typeString,
    cleanup: nextCleanup,
    current,
  } = await evaluateType(env, thisFilePath, program, meter);

  if (justPrint || simpleTypeMode) {
    if (simpleTypeMode) {
      console.log("instantiations:", program.getInstantiationCount());
    }
    console.log(printType(typeString));
    console.log();
    process.exit(0);
  }

  const {
    filePath: nextFilePath,
    nextTimeSpentUnderwater,
  } = await createNewFile({
    env,
    meter,
    typeString,
    funcImportLine,
    current,
    timeSpentUnderwater,
    program,
    startProgramTime,
  })

  meter.start('diagnostics');
  // WARNING: if calculate ts.Program stats after `reportErrors` (which calls ts.preEmitDiagnostics), it will report wildly larger numbers
  // this DRAMATICALLY slows down the program, but it's useful for debugging
  if (reportDiagnosticsMode) {
    reportErrors(program);
  }
  meter.stop('diagnostics');

  meter.stop("total");

  await logStats({
    typeString,
    current,
    program,
    meter,
    previousCount,
    startingCount,
    startProgramTime,
  })

  thisCleanup();

  if (programIsComplete(stopAt, current)) {
    await logFinalStats(startProgramTime);
    process.exit(0);
  }

  // next iteration
  return {
    env,
    stopAt,
    filePath: nextFilePath,
    timeSpentUnderwater: nextTimeSpentUnderwater,
    cleanup: nextCleanup,
    funcImportLine,
    startProgramTime,
    program,
    previousCount: current,
    startingCount,
  };
};

const clearResults = () => {
  // delete the results directory and recreate it
  try {
    statSync(resultsDirectory);
    const files = readdirSync(resultsDirectory);
    for (const file of files) {
      unlinkSync(join(resultsDirectory, file));
    }
  } catch (e) {
    if ((e as unknown as any).code === "ENOENT") {
      // if the directory doesn't exist, create it
      mkdirSync(resultsDirectory);
    }
  }
};

const bootstrap = async () => {
  const startProgramTime = performance.now();
  const env = createEnv(startFilePath);
  const program = env.languageService.getProgram();
  if (!program) {
    throw new Error("unable to obtain TypeScript program");
  }

  const { typeString, current } = await evaluateType(
    env,
    startFilePath,
    program,
  );

  const meter = new Meter();
  const { filePath } = await createNewFile({
    env,
    meter,
    typeString,
    funcImportLine: getFuncImportLine(),
    current,
    timeSpentUnderwater: Infinity, // force a write
    program,
    startProgramTime,
  });

  const startingCount = current;

  await logStats({
    typeString,
    current,
    program,
    meter,
    previousCount: 0,
    startingCount,
    startProgramTime,
  })

  const funcImportLine = getFuncImportLine();

  let runConfig: ProgramRun = {
    env,
    stopAt: config.stopAt,
    filePath,
    timeSpentUnderwater: config.incrementBy,
    cleanup: () => {},
    funcImportLine,
    startProgramTime,
    program,
    previousCount: current,
    startingCount: current,
  };
  return runConfig;
}

const mainLoop = async () => {
  let runConfig = await bootstrap();
  while (true) {
    runConfig = await isolatedProgram(runConfig);
  }
};

const startProgram = async () => {
  encourage();
  clearResults();
  clearStats();
  await mainLoop();
};

// if you're just developing the stats summary mechanism,
// this flag will allow you to run the stats summary
// without actually having to run the program
if (statsOnlyMode) {
  await logFinalStats(0);
  process.exit(0);
}

try {
  await startProgram();
} catch (e) {
  console.error(e);
  process.exit(1);
}
