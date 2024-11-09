import { spawn } from 'child_process';

const RESUME_CODE = 3;

const runCommand = (command: string, args: string[]) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit', // Use the same stdout, stdin, and stderr
      shell: true // Run the command in a shell
    });

    child.on('exit', (code: number) => {
      if (code === RESUME_CODE || code === 0) {
        resolve(code);
      } else {
        reject(`Command failed with code ${code}`);
      }
    });
  });
}

/** loops the runCommand in a new process if we get a RESUME_CODE */
const runIndefinitely = async () => {
  console.log("I see you've chosen to spawn.  Excellent.  You will fail.")
  const initialResume = process.argv.includes("--resume");
  try {
    let code = await runCommand('pnpm', ['eval', '--spawn', (initialResume ? ['--resume'] : [])]);
    while (code === RESUME_CODE) {
      code = await runCommand('pnpm', ['eval', '--spawn', '--resume']);
    }
  } catch (error) {
    console.log('Error running command');
    console.error(error);
    process.exit(1);
  }
}

runIndefinitely();
