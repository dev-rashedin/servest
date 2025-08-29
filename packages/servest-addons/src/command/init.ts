import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import spawn from 'cross-spawn';
import { green, yellow } from '../../../utils/colors';

// --- Framework Detection ---
const detectFramework = (cwd: string): string => {
  // Node.js
  const pkgPath = path.join(cwd, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    if (pkg.dependencies?.express) return 'express';
    if (pkg.dependencies?.nestjs) return 'nestjs';
    if (pkg.dependencies?.koa) return 'koa';
    if (pkg.dependencies?.fastify) return 'fastify';
  }

  // Python
  if (fs.existsSync(path.join(cwd, 'manage.py'))) return 'django';
  if (fs.existsSync(path.join(cwd, 'requirements.txt'))) {
    const requirements = fs.readFileSync(path.join(cwd, 'requirements.txt'), 'utf-8');
    if (requirements.includes('Flask')) return 'flask';
    if (requirements.includes('fastapi')) return 'fastapi';
  }
  if (fs.existsSync(path.join(cwd, 'pyproject.toml'))) {
    const pyProject = fs.readFileSync(path.join(cwd, 'pyproject.toml'), 'utf-8');
    if (pyProject.includes('fastapi')) return 'fastapi';
  }

  // PHP
  if (fs.existsSync(path.join(cwd, 'artisan'))) return 'laravel';
  if (fs.existsSync(path.join(cwd, 'composer.json'))) {
    const composer = JSON.parse(fs.readFileSync(path.join(cwd, 'composer.json'), 'utf-8'));
    if (composer.require && composer.require['laravel/framework']) return 'laravel';
  }

  return 'unknown';
};

// --- Language Detection ---
const detectLanguage = (cwd: string): Languages => {
  if (fs.existsSync(path.join(cwd, 'tsconfig.json'))) return 'ts';
  if (fs.existsSync(path.join(cwd, 'package.json'))) return 'js';
  if (
    fs.existsSync(path.join(cwd, 'requirements.txt')) ||
    fs.existsSync(path.join(cwd, 'pyproject.toml')) ||
    fs.existsSync(path.join(cwd, 'manage.py'))
  )
    return 'py';
  if (fs.existsSync(path.join(cwd, 'composer.json')) || fs.existsSync(path.join(cwd, 'artisan')))
    return 'php';
  return 'unknown';
};

// --- Architecture Detection ---
const detectArchitecture = (cwd: string, basePath?: string): Architecture => {
  const checkPaths = [basePath, path.join(cwd, 'src', 'app'), path.join(cwd, 'src'), cwd].filter(
    Boolean,
  ) as string[];

  for (const p of checkPaths) {
    if (!fs.existsSync(p)) continue;
    const folders = fs.readdirSync(p);

    // Node.js style
    if (folders.includes('modules')) return 'modular';
    if (['routes', 'controllers', 'models'].every((f) => folders.includes(f))) return 'mvc';

    // Python / Django style
    if (folders.some((f) => f.endsWith('.py') || f === 'apps')) return 'apps-based';

    // PHP / Laravel style
    if (folders.includes('app') && folders.includes('routes')) return 'laravel-mvc';
  }

  return 'basic';
};
// --- Detect src directory ---
const detectSrcDir = (cwd: string): boolean => fs.existsSync(path.join(cwd, 'src'));

// --- Detect runtime ---
const detectRuntime = (): Runtime => {
  if (process.env.BUN_INSTALL) return 'bun';
  if (process.version) return 'node';
  if (
    fs.existsSync(path.join(process.cwd(), 'manage.py')) ||
    fs.existsSync(path.join(process.cwd(), 'pyproject.toml'))
  )
    return 'python';
  if (
    fs.existsSync(path.join(process.cwd(), 'artisan')) ||
    fs.existsSync(path.join(process.cwd(), 'composer.json'))
  )
    return 'php';
  return 'unknown';
};

export const runCommand = (command: string, args: string[], cwd: string = process.cwd()) => {
  const result = spawn.sync(command, args, { stdio: 'inherit', cwd });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

// --- Write Config ---
const writeConfig = (cwd: string, config: ServestConfig) => {
  const configPath = path.join(cwd, 'servest.config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(green(`✅ servest.config.json created.`));
};

export const init = new Command()
  .name('init')
  .description('Detect project structure and create servest.config.json')
  .option('--path <path>', 'Base folder for detection', process.cwd())
  .action((opts) => {
    const cwd = path.resolve(opts.path);
    const configPath = path.join(cwd, 'servest.config.json');

    if (fs.existsSync(configPath)) {
      console.log(yellow(`👍 servest.config.json already exists.`));
      return;
    }

    const framework = detectFramework(cwd);
    const language = detectLanguage(cwd);
    const architecture = detectArchitecture(cwd);
    const srcDir = detectSrcDir(cwd);
    const runtime = detectRuntime();

    const config: ServestConfig = {
      servestVersion: '1.0.0',
      framework,
      language,
      architecture,
      srcDir,
      environment: {
        runtime,
        nodeVersion: runtime === 'node' ? process.version : undefined,
        bunVersion: runtime === 'bun' ? process.env.BUN_VERSION : undefined,
      },
      features: {},
      createdAt: new Date().toISOString(),
    };

    writeConfig(cwd, config);
  });
