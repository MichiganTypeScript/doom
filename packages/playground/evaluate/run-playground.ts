import { dirname, join } from 'path';
import tsvfs from '@typescript/vfs';
import ts from 'typescript';
import { writeFile, readFile } from 'fs/promises'
import { statSync, mkdirSync, readdirSync, unlinkSync } from 'fs'
import { Rome, Distribution, Diagnostic } from '@biomejs/js-api';
import { clearStats, encourage, runStats, logFinalStats, isBenchmarkingIndividualInstructions } from './stats';
import {
  bootstrapFilePath,
  createResultFilePath,
  finalResultPath,
  formatCurrent,
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
  ].reduce((acc, value) => acc.replace(` ${value[0]}: `, `\n${value[1]}: `), text)
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

  env: tsvfs.VirtualTypeScriptEnvironment;

  /** the program can "take a breath" (meaning, dump everything to disk and start a new env) in order to avoid out-of-memory and call-stack-exceeded errors */
  timeSpentUnderwater: number;
}

const configFile = ts.readConfigFile(tsconfigFilePath, ts.sys.readFile)
const { options } = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  dirname(tsconfigFilePath)
);

const libFiles = tsvfs.createDefaultMapFromNodeModules(options);

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

const createEnv = () => tsvfs.createVirtualTypeScriptEnvironment(
  tsvfs.createFSBackedSystem(
    libFiles,
    projectRoot,
    ts
  ),
  [globalDefinitions],
  ts,
  options
)

const isolatedProgram = async (programRun: ProgramRun): Promise<ProgramRun> => {
  let { current, env, timeSpentUnderwater } = programRun;
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

  const formattedCurrent = formatCurrent(current);
  const programImport = `import { executeInstruction } from '../../../wasm-to-typescript-types/program'`
  const typeName = `PlaygroundResult_${formattedCurrent}`;
  let playgroundResult = `export type ${typeName} = ${typeString}`;
  const nextStopAt = current + incrementBy;
  const evaluate = preBreakFile(`export type ${targetTypeAlias} = executeInstruction<${typeName}, true, ${nextStopAt}>`)

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

  meter('formatter').start();
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
    await writeFile(writeFilePath, formattedFile, 'utf-8');
  }
  meter('writeResults').stop();

  meter('total').stop();

  const targetText = targetSourceFile.text;
  const activeInstruction = isBenchmarkingIndividualInstructions ? getActiveInstruction(targetText, current, incrementBy) : null;
  await runStats({
    program,
    metadata: {
      typeStringLength: typeString.length,
      activeInstruction,
      instructions: bootstrap ? 0 : incrementBy,
      current,
    },
    metering: finalizeMeter(),
  });

  if (isComplete) {
    return await isolatedProgram({
      bootstrap,
      current,
      stopAt: current,
      evaluationFilePath: writeFilePath,
      evaluationSourceCode: formattedFile,
      resultFilePath: null,
      env,
      timeSpentUnderwater,
    })
  }

  const foundErrors = formattedFile.includes('never');
  if (foundErrors) {
    throw new Error(`stopped because errors found in the file (search ${writeFilePath} for "never")`);
  }

  if (shouldTakeABreath(timeSpentUnderwater, current)) {
    timeSpentUnderwater = 0; // reset the counter
    await writeFile(evaluationFilePath, evaluationSourceCode, 'utf-8');
    env = createEnv();
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
    env,
    timeSpentUnderwater,
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
  await writeFile(finalResultPath, file, 'utf-8');

  console.log(); // get another newline

  await isolatedProgram({
    bootstrap: false,
    current: 0,
    stopAt: 0,
    evaluationFilePath: finalResultPath,
    evaluationSourceCode: file,
    resultFilePath: null,
    justPrint: true,
    env: createEnv(),
    timeSpentUnderwater: 0,
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
  funcImportLine = source.split('\n')[0].replace(/from "/, 'from "../../../');

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

  const { evaluationSourceCode, env } = await isolatedProgram({
    bootstrap: true,
    current: initialConditions.startAt,
    stopAt: initialConditions.startAt,
    evaluationFilePath: playgroundFilePath,
    evaluationSourceCode: playgroundSource,
    resultFilePath: bootstrapFilePath,
    env: createEnv(),
    timeSpentUnderwater: 0,
  });

  await writeFile(bootstrapFilePath, evaluationSourceCode, 'utf-8');

  return { evaluationSourceCode, env };
}

const mainLoop = async ({
  evaluationSourceCode,
  env
}: {
  evaluationSourceCode: string,
  env: tsvfs.VirtualTypeScriptEnvironment
}) => {
  let runConfig: ProgramRun = {
    bootstrap: false,
    current: initialConditions.startAt + incrementBy,
    stopAt: initialConditions.stopAt,
    evaluationFilePath: bootstrapFilePath,
    evaluationSourceCode: evaluationSourceCode!,
    resultFilePath: createResultFilePath(incrementBy),
    env,
    timeSpentUnderwater: 0,
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
