/** sure would be nice for this to be a TypeScript file, but neither tsx nor deno seem to want to do that */

const { createProgram, forEachChild, isTypeAliasDeclaration } = require('typescript');

const phrases = [
  "Expecto Patronum!",
  "Here's to escaping the Sarlacc pit.",
  "May your mana *cough cough* err. recursion limit.. never run out",
  "Achieve victory and return with honor",
  "You're probably going to need a bigger boat",
  "You're going off to great places, today is your day",
  "The truth is out there",
  "10 bucks says what comes next starts with \"RangeError: Maximum call stack size exceeded at `instantiateTypes`\"",
]

console.log(phrases[Math.floor(Math.random() * phrases.length)]);
console.log();

const evaluateType = async () => {
  // Read the TypeScript file
  const fileName = './evaluate/evaluation-playground.ts';
  const program = createProgram([fileName], {});
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

  console.log("");
  console.log(typeString);
  console.log("");

  // Stop the timer
  console.timeEnd("Type Evaluation Time");
};

evaluateType().catch(console.error);
