import { stackSize } from './determine-stack-size.js';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import tsvfs from '@typescript/vfs';
import ts from 'typescript';
import { readdirSync, unlinkSync, writeFileSync } from 'fs';
import prettier from 'prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const programStats = (program: ts.Program) => ({
  instantiations: program.getInstantiationCount(),
  types: program.getTypeCount(),
  symbols: program.getSymbolCount(),
  identifiers: program.getIdentifierCount(),
  cache: program.getRelationCacheSizes(),
  filesCount: program.getSourceFiles().length,
  // files: program.getSourceFiles().map(file => file.fileName),
  stackSize: stackSize(),
});

const reportErrors = (program: ts.Program) => {
  ts.getPreEmitDiagnostics(program).forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      console.error(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
      console.log();
    } else {
      console.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
      console.log();
    }

  });
}

interface ProgramRun {
  current: number;
  stopAt: number;
  incrementBy: number;
  targetFile: string;
}

const isolatedProgram = async ({
  current,
  stopAt,
  incrementBy,
  targetFile,
}: ProgramRun): Promise<void | ProgramRun> => {
  const projectRoot = resolve(__dirname, '../../../');
  const globalDefinitions = resolve(__dirname, '../../../global.d.ts');
  const tsconfigFilePath = resolve(projectRoot, './tsconfig.json');

  /** this is the magic type alias that the script is looking for in the targetFile */
  const targetTypeAlias = 'Evaluate';

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
  )
  const env = tsvfs.createVirtualTypeScriptEnvironment(
    system,
    [targetFile, globalDefinitions],
    ts,
    options
  )

  const startProgram = performance.now();
  const program = env?.languageService.getProgram()!
  const endProgram = performance.now();

  const startTargetSourceFile = performance.now();
  const targetSourceFile = program.getSourceFile(targetFile)!;
  const endTargetSourceFile = performance.now();

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

  const startTypeString = performance.now();
  const typeString = checker.typeToString(type);
  const endTypeString = performance.now();

  const time = {
    programTime: Math.round(Number(endProgram - startProgram)),
    getSourceFileTime: Math.round(Number(endTargetSourceFile - startTargetSourceFile)),
    getTypeAliasTime: Math.round(Number(endTypeAlias - startGetTypeAlias)),
    checkerTime: Math.round(Number(endChecker - startChecker)),
    getTypeAtLocation: Math.round(Number(endType - startType)),
    typeToString: Math.round(Number(endTypeString - startTypeString)),
    totalTime: Math.round(Number(endTypeString - startProgram)),
  };

  const stats = programStats(program);

  if (process.argv.includes('--verbose')) {
    console.log({ time, stats })
  } else {
    shortStats(current, time, stats)
  }

  reportErrors(program);

  if (process.argv.includes('--write-file')) {
    const updatedStopAt = current + incrementBy;
    const formattedCurrent = String(current).padStart(5, '0');

    const programImport = `import { executeInstruction } from '../../../wasm-to-typescript-types/program'\n`
    const statsString = `export const stats_${formattedCurrent} = ${JSON.stringify({ time, stats }, null, 2)}`
    const typeName = `PlaygroundResult_${formattedCurrent}`;
    const playgroundResult = `export type ${typeName} = ${typeString}`;
    const evaluate = `export type Evaluate = executeInstruction<${typeName}, false, ${updatedStopAt}>`

    const unformattedFile = [
      programImport,
      statsString,
      evaluate,
      playgroundResult,
    ].join('\n\n');

    const formattedFile = await prettier.format(unformattedFile, {
      parser: 'typescript',
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 200,
      quoteProps: 'as-needed',
    });
    const nextFilePath = resolve(__dirname, `./results/results-${formattedCurrent}.ts`)
    writeFileSync(nextFilePath, formattedFile, 'utf-8');
    // console.log("wrote file to", nextFilePath)

    let actualCount = 0;
    let foundErrors = false;
    formattedFile.split('\n').forEach((line, index) => {
      // if the line contains the `never` type, report an error
      if (line.includes('never')) {
        console.error(`'never' found on line ${index + 1}`);
        foundErrors = true;
      }
      // if the line starts with `  count: ` then get the number that follows and before the `;`
      if (line.startsWith('  count:')) {
        const count = line.match(/count: (\d+),/);
        if (count) {
          actualCount = Number(count[1]);
        }
      }
    });


    if (foundErrors) {
      console.error('stopped because errors found in the file (see above re: `never`)');
      return;
    }

    if (actualCount > current) {
      console.log('naturally reached the end of the program at instruction count', actualCount);
      return;
    }

    if (stopAt > 0 && updatedStopAt >= stopAt) {
      console.log('stopped because we reached the stopAt instruction count', stopAt);
      return;
    }

    if (current < stopAt) {
      return {
        current: current + incrementBy,
        stopAt,
        incrementBy,
        targetFile: nextFilePath
      };
    }
  } else {
    console.log();
    console.log(typeString);
  }


}

const shortStats = (
  count: number,
  { getTypeAtLocation }: { getTypeAtLocation: number },
  { instantiations }: { instantiations: number },
) => {
  console.log("count", count, "| time (ms)", getTypeAtLocation, "| instantiations", instantiations);
}

const reset = () => {
  // delete every file in the results directory
  const resultsDirectory = resolve(__dirname, './results');
  const files = readdirSync(resultsDirectory);
  files.forEach(file => {
    unlinkSync(resolve(resultsDirectory, file));
  });
}

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



// reset()
let next: ProgramRun | void = {
  current: 9950,
  stopAt: 100_000,
  incrementBy: 50,
  targetFile: resolve(__dirname, './results/results-09900.ts'),
};

while (true) {
  next = await isolatedProgram(next);
  if (!next) {
    break;
  }
}