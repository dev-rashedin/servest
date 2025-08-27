import fs from 'fs';
import path from 'path';

export function detectPkgManager(cwd: string = process.cwd()): 'npm' | 'pnpm' | 'yarn' | 'bun' {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
}
