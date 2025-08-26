import fs from 'fs';
import path from 'path';
import { Command } from 'commander';

// detecting framework based on dependencies and files
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

// detecting language based on presence of tsconfig.json
const detectLanguage = (cwd: string) => {
  // TypeScript
  if (fs.existsSync(path.join(cwd, 'tsconfig.json'))) return 'ts';

  // JavaScript
  if (fs.existsSync(path.join(cwd, 'package.json'))) return 'js';

  // Python
  if (
    fs.existsSync(path.join(cwd, 'requirements.txt')) ||
    fs.existsSync(path.join(cwd, 'pyproject.toml')) ||
    fs.existsSync(path.join(cwd, 'manage.py'))
  ) {
    return 'py';
  }

  // PHP
  if (fs.existsSync(path.join(cwd, 'composer.json')) || fs.existsSync(path.join(cwd, 'artisan'))) {
    return 'php';
  }

  // Fallback
  return 'unknown';
};

// detecting architecture based on folder structure
const detectArchitecture = (cwd: string, basePath?: string) => {
  const checkPaths = [basePath, path.join(cwd, 'src', 'app'), path.join(cwd, 'src'), cwd].filter(
    Boolean,
  ) as string[];

  for (const p of checkPaths) {
    if (!fs.existsSync(p)) continue;
    const folders = fs.readdirSync(p);
    if (folders.includes('modules')) return 'modular';
    if (['routes', 'controllers', 'models'].every((f) => folders.includes(f))) return 'mvc';
  }

  return 'basic';
};

const detectSrcDir = (cwd: string): boolean => fs.existsSync(path.join(cwd, 'src'));

const writeConfig = (cwd: string, config: ServestConfig) => {
  const configPath = path.join(cwd, 'servest.config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`✅ servest.config.json created at ${configPath}`);
};

export const init = new Command()
  .name('init')
  .description('Detect project structure and create servest.config.json')
  .option('--path <path>', 'Base folder for detection', process.cwd())
  .action((opts) => {
    const cwd = path.resolve(opts.path);

    const configPath = path.join(cwd, 'servest.config.json');
    if (fs.existsSync(configPath)) {
      console.log(`⚠️  servest.config.json already exists at ${configPath}. Skipping creation.`);
      return;
    }

    const framework = detectFramework(cwd);
    const language = detectLanguage(cwd);
    const architecture = detectArchitecture(cwd);
    const srcDir = detectSrcDir(cwd);

    const config: ServestConfig = {
      framework,
      language,
      architecture,
      srcDir,
      createdAt: new Date().toISOString(),
    };

    writeConfig(cwd, config);
  });
