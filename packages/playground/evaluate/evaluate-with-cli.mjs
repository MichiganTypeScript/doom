/** sure would be nice for this to be a TypeScript file, but neither tsx nor deno seem to want to do that */

import { stackSize } from './determine-stack-size.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ts from 'typescript';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { createProgram, forEachChild, isTypeAliasDeclaration, getPreEmitDiagnostics } = ts;

const evaluateType = async () => {
  // Read the TypeScript file
  const fileName = './evaluate/evaluation-playground.d.ts';
  const globalDefinitions = path.resolve(__dirname, '../../../global.d.ts');

  // Read tsconfig.json
  const projectRoot = path.resolve(__dirname, '../../../');
  const tsConfigPath = path.resolve(projectRoot, './tsconfig.json');
  const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);

  // Parse tsconfig.json
  const parsedTsConfig = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(tsConfigPath),
  );

  const startTime = performance.now();

  // https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API

  const program = createProgram([fileName, globalDefinitions], {
    ...parsedTsConfig.options,
    baseUrl: projectRoot,
  });
  const programTime = performance.now();

  const sourceFile = program.getSourceFile(fileName);
  const getSourceFileTime = performance.now();

  // Ensure the source file is loaded
  if (!sourceFile) {
    throw new Error(`File ${fileName} not found`);
  }

  // Find the type alias declaration
  let typeAlias;
  forEachChild(sourceFile, node => {
    if (isTypeAliasDeclaration(node) && node.name.escapedText === 'Evaluate') {
      typeAlias = node;
    }
  });
  const getTypeAliasTime = performance.now();

  // Ensure the type alias is found
  if (!typeAlias) {
    throw new Error('Type alias "Evaluate" not found');
  }


  // Get the checker to obtain type information
  const checker = program.getTypeChecker();
  const checkerTime = performance.now();

  // Get the type of the type alias
  const type = checker.getTypeAtLocation(typeAlias);
  const getTypeAtLocationTime = performance.now();
  
  // get the string representation of the type
  const typeString = checker.typeToString(type);
  const typeToStringTime = performance.now();

  const time = {
    programTime: Math.round(Number(programTime - startTime)),
    getSourceFileTime: Math.round(Number(getSourceFileTime - programTime)),
    getTypeAliasTime: Math.round(Number(getTypeAliasTime - getSourceFileTime)),
    checkerTime: Math.round(Number(checkerTime - getTypeAliasTime)),
    getTypeAtLocation: Math.round(Number(getTypeAtLocationTime - checkerTime)),
    typeToString: Math.round(Number(typeToStringTime - getTypeAtLocationTime)),
    totalTime: Math.round(Number(typeToStringTime - startTime)),
  };

  getPreEmitDiagnostics(program).forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      console.error(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
      console.log();
    } else {
      console.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
      console.log();
    }
  });

  console.log("maximum recursions", stackSize());
  // uncomment below to get a full time readout, but really getTimeAtLocation is the one that matters
  // console.log("time (ms) | program", time.programTime, "| getSourceFile", time.getSourceFileTime, "| getTypeAlias", time.getTypeAliasTime, "| checker", time.checkerTime, "| getTypeAtLocation ", time.getTypeAtLocation, "| typeToString ", time.typeToString, "| total", time.totalTime);
  console.log("time (ms)", time.getTypeAtLocation);
  console.log();
  console.log(typeString);
  console.log()
};

const phrases = [
  "Expecto Patronum!",
  "Here's to escaping the Sarlacc pit.",
  "May your mana *cough cough* err. recursion limit.. never run out",
  "Achieve victory and return with honor",
  "You're probably going to need a bigger boat",
  "You're off to great places, today is your day!",
  "The truth is out there",
  "I always trusted code more than people anyway.",
  "10 bucks says what comes next starts with \"RangeError: Maximum call stack size exceeded at `instantiateTypes`\"",
]

console.log(phrases[Math.floor(Math.random() * phrases.length)]);
console.log();

evaluateType().catch(console.error);
