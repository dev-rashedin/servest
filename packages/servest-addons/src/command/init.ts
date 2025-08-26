import fs from 'fs';
import path from 'path';
import { Command } from 'commander';

interface ServestConfig {
  framework: string;
  language: 'ts' | 'js';
  architecture: 'mvc' | 'modular' | 'basic';
  srcDir: boolean;
  createdAt: string;
}

const detectFramework = (cwd: string): string => {
  const pkgPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) return 'unknown';

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  if (pkg.dependencies?.express) return 'express';
  if (pkg.dependencies?.django) return 'django';
  if (pkg.dependencies?.laravel) return 'laravel';

  return 'unknown';
};

// detecting language based on presence of tsconfig.json
const detectLanguage = (cwd: string): 'ts' | 'js' =>
  fs.existsSync(path.join(cwd, 'tsconfig.json')) ? 'ts' : 'js';

// detecting architecture based on folder structure
const detectArchitecture = (cwd: string, basePath?: string): 'mvc' | 'modular' | 'basic' => {
  const checkPaths = [
    basePath, // user-specified
    path.join(cwd, 'src', 'app'),
    path.join(cwd, 'src'),
    cwd,
  ].filter(Boolean) as string[];

  for (const p of checkPaths) {
    if (!fs.existsSync(p)) continue;
    const folders = fs.readdirSync(p);
    if (folders.includes('modules')) return 'modular';
    if (['routes', 'controllers', 'services', 'models'].every((f) => folders.includes(f)))
      return 'mvc';
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

// export const init = new Command()
//   .name('init')
//   .description('Detect project structure and create servest.config.json')
//   .action((opts) => {
//     const cwd = process.cwd();
//     const basePath = opts.path ? path.resolve(cwd, opts.path) : undefined;

//         const framework = detectFramework(cwd);
//         const language = detectLanguage(cwd);
//         const architecture = detectArchitecture(cwd, basePath);
//         const srcDir = detectSrcDir(cwd);

//         const config: ServestConfig = {
//           framework,
//           language,
//           architecture,
//           srcDir,
//           createdAt: new Date().toISOString(),
//         };

//         writeConfig(cwd, config);

//   });
