import fs from 'node:fs';
import path from 'node:path';
import { red } from './colors';

type CancelOperation = (message?: string) => void;

interface PkgInfo {
  name: string;
  version: string;
}

export const cancelOperation: CancelOperation = (message = 'Operation cancelled') => {
  console.error(red(message));
  process.exit(1);
};

export function formatTargetDir(targetDir: string): string {
  return targetDir.trim().replace(/[/\\]+$/g, '');
}

export function copy(src: string, dest: string): void {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

export function isValidPackageName(projectName: string): boolean {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

export function toValidPackageName(projectName: string): string {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-');
}

export function copyDir(srcDir: string, destDir: string): void {
  const stat = fs.statSync(srcDir);

  if (stat.isDirectory()) {
    fs.mkdirSync(destDir, { recursive: true });

    for (const file of fs.readdirSync(srcDir)) {
      // Skip .gitkeep files
      if (file === '.gitkeep') continue;

      const curSrc = path.join(srcDir, file);
      const curDest = path.join(destDir, file === '_gitignore' ? '.gitignore' : file);

      copyDir(curSrc, curDest);
    }
  } else {
    fs.copyFileSync(srcDir, destDir);
  }
}

export function updatePackageName(pkgPath: string, packageName: string): void {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkg.name = packageName;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
}

export function isEmpty(path: string): boolean {
  if (!fs.existsSync(path)) return true;
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

export function emptyDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

export function detectPkgManager(): string {
  const userAgent = process.env.npm_config_user_agent;
  if (!userAgent) return 'npm';
  if (userAgent.includes('pnpm')) return 'pnpm';
  if (userAgent.includes('yarn')) return 'yarn';
  return 'npm';
}

export function pkgFromUserAgent(userAgent: string | undefined): PkgInfo | undefined {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

export function editFile(file: string, callback: (content: string) => string): void {
  const content = fs.readFileSync(file, 'utf-8');
  fs.writeFileSync(file, callback(content), 'utf-8');
}

export function getFullCustomCommand(customCommand: string, pkgInfo?: PkgInfo): string {
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';
  const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.');

  return (
    customCommand
      .replace(/^npm create (?:-- )?/, () => {
        // `bun create` uses it's own set of templates,
        // the closest alternative is using `bun x` directly on the package
        if (pkgManager === 'bun') {
          return 'bun x create-';
        }
        // pnpm doesn't support the -- syntax
        if (pkgManager === 'pnpm') {
          return 'pnpm create ';
        }
        // For other package managers, preserve the original format
        return customCommand.startsWith('npm create -- ')
          ? `${pkgManager} create -- `
          : `${pkgManager} create `;
      })
      // Only Yarn 1.x doesn't support `@version` in the `create` command
      .replace('@latest', () => (isYarn1 ? '' : '@latest'))
      .replace(/^npm exec/, () => {
        // Prefer `pnpm dlx`, `yarn dlx`, or `bun x`
        if (pkgManager === 'pnpm') {
          return 'pnpm dlx';
        }
        if (pkgManager === 'yarn' && !isYarn1) {
          return 'yarn dlx';
        }
        if (pkgManager === 'bun') {
          return 'bun x';
        }
        // Use `npm exec` in all other cases,
        // including Yarn 1.x and other custom npm clients.
        return 'npm exec';
      })
  );
}
