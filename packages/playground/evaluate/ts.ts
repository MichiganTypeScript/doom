
import { dirname } from "path";
import {createDefaultMapFromNodeModules, createFSBackedSystem, createVirtualTypeScriptEnvironment, VirtualTypeScriptEnvironment} from "@typescript/vfs";
import ts from "typescript";
import {
  createResultFilePath,
  globalDefinitions,
  projectRoot,
  tsconfigFilePath,
  nextResultTypeName,
  resultTypeName,
  config,
  errorFilePath,
  finalResultPath,
  stringResultTypeName,
} from "./config";
import { Meter } from "./metering";
import { consoleLog, finalizeProgram, fsWorker, gaspForBreath, getCurrent, preBreakFile, printType } from './utils';

export const createEnv = (startFilePath: string) => {
  const configFile = ts.readConfigFile(tsconfigFilePath, ts.sys.readFile);
  const { options } = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    dirname(tsconfigFilePath),
  );

  const libFiles = createDefaultMapFromNodeModules(options);
  const system = createFSBackedSystem(libFiles, projectRoot, ts);

  return createVirtualTypeScriptEnvironment(
    system,
    [globalDefinitions, startFilePath],
    ts,
    options,
  );
};

export const reportErrors = (program: ts.Program) => {
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

export const evaluateType = async (
  env: VirtualTypeScriptEnvironment,
  filePath: string,
  program: ts.Program,
  meter: Meter = new Meter(),
  searchFor = nextResultTypeName,
  force = false,
) => {
  meter.start("getSourceFile");
  const inputSourceFile = program.getSourceFile(filePath);
  if (!inputSourceFile) {
    consoleLog(program.getSourceFiles().map(f => f.fileName).filter(f => f.includes("packages")));
    console.error(`file exists in virtual env?: ${env.sys.fileExists(filePath)}`);
    throw new Error(`the program could not find source file ${filePath}`);
  }
  meter.stop("getSourceFile");

  meter.start("getTypeAlias");
  let typeAlias: ts.TypeAliasDeclaration | undefined;
  ts.forEachChild(inputSourceFile, (node) => {
    if (
      ts.isTypeAliasDeclaration(node) &&
      node.name.escapedText === searchFor
    ) {
      typeAlias = node;
      return;
    }
  });
  if (!typeAlias) {
    fsWorker.writeFile(errorFilePath, inputSourceFile.text, 'ts');
    throw new Error(`could not find type alias ${searchFor} in ${filePath}`);
  }
  meter.stop("getTypeAlias");

  meter.start("checker");
  const checker = program.getTypeChecker();
  meter.stop("checker");

  meter.start("getTypeAtLocation");
  const type = checker.getTypeAtLocation(typeAlias); // this is the line that matters
  meter.stop("getTypeAtLocation");

  meter.start("typeToString");
  const typeString = checker.typeToString(type);
  if (typeString === "" || typeString === "any") {
    fsWorker.writeFile(errorFilePath, typeString, 'ts');
    throw new Error(
      `typeString is empty for ${filePath}. was searching for ${searchFor}`,
    );
  }
  if (/instructions: \[\s*{ kind: "Halt";/.test(typeString)) {
    // the top instruction is a halt
    fsWorker.writeFile(errorFilePath, typeString, 'ts');
    throw new Error(`sorry, Charlie.  you gotta debug this now.`);
  }
  meter.stop("typeToString");

  if (force) {
    return {
      typeString,
      current: 0,
      cleanup: () => {},
    };
  }

  const current = await getCurrent(typeString);

  const foundNever = typeString.includes("never");
  const foundAnyArray = typeString.includes("any[]");
  const foundErrors = foundNever || foundAnyArray;
  if (foundErrors) {
    fsWorker.writeFile(errorFilePath, typeString, 'ts');
    throw new Error(
      `stopped because errors found in the file (search count ${current} for "${
        foundNever ? "never" : "any[]"
      }")`,
    );
  }

  return {
    typeString,
    current,
    cleanup: () => {
      // a word to the wise (or, in my case, very unwise): if you don't clean up the files, you'll effectively grow memory forever.
      // that, in itself, isn't so bad, but what _also_ happens is that the program slows down to a crawl.
      // calls to `.getProgram` go from taking 20ms to taking 10 seconds, perhaps understandably because the program gets so damn big.
      env.deleteFile(filePath);
    },
  }
}

export const createNewFile = async ({
  env,
  meter,
  typeString,
  funcImportLine,
  current,
  timeSpentUnderwater,
  program,
  startProgramTime,
}: {
  env: VirtualTypeScriptEnvironment,
  meter: Meter,
  funcImportLine: string,
  typeString: string,
  current: number,
  timeSpentUnderwater: number,
  program: ts.Program,
  startProgramTime: number,
}) => {
  meter.start("newFilePrep");
  const noMoreInstructions = typeString.includes("instructions: [];");
  const programImport = `import { executeInstruction } from '../../../wasm-to-typescript-types/program'`;
  let result = preBreakFile(`export type ${resultTypeName} = ${typeString}`);
  const nextStopAt = current + (noMoreInstructions ? 0 : config.incrementBy);
  const evaluate = `export type ${nextResultTypeName} = executeInstruction<${resultTypeName}, true, ${nextStopAt}>`;

  let fileContents = [
    funcImportLine,
    programImport,
    evaluate,
    result,
  ].join("\n\n");
  meter.stop("newFilePrep");

  // now that we have the typeString for the next file, let's create it
  meter.start("createVirtualFile");
  const filePath = createResultFilePath(current);
  env.createFile(filePath, fileContents);

  program

  meter.stop("createVirtualFile");

  meter.start("writeResults");

  const nextTimeSpentUnderwater = await gaspForBreath(
    timeSpentUnderwater,
    filePath,
    fileContents,
  );

  meter.stop("writeResults");

  if (noMoreInstructions) {
    // wrap up the very final Result/NextResult file
    fsWorker.writeFile(filePath, fileContents, 'ts');
    env.createFile(filePath, fileContents);

    // write the final results
    await finalizeProgram({
      lastInstructionCount: current,
      nextResultTypeName,
      resultTypeName,
      env,
    });

    console.log();
    console.log("total instructions", current);
    const totalTime = (performance.now() - startProgramTime) / 1000;
    console.log("total time", +(totalTime).toFixed(2));
    console.log("total ips", +(current / totalTime).toFixed(2));

    const {
      typeString: resultTypeString,
    } = await evaluateType(
      env,
      finalResultPath,
      env.languageService.getProgram()!,
      new Meter(),
      config.readStringFromMemory ? stringResultTypeName : resultTypeName,
      true,
    );

    console.log()
    console.log(printType(resultTypeString));

    process.exit(0);
  }

  return {
    filePath,
    nextTimeSpentUnderwater,
  };
}