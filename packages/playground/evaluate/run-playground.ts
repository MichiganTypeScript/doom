import { dirname, join } from 'path';
import tsvfs from '@typescript/vfs';
import ts from 'typescript';
import { readFile } from 'fs/promises'
import { statSync, mkdirSync, readdirSync, unlinkSync } from 'fs'
import { Rome, Distribution, Diagnostic } from '@biomejs/js-api';
import { clearStats, encourage, runStats, logFinalStats, isBenchmarkingIndividualInstructions } from './stats';
import {
  bootstrapFilePath,
  createResultFilePath,
  finalResultPath,
  formatCurrent,
  fsWorker,
  globalDefinitions,
  incrementBy,
  initialConditions,
  playgroundFilePath,
  projectRoot,
  readStringFromMemory,
  resultsDirectory,
  shouldTakeABreath,
  simpleTypeMode,
  targetTypeAlias,
  tsconfigFilePath,
  worker,
} from './config';
import { finalizeMeter, meter, resetMeter } from './metering';

// POTENTIAL OPTIMIZATION write files in a separate thread
// POTENTIAL OPTIMIZATION use a worker thread to do the formatting

const getActiveInstruction = (file: string, current: number, incrementBy: number) => {
  if (incrementBy === 1) {
    return null;
  }
  
  const match = file.match(/kind: "([a-zA-Z0-9]*)"/m);
  if (!match) {
    if (current === 0) {
      return 'Bootstrap';
    }
    console.error('unable to find instruction', file, current);
    return 'UnableToFindInstruction';
  }
  return match[1];
}

/**
 * this "file" is mostly on one line and it can get sorta long, so it's good to break it up in a few places
 * e.g. if the string ` instructions: [` is detected, replace it with `\ninstructions: [`
 */
const preBreakFile = (text: string) => (
  [
    'stack',
    'instructions',
    'activeLocals',
    'activeBranches',
    'globals',
    'memory',
    'executionContexts',
  ].reduce((acc, value) => acc.replace(` ${value}: `, `\n${value}: `), text)
);

const reportErrors = (program: ts.Program) => {
  ts.getPreEmitDiagnostics(program).forEach(diagnostic => {
    console.log();
    if (diagnostic.file) {
      let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      throw new Error(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    }
    throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
  });
}

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
  return false
}

const createEnv = () => {
  const configFile = ts.readConfigFile(tsconfigFilePath, ts.sys.readFile)
  const { options } = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    dirname(tsconfigFilePath)
  );
  
  const libFiles = tsvfs.createDefaultMapFromNodeModules(options);
  const system = tsvfs.createFSBackedSystem(
    libFiles,
    projectRoot,
    ts
  );

  return tsvfs.createVirtualTypeScriptEnvironment(
    system,
    [globalDefinitions],
    ts,
    options
  )
}

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
  meter('total').start();

  meter('createFile').start();
  env.createFile(evaluationFilePath, evaluationSourceCode);
  meter('createFile').stop();

  meter('getProgram').start();
  const program = env?.languageService.getProgram()!
  meter('getProgram').stop();

  meter('getSourceFile').start();
  const targetSourceFile = program.getSourceFile(evaluationFilePath)!;
  meter('getSourceFile').stop();

  meter('getTypeAlias').start();
  let typeAlias: ts.TypeAliasDeclaration;
  ts.forEachChild(targetSourceFile, node => {
    if (ts.isTypeAliasDeclaration(node) && node.name.escapedText === targetTypeAlias) {
      typeAlias = node;
    }
  });
  meter('getTypeAlias').stop();

  meter('checker').start();
  const checker = program.getTypeChecker();
  meter('checker').stop();

  meter('getTypeAtLocation').start();
  const type = checker.getTypeAtLocation(typeAlias!); // this is the line that matters
  meter('getTypeAtLocation').stop();

  meter('typeToString').start();
  const typeString = checker.typeToString(type);
  meter('typeToString').stop();

  if (simpleTypeMode) {
    console.log("instantiations:", program.getInstantiationCount())
    console.log()
    console.log(typeString.replaceAll('\\n', '\n'));
    console.log();
    throw new Error("not really an error, but we're all set, boss.")
  }

  if (justPrint) {
    console.log(typeString.replaceAll('\\n', '\n'));
    console.log();
    return {
      ...programRun,
      current,
      stopAt: current,
    }
  }

  // reset current to the actual count
  current = Number(typeString.match(/count: (\d+);/)?.[1]);

  if (resultFilePath === null) {
    await finalizeProgram(current);
    return {
      ...programRun,
      current,
      stopAt: current,
    }
  }

  meter('formatter').start();
  const formattedCurrent = formatCurrent(current);
  const programImport = `import { executeInstruction } from '../../../wasm-to-typescript-types/program'`
  const typeName = `PlaygroundResult_${formattedCurrent}`;
  let playgroundResult = preBreakFile(`export type ${typeName} = ${typeString}`);
  const nextStopAt = current + incrementBy;
  const evaluate = `export type ${targetTypeAlias} = executeInstruction<${typeName}, true, ${nextStopAt}>`

  let formattedFile = [
    funcImportLine,
    programImport,
    evaluate,
    playgroundResult,
  ].join('\n\n');

  // WARNING: if calculate ts.Program stats after `reportErrors` (which calls ts.preEmitDiagnostics), it will report wildly larger numbers
  // this DRAMATICALLY slows down the program, but it's useful for debugging
  if (process.argv.includes('--report-ts-diagnostics')) {
    reportErrors(program);
  }

  let formatterDiagnositcs: Diagnostic[] = [];
  if (!process.argv.includes('--skip-formatter')) {
    ({
      content: formattedFile,
      diagnostics: formatterDiagnositcs
    } = rome.formatContent(formattedFile, {
      filePath: evaluationFilePath,
    }));
  }
  meter('formatter').stop();

  if (formatterDiagnositcs.length > 0) {
    throw new Error(`diagnostics from formatter ${formatterDiagnositcs}`);
  }

  meter('writeResults').start();
  const isComplete = typeString.includes('instructions: [];');
  const writeFilePath = isComplete ? createResultFilePath(current) : resultFilePath;
  if (isComplete) {
    await fsWorker.writeFile(writeFilePath, formattedFile);
  }
  meter('writeResults').stop();

  meter('total').stop();

  const typeStringLength = typeString.length;
  const targetText = targetSourceFile.text;
  const activeInstruction = isBenchmarkingIndividualInstructions ? getActiveInstruction(targetText, current, incrementBy) : null;
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

  cleanup();
  cleanup = () => {
    // a word to the wise (or, in my case, very unwise): if you don't clean up the files, you'll effectively grow memory forever.
    // that, in itself, isn't so bad, but what _also_ happens is that the program slows down to a crawl.
    // calls to `.getProgram` go from taking 20ms to taking 10 seconds, perhaps understandably because the program gets so damn big.
    env.deleteFile(evaluationFilePath)
  };

  if (isComplete) {
    return await isolatedProgram({
      bootstrap,
      current,
      stopAt: current,
      evaluationFilePath: writeFilePath,
      evaluationSourceCode: formattedFile,
      resultFilePath: null,
      timeSpentUnderwater,
      cleanup,
    })
  }

  const foundNever = formattedFile.includes('never');
  const foundAnyArray = formattedFile.includes('any[]');
  const foundErrors = foundNever || foundAnyArray;
  if (foundErrors) {
    throw new Error(`stopped because errors found in the file (search ${writeFilePath} for "${foundNever ? 'never' : 'any[]'}")`);
  }
  if (Number.isNaN(current)) {
    throw new Error(`stopped because current is NaN`);
  }

  if (shouldTakeABreath(timeSpentUnderwater, current)) {
    timeSpentUnderwater = 0; // reset the counter
    await fsWorker.writeFile(evaluationFilePath, evaluationSourceCode);
  }

  timeSpentUnderwater += incrementBy;
  const nextCurrent = current + incrementBy;
  return {
    bootstrap,
    current: nextCurrent,
    stopAt,
    evaluationFilePath: writeFilePath,
    evaluationSourceCode: formattedFile,
    resultFilePath: createResultFilePath(nextCurrent),
    timeSpentUnderwater,
    cleanup,
  };
}

const finalizeProgram = async (
  lastInstructionCount: number,
) => {
  const last = formatCurrent(lastInstructionCount);
  const lastType = `PlaygroundResult_${last}`;
  const file = [
  `import { executeInstruction } from '../../../wasm-to-typescript-types/program';`,
  `import { ${lastType} } from '${createResultFilePath(lastInstructionCount)}';`,
  ...(readStringFromMemory ? 
  [
    `import { ReadStringFromMemory } from '../../../ts-type-math';`,
    ``,
    `type e = executeInstruction<${lastType}, true>`,
    `type ${targetTypeAlias} = ReadStringFromMemory<e>`,
  ] : [
    ``,
    `type e = executeInstruction<${lastType}, false>`,
    `type ${targetTypeAlias} = e`,
  ]),
  '//   ^?',
  '',
  '// made by Dimitri Mitropoulos and Michigan TypeScript',
  '//',
  '// > we owe a lot to the TypeScript team for making this possible and being such a great team.',
  '',
  ].join('\n');
  await fsWorker.writeFile(finalResultPath, file);

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
}

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
    if ((e as unknown as any).code === 'ENOENT') {
      // if the directory doesn't exist, create it
      mkdirSync(resultsDirectory);
    }
  }

  clearStats();
}

const rome = await Rome.create({
  distribution: Distribution.NODE,
});
rome.applyConfiguration({
    // @ts-ignore there's a problem with the biome js-api.  there's also a pnpm patch to fix this
    gitignore_matches: [],
    files: {
      maxSize: 1024 * 1024 * 1024,
  }
})

let funcImportLine: string | null = null;

const validateFuncsImportLine = (source: string) => {
  funcImportLine = source.split('\n')[0].replace(/from "/, 'from "../');

  if (funcImportLine === '' || !funcImportLine.includes("{ funcs }")) {
    throw new Error("didn't find a funcs import line in the playground file");
  }
  
  if (funcImportLine === null) {
    throw new Error("so it's shitty, I'll give you that much, but there's an optimization in play whereby you need to make sure that the first line of the playground file matches the `funcs` import for the type you're asking for.  It gets transformed later into something fairly critical for performance (basically removing all static assets).");
  }
}

/** Bootstrap the program */
const bootstrap = async () => {
  const playgroundSource = await readFile(playgroundFilePath, 'utf-8');
  validateFuncsImportLine(playgroundSource);

  const { evaluationSourceCode } = await isolatedProgram({
    bootstrap: true,
    current: initialConditions.startAt,
    stopAt: initialConditions.startAt,
    evaluationFilePath: playgroundFilePath,
    evaluationSourceCode: playgroundSource,
    resultFilePath: bootstrapFilePath,
    timeSpentUnderwater: 0,
    cleanup: () => {},
  });

  await fsWorker.writeFile(bootstrapFilePath, evaluationSourceCode);

  return { evaluationSourceCode, env };
}

const mainLoop = async ({
  evaluationSourceCode
}: {
  evaluationSourceCode: string,
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
}

const runProgram = async () => {
  encourage();
  clearResults();

  const startProgram = performance.now();
  await mainLoop(await bootstrap());
  const endProgram = performance.now();
  const programTime = endProgram - startProgram;

  await logFinalStats(programTime);
  await worker.terminate();
}

// if you're just developing the stats summary mechanism,
// this flag will allow you to run the stats summary
// without actually having to run the program
if (process.argv.includes('--stats-only')) {
  await logFinalStats(0);
  process.exit(0);
}

try {
  await runProgram();
} catch (e) {
  console.error(e);
  process.exit(1);
}
