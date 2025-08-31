import fs from 'fs';
import path from 'path';
import { red } from './colors';
import { IServestConfig } from './../servest-addons/src/types/index.d';

type CancelOperation = (message?: string) => void;
type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export const cancelOperation: CancelOperation = (message = 'Operation cancelled') => {
  console.error(red(message));
  process.exit(1);
};

export const nodeFrameWorks: string[] = ['express', 'nest', 'fastify', 'koa'];

export const detectPkgManager = (cwd: string = process.cwd()): PackageManager => {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
};

export const getIServestConfig = (cwd: string): IServestConfig | null => {
  const configPath = path.join(cwd, 'servest.config.json');
  if (!fs.existsSync(configPath)) return null;
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
};
