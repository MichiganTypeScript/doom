import { dirname, join } from 'path';
import tsvfs from '@typescript/vfs';
import ts from 'typescript';
import { writeFile, readFile } from 'fs/promises'
import { statSync, mkdirSync, readdirSync, unlinkSync } from 'fs'
import { Rome, Distribution } from '@biomejs/js-api';
import { clearStats, encourage, getProgramStats, runStats, writeProgramStats } from './stats';
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
  targetTypeAlias,
  tsconfigFilePath,
} from './config';

const getActiveInstruction = (file: string, current: number) => {
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
  text
    .replace(/ instructions: \[/g, '\ninstructions: [')
    .replace(/ activeLocals: \{/g, '\nactiveLocals: {')
    .replace(/ activeBranches: \{/g, '\nactiveBranches: {')
    .replace(/ memory: \{/g, '\nmemory: {')
    .replace(/ executionContexts: \[/g, '\nmemory: [')
    .replace(/ funcs: \{/g, '\nfuncs: {')
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
  current: number;
  stopAt: number;
  incrementBy: number;

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

const programIsComplete = ({ stopAt, current }: ProgramRun) => {
  if (stopAt > 0 && current >= stopAt) {
    return true;
  }
  return false
}

const startCreateFSBackedSystem = performance.now();
const system = tsvfs.createFSBackedSystem(
  libFiles,
  projectRoot,
  ts
)
const endCreateFSBackedSystem = performance.now();

const createEnv = () => tsvfs.createVirtualTypeScriptEnvironment(
  system,
  [globalDefinitions],
  ts,
  options
)

const isolatedProgram = async (programRun: ProgramRun): Promise<ProgramRun> => {
  let { current, env, timeSpentUnderwater } = programRun;
  const {
    stopAt,
    incrementBy,
    evaluationFilePath,
    evaluationSourceCode,
    resultFilePath,
    justPrint,
  } = programRun;

  env.createFile(evaluationFilePath, evaluationSourceCode);

  const startGetProgram = performance.now();
  const program = env?.languageService.getProgram()!
  const endGetProgram = performance.now();

  const startTargetSourceFile = performance.now();
  const targetSourceFile = program.getSourceFile(evaluationFilePath)!;
  const endTargetSourceFile = performance.now();

  const targetText = targetSourceFile.text;
  const activeInstruction = getActiveInstruction(targetText, current);

  const startGetTypeAlias = performance.now();
  let typeAlias: ts.TypeAliasDeclaration;
  ts.forEachChild(targetSourceFile, node => {
    if (ts.isTypeAliasDeclaration(node) && node.name.escapedText === targetTypeAlias) {
      typeAlias = node;
    }
  });
  const endTypeAlias = performance.now();

  const startChecker = performance.now();
  const checker = program.getTypeChecker();
  const endChecker = performance.now();

  const startType = performance.now();
  const type = checker.getTypeAtLocation(typeAlias!); // this is the line that matters
  const endType = performance.now();
  const tGetTypeAtLocation = endType - startType;

  const startTypeString = performance.now();
  const typeString = checker.typeToString(type);
  const endTypeString = performance.now();
  const typeStringLength = typeString.length;

  // console.log(getProgramFiles(program));

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
  const programImport = `import { executeInstruction } from '../../../wasm-to-typescript-types/program'\n`
  const typeName = `PlaygroundResult_${formattedCurrent}`;
  let playgroundResult = `export type ${typeName} = ${typeString}`;
  const nextStopAt = current + incrementBy;
  const evaluate = preBreakFile(`export type ${targetTypeAlias} = executeInstruction<${typeName}, true, ${nextStopAt}>`)

  const unformattedFile = [
    programImport,
    evaluate,
    playgroundResult,
  ].join('\n\n');

  // WARNING: if you move this to after `reportErrors` (which calls ts.preEmitDiagnostics), it will report wildly larger numbers
  const programStats = getProgramStats(program);

  // this DRAMATICALLY slows down the program, but it's useful for debugging
  if (process.argv.includes('--report-ts-diagnostics')) {
    reportErrors(program);
  }

  const startFormatter = performance.now();
  const {
    content: formattedFile,
    diagnostics: formatterDiagnositcs
  } = rome.formatContent(unformattedFile, {
    filePath: evaluationFilePath,
  });
  const endFormatter = performance.now();

  if (formatterDiagnositcs.length) {
    throw new Error(`diagnostics from formatter ${formatterDiagnositcs}`);
  }

  const startWriteResults = performance.now();
  const isComplete = typeString.includes('instructions: [];');

  const writeFilePath = isComplete ? createResultFilePath(current) : resultFilePath;
  if (isComplete) {
    await writeFile(writeFilePath, formattedFile, 'utf-8');
  }

  const endWriteResults = performance.now();

  runStats({
    programStats,
    typeStringLength,
    activeInstruction,
    tGetTypeAtLocation,
    current,
    writeToDisk: shouldTakeABreath(timeSpentUnderwater, current),
    time: {
      createFSBackedSystem: endCreateFSBackedSystem - startCreateFSBackedSystem,
      getProgram: endGetProgram - startGetProgram,
      getSourceFile: endTargetSourceFile - startTargetSourceFile,
      getTypeAlias: endTypeAlias - startGetTypeAlias,
      checker: endChecker - startChecker,
      getTypeAtLocation: tGetTypeAtLocation,
      typeToString: endTypeString - startTypeString,
      formatter: endFormatter - startFormatter,
      writeResults: endWriteResults - startWriteResults,
      total: endWriteResults - startCreateFSBackedSystem,
    },
  });

  if (isComplete) {
    return await isolatedProgram({
      current,
      stopAt: current,
      incrementBy,
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
    current: nextCurrent,
    stopAt,
    incrementBy,
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

  console.log();

  await isolatedProgram({
    current: 0,
    stopAt: 0,
    incrementBy,
    evaluationFilePath: finalResultPath,
    evaluationSourceCode: file,
    resultFilePath: null,
    justPrint: true,
    env: createEnv(),
    timeSpentUnderwater: 0,
  });
}

const clearResults = () => {
  if (initialConditions.current != 0) {
    // skip clearing the results directory if we're not starting from scratch
    return;
  }

  clearStats();

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

const runProgram = async () => {
  encourage();
  clearResults();

  const startProgram = performance.now();

  const playgroundSource = await readFile(playgroundFilePath, 'utf-8');

  // Bootstrap the program
  const { evaluationSourceCode, env } = await isolatedProgram({
    current: 0,
    stopAt: 0,
    incrementBy,
    evaluationFilePath: playgroundFilePath,
    evaluationSourceCode: playgroundSource,
    resultFilePath: bootstrapFilePath,
    env: createEnv(),
    timeSpentUnderwater: 0,
  });

  await writeFile(bootstrapFilePath, evaluationSourceCode, 'utf-8');

  let runConfig: ProgramRun = {
    current: incrementBy,
    stopAt: initialConditions.stopAt,
    incrementBy,
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

  const endProgram = performance.now();
  const programTime = endProgram - startProgram;

  await writeProgramStats(programTime);
}

if (process.argv.includes('--stats-only')) {
  await writeProgramStats(0);
  process.exit(0);
}

try {
  await runProgram();
} catch (e) {
  console.error(e);
  process.exit(1);
}
