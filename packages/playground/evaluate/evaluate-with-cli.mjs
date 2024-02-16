/** sure would be nice for this to be a TypeScript file, but neither tsx nor deno seem to want to do that */

import { stackSize } from './determine-stack-size.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ts from 'typescript';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { createProgram, forEachChild, isTypeAliasDeclaration } = ts;

const evaluateType = async () => {
  // Read the TypeScript file
  const fileName = './evaluate/evaluation-playground.d.ts';

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

  const program = createProgram([fileName], {
    ...parsedTsConfig.options,
    baseUrl: projectRoot,
  });
  const sourceFile = program.getSourceFile(fileName);

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

  // Ensure the type alias is found
  if (!typeAlias) {
    throw new Error('Type alias "Evaluate" not found');
  }

  // Start the timer
  console.time("Type Evaluation Time");

  // Get the checker to obtain type information
  const checker = program.getTypeChecker();

  // Print the type
  const type = checker.getTypeAtLocation(typeAlias);
  const typeString = checker.typeToString(type);

  // Stop the timer
  console.log("Maximum recursions:", stackSize());
  console.timeEnd("Type Evaluation Time");
  console.log("");

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
