import fs from 'fs';
import path from 'path';
import { red } from './colors';

type CancelOperation = (message?: string) => void;
type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export const cancelOperation: CancelOperation = (message = 'Operation cancelled') => {
  console.error(red(message));
  process.exit(1);
};

export function detectPkgManager(cwd: string = process.cwd()): PackageManager {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
}
