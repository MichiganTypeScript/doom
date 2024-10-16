import { dirname, join } from "path";
import tsvfs from "@typescript/vfs";
import ts from "typescript";
import { readFile } from "fs/promises";
import { statSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import {
  clearStats,
  encourage,
  runStats,
  logFinalStats,
  isBenchmarkingIndividualInstructions,
} from "./stats";
import {
  bootstrapFilePath,
  createResultFilePath,
  finalResultPath,
  fsWorker,
  globalDefinitions,
  incrementBy,
  initialConditions,
  startFilePath,
  projectRoot,
  readStringFromMemory,
  resultsDirectory,
  shouldTakeABreath,
  simpleTypeMode,
  resultTypeName,
  tsconfigFilePath,
  worker,
  errorFilePath,
  nextResultTypeName,
  stringResultTypeName,
  shouldLogStats,
} from "./config";
import { finalizeMeter, meter, resetMeter } from "./metering";

// POTENTIAL OPTIMIZATION use a worker thread to do the formatting

const getActiveInstruction = (
  file: string,
  current: number,
  incrementBy: number,
) => {
  const match = file.match(/kind: "([a-zA-Z0-9]*)"/m);
  if (!match) {
    if (current === 0) {
      return "Bootstrap";
    }
    console.error("unable to find instruction", file, current);
    return "UnableToFindInstruction";
  }
  return match[1];
};

/**
 * this "file" is mostly on one line and it can get sorta long, so it's good to break it up in a few places
 * e.g. if the string ` instructions: [` is detected, replace it with `\ninstructions: [`
 */
const preBreakFile = (text: string) =>
  [
    "stack",
    "instructions",
    "activeLocals",
    "activeBranches",
    "globals",
    "memory",
    "executionContexts",
  ].reduce((acc, value) => acc.replace(` ${value}: `, `\n${value}: `), text);

const reportErrors = (program: ts.Program) => {
  ts.getPreEmitDiagnostics(program).forEach((diagnostic) => {
    console.log();
    if (diagnostic.file) {
      let { line, character } = ts.getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start!,
      );
      let message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n",
      );
      throw new Error(
        `${diagnostic.file.fileName} (${line + 1},${
          character + 1
        }): ${message}`,
      );
    }
    throw new Error(
      ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
    );
  });
};

interface ProgramRun {
  /** indicates that this is a bootstrap phase run */
  bootstrap: boolean;

  current: number;
  stopAt: number;

  /** where to look for an `Evaluate` type */
  evaluationFilePath: string;

  evaluationSourceCode: string;

  /** where to save the result of this evaluation */
  resultFilePath: string | null;

  justPrint?: boolean;

  /** the program can "take a breath" (meaning, dump everything to disk and start a new env) in order to avoid out-of-memory and call-stack-exceeded errors */
  timeSpentUnderwater: number;

  cleanup: () => void;
}

const programIsComplete = ({ stopAt, current, bootstrap }: ProgramRun) => {
  // we don't want to stop if we're in the bootstrap phase
  if (bootstrap) {
    return false;
  }

  // stop because we've reached the specified instruction count maximum
  if (current >= stopAt) {
    return true;
  }

  // keep goin' lil' buddy
  return false;
};

const createEnv = () => {
  const configFile = ts.readConfigFile(tsconfigFilePath, ts.sys.readFile);
  const { options } = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    dirname(tsconfigFilePath),
  );

  const libFiles = tsvfs.createDefaultMapFromNodeModules(options);
  const system = tsvfs.createFSBackedSystem(libFiles, projectRoot, ts);

  return tsvfs.createVirtualTypeScriptEnvironment(
    system,
    [globalDefinitions],
    ts,
    options,
  );
};

const env = createEnv();

const isolatedProgram = async (programRun: ProgramRun): Promise<ProgramRun> => {
  let { current, timeSpentUnderwater, cleanup } = programRun;
  const {
    bootstrap,
    stopAt,
    evaluationFilePath,
    evaluationSourceCode,
    resultFilePath,
    justPrint,
  } = programRun;

  resetMeter();
  meter("total").start();

  meter("createFile").start();
  env.createFile(evaluationFilePath, evaluationSourceCode);
  meter("createFile").stop();

  meter("getProgram").start();
  const program = env?.languageService.getProgram()!;
  meter("getProgram").stop();

  meter("getSourceFile").start();
  const targetSourceFile = program.getSourceFile(evaluationFilePath)!;
  meter("getSourceFile").stop();

  meter("getTypeAlias").start();
  let typeAlias: ts.TypeAliasDeclaration;
  let searchFor = nextResultTypeName;
  if (justPrint && current === 0 && resultFilePath === null) {
    // for the final result file
    searchFor = readStringFromMemory ? stringResultTypeName : resultTypeName;
  }
  ts.forEachChild(targetSourceFile, (node) => {
    if (
      ts.isTypeAliasDeclaration(node) &&
      node.name.escapedText === searchFor
    ) {
      typeAlias = node;
      return;
    }
  });
  meter("getTypeAlias").stop();

  meter("checker").start();
  const checker = program.getTypeChecker();
  meter("checker").stop();

  meter("getTypeAtLocation").start();
  const type = checker.getTypeAtLocation(typeAlias!); // this is the line that matters
  meter("getTypeAtLocation").stop();

  meter("typeToString").start();
  const typeString = checker.typeToString(type);
  meter("typeToString").stop();

  if (typeString === "" || typeString === "any") {
    throw new Error(
      `typeString is empty for ${evaluationFilePath}. was searching for ${searchFor}`,
    );
  }

  if (simpleTypeMode) {
    console.log("instantiations:", program.getInstantiationCount());
    console.log();
    console.log(typeString.replaceAll("\\n", "\n"));
    console.log();
    throw new Error("not really an error, but we're all set, boss.");
  }

  if (justPrint) {
    console.log(typeString.replaceAll("\\n", "\n"));
    console.log();
    return {
      ...programRun,
      current,
      stopAt: current,
    };
  }

  // reset current to the actual count
  current = Number(typeString.match(/count: (\d+);/)?.[1]);
  if (Number.isNaN(current)) {
    fsWorker.writeFile(errorFilePath, typeString, { format: true });
    if (typeString.includes(`kind: "Halt";`)) {
      console.error(`sorry, Charlie.  you gotta debug this now.`);
      process.exit(1);
    }
    throw new Error(`stopped because current is NaN: ${typeString}`);
  }

  if (resultFilePath === null) {
    await finalizeProgram(current);
    return {
      ...programRun,
      current,
      stopAt: current,
    };
  }

  meter("formatter").start();
  const isComplete = typeString.includes("instructions: [];");
  const programImport = `import { executeInstruction } from '../../../wasm-to-typescript-types/program'`;
  let result = preBreakFile(`export type ${resultTypeName} = ${typeString}`);
  const nextStopAt = current + (isComplete ? 0 : incrementBy);
  const evaluate = `export type ${nextResultTypeName} = executeInstruction<${resultTypeName}, true, ${nextStopAt}>`;

  let basicFormattedFile = [
    funcImportLine,
    programImport,
    evaluate,
    result,
  ].join("\n\n");

  // WARNING: if calculate ts.Program stats after `reportErrors` (which calls ts.preEmitDiagnostics), it will report wildly larger numbers
  // this DRAMATICALLY slows down the program, but it's useful for debugging
  if (process.argv.includes("--report-ts-diagnostics")) {
    reportErrors(program);
  }
  meter("formatter").stop();

  meter("writeResults").start();
  const writeFilePath = isComplete
    ? createResultFilePath(current)
    : resultFilePath;
  if (isComplete) {
    fsWorker.writeFile(writeFilePath, basicFormattedFile, { format: true });
  }
  meter("writeResults").stop();
  meter("total").stop();

  if (shouldLogStats) {
    const typeStringLength = typeString.length;
    const targetText = targetSourceFile.text;
    const activeInstruction = isBenchmarkingIndividualInstructions
      ? getActiveInstruction(targetText, current, incrementBy)
      : null;
    await runStats({
      program,
      metadata: {
        typeStringLength,
        activeInstruction,
        instructions: bootstrap ? 0 : incrementBy,
        current,
      },
      metering: finalizeMeter(),
    });
  } else {
    console.log({ current });
  }

  cleanup();
  cleanup = () => {
    // a word to the wise (or, in my case, very unwise): if you don't clean up the files, you'll effectively grow memory forever.
    // that, in itself, isn't so bad, but what _also_ happens is that the program slows down to a crawl.
    // calls to `.getProgram` go from taking 20ms to taking 10 seconds, perhaps understandably because the program gets so damn big.
    env.deleteFile(evaluationFilePath);
  };

  if (isComplete) {
    return await isolatedProgram({
      bootstrap,
      current,
      stopAt: current - incrementBy,
      evaluationFilePath: writeFilePath,
      evaluationSourceCode: basicFormattedFile,
      resultFilePath: null,
      timeSpentUnderwater,
      cleanup,
    });
  }

  const foundNever = basicFormattedFile.includes("never");
  const foundAnyArray = basicFormattedFile.includes("any[]");
  const foundErrors = foundNever || foundAnyArray;
  if (foundErrors) {
    fsWorker.writeFile(errorFilePath, basicFormattedFile, { format: true });
    throw new Error(
      `stopped because errors found in the file (search ${writeFilePath} for "${
        foundNever ? "never" : "any[]"
      }")`,
    );
  }

  if (shouldTakeABreath(timeSpentUnderwater, current)) {
    timeSpentUnderwater = 0; // reset the counter
    fsWorker.writeFile(evaluationFilePath, evaluationSourceCode, {
      format: true,
    });
    // if (current !== 0) {
    //   console.log(performance.now() - startProgram);
    //   process.exit(0);
    // }
  }

  timeSpentUnderwater += incrementBy;
  const nextCurrent = current + incrementBy;
  return {
    bootstrap,
    current: nextCurrent,
    stopAt,
    evaluationFilePath: writeFilePath,
    evaluationSourceCode: basicFormattedFile,
    resultFilePath: createResultFilePath(nextCurrent),
    timeSpentUnderwater,
    cleanup,
  };
};

const finalizeProgram = async (lastInstructionCount: number) => {
  const file = [
    `import { executeInstruction } from '../../../wasm-to-typescript-types/program';`,
    `import { ${nextResultTypeName} } from '${createResultFilePath(
      lastInstructionCount,
    )}';`,
    ...(readStringFromMemory
      ? [`import { ReadStringFromMemory } from '../../../ts-type-math';`, ``]
      : []),
    ``,
    `type ${resultTypeName} = executeInstruction<${nextResultTypeName}, false>`,
    "//   ^?",
    "",
    ...(readStringFromMemory
      ? [
          `type StringResult = ReadStringFromMemory<executeInstruction<${nextResultTypeName}, true>>`,
          "//   ^?",
          ``,
        ]
      : []),
    "//> ",
    "//> made by Dimitri Mitropoulos and Michigan TypeScript",
    "//> ",
    "//> we owe a lot to the TypeScript team for making this possible and being such a great team.",
    "//> ",
    "",
  ].join("\n");
  fsWorker.writeFile(finalResultPath, file, { format: true });

  console.log(); // get another newline

  await isolatedProgram({
    bootstrap: false,
    current: 0,
    stopAt: 0,
    evaluationFilePath: finalResultPath,
    evaluationSourceCode: file,
    resultFilePath: null,
    justPrint: true,
    timeSpentUnderwater: 0,
    cleanup: () => {},
  });

  console.log("total instructions", lastInstructionCount);
};

const clearResults = () => {
  if (initialConditions.startAt != 0) {
    // skip clearing the results directory if we're not starting from scratch
    return;
  }

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

  clearStats();
};

let funcImportLine: string | null = null;

const validateFuncsImportLine = (source: string) => {
  funcImportLine = source.split("\n")[0].replace(/from "/, 'from "../');

  if (funcImportLine === "" || !funcImportLine.includes("{ funcs }")) {
    throw new Error("didn't find a funcs import line in the playground file");
  }

  if (funcImportLine === null) {
    throw new Error(
      "so it's shitty, I'll give you that much, but there's an optimization in play whereby you need to make sure that the first line of the playground file matches the `funcs` import for the type you're asking for.  It gets transformed later into something fairly critical for performance (basically removing all static assets).",
    );
  }
};

/** Bootstrap the program */
const bootstrap = async () => {
  const playgroundSource = await readFile(startFilePath, "utf-8");
  validateFuncsImportLine(playgroundSource);

  const { evaluationSourceCode } = await isolatedProgram({
    bootstrap: true,
    current: initialConditions.startAt,
    stopAt: initialConditions.startAt,
    evaluationFilePath: startFilePath,
    evaluationSourceCode: playgroundSource,
    resultFilePath: bootstrapFilePath,
    timeSpentUnderwater: 0,
    cleanup: () => {},
  });

  fsWorker.writeFile(bootstrapFilePath, evaluationSourceCode, { format: true });

  return { evaluationSourceCode, env };
};

const mainLoop = async ({
  evaluationSourceCode,
}: {
  evaluationSourceCode: string;
}) => {
  let runConfig: ProgramRun = {
    bootstrap: false,
    current: initialConditions.startAt + incrementBy,
    stopAt: initialConditions.stopAt,
    evaluationFilePath: bootstrapFilePath,
    evaluationSourceCode: evaluationSourceCode!,
    resultFilePath: createResultFilePath(incrementBy),
    timeSpentUnderwater: 0,
    cleanup: () => {},
  };

  while (true) {
    runConfig = await isolatedProgram(runConfig);

    if (programIsComplete(runConfig)) {
      break;
    }
  }
};

let startProgram = 0;

const runProgram = async () => {
  encourage();
  clearResults();

  startProgram = performance.now();
  await mainLoop(await bootstrap());
  const endProgram = performance.now();
  const programTime = endProgram - startProgram;

  await logFinalStats(programTime);
  await worker.terminate();
};

// if you're just developing the stats summary mechanism,
// this flag will allow you to run the stats summary
// without actually having to run the program
if (process.argv.includes("--stats-only")) {
  await logFinalStats(0);
  process.exit(0);
}

try {
  await runProgram();
} catch (e) {
  console.error(e);
  process.exit(1);
}
