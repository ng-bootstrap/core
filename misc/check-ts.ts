import {join} from 'path';
import {spawn} from 'cross-spawn';
import {ChildProcess, SpawnOptions} from 'child_process';

const options: SpawnOptions = {
  cwd: join(__dirname, '..')
};

const tsConfigs = [
  'src/tsconfig.json', 'src/tsconfig.spec.json', 'demo/tsconfig.json', 'e2e-app/tsconfig.json',
  'e2e-app/tsconfig.spec.json', 'schematics/tsconfig.json'
];

const args = ['--pretty', '--noEmit', '--noUnusedLocals'];

const messages = new Set<string>();
const running = new Set<ChildProcess>();

tsConfigs.forEach(tsConfig => {
  const child = spawn('npx', ['tsc', ...args, `--project`, tsConfig], options);
  running.add(child);

  child.stdout.on('data', chunk => {
    chunk.toString().split('\n').filter(message => message.length > 0).forEach(message => messages.add(message));
  });

  child.on('exit', () => {
    running.delete(child);
    if (running.size === 0 && messages.size > 0) {
      messages.forEach(message => console.error(`\x1b[31m${message}`, '\x1b[0m'));
      process.exit(1);
    }
  });

  child.stderr.on('data', e => console.error(`tsc error:\n${e}`));
  child.on('error', e => console.error(`tsc error:\n${e}`));
});

console.log('Checking for unused code...');
