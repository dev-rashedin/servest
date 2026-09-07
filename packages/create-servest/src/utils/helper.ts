import fs from 'node:fs';
import path from 'node:path';
import spawn from 'cross-spawn';

export function formatTargetDir(targetDir: string): string {
  return targetDir.trim().replace(/[/\\]+$/g, '');
}

export function getDotnetTargetFramework(): string {
  try {
    const result = spawn.sync('dotnet', ['--version'], { encoding: 'utf-8' });
    if (result.status === 0 && result.stdout) {
      const match = /^(\d+)\./.exec(result.stdout.trim());
      if (match && match[1]) {
        const major = parseInt(match[1], 10);
        if (major >= 8) {
          return `net${major}.0`;
        }
      }
    }
  } catch {
    // fallback
  }
  return 'net9.0';
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

  if (stat.isDirectory() && path.basename(srcDir) === '.stackblitz') {
    return;
  }

  if (stat.isDirectory()) {
    fs.mkdirSync(destDir, { recursive: true });

    for (const file of fs.readdirSync(srcDir)) {
      // Skip .gitkeep files
      if (file === '.gitkeep') continue;

      // Rename .env.example to .env

      const curSrc = path.join(srcDir, file);
      let curDest = path.join(destDir, file === '_gitignore' ? '.gitignore' : file);

      // Rename .env.example to .env
      if (file === '.env.example') {
        curDest = path.join(destDir, '.env');
      }

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

// export function detectPkgManager(): string {
//   const userAgent = process.env.npm_config_user_agent;
//   if (!userAgent) return 'npm';
//   if (userAgent.includes('pnpm')) return 'pnpm';
//   if (userAgent.includes('yarn')) return 'yarn';
//   return 'npm';
// }

export function pkgFromUserAgent(userAgent: string | undefined): IPkgInfo | undefined {
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

export function getFullCustomCommand(customCommand: string, pkgInfo?: IPkgInfo): string {
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

export function toPascalCase(str: string): string {
  return str
    .replace(/[^a-z0-9]+(.)/gi, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (chr) => chr.toUpperCase())
    .replace(/[^a-z0-9]/gi, '');
}

export function updateDotnetProject(root: string, projectName: string): void {
  const appName = toPascalCase(projectName);
  const targetFramework = getDotnetTargetFramework();

  // 1. Replace placeholder 'Template' and TargetFramework inside all text files
  const replaceContent = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        replaceContent(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (
          ['.cs', '.csproj', '.sln', '.json', '.md', '.env'].includes(ext) ||
          entry.name === 'Dockerfile' ||
          entry.name === '.dockerignore' ||
          entry.name === '.env'
        ) {
          let content = fs.readFileSync(fullPath, 'utf-8');
          content = content.replaceAll('Template', appName);
          if (ext === '.csproj' && targetFramework !== 'net9.0') {
            content = content.replaceAll(
              '<TargetFramework>net9.0</TargetFramework>',
              `<TargetFramework>${targetFramework}</TargetFramework>`,
            );
          }
          fs.writeFileSync(fullPath, content, 'utf-8');
        }
      }
    }
  };

  replaceContent(root);

  // 2. Rename files and folders bottom-up safely
  const collectRenames = (dir: string): { files: string[]; dirs: string[] } => {
    const files: string[] = [];
    const dirs: string[] = [];

    const walk = (current: string) => {
      const entries = fs.readdirSync(current, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(current, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
          if (entry.name.includes('Template')) {
            dirs.push(fullPath);
          }
        } else if (entry.isFile()) {
          if (entry.name.includes('Template')) {
            files.push(fullPath);
          }
        }
      }
    };

    walk(dir);
    return { files, dirs };
  };

  const safeRename = (oldPath: string, newPath: string) => {
    for (let i = 0; i < 10; i++) {
      try {
        fs.renameSync(oldPath, newPath);
        return;
      } catch (err: any) {
        if ((err.code === 'EPERM' || err.code === 'EBUSY' || err.code === 'EACCES') && i < 9) {
          const waitTill = Date.now() + 50;
          while (Date.now() < waitTill) {
            // spin-wait for Windows file unlock
          }
        } else {
          throw err;
        }
      }
    }
  };

  const { files, dirs } = collectRenames(root);

  for (const filePath of files) {
    const parent = path.dirname(filePath);
    const base = path.basename(filePath);
    const newPath = path.join(parent, base.replaceAll('Template', appName));
    if (filePath !== newPath && fs.existsSync(filePath)) {
      safeRename(filePath, newPath);
    }
  }

  for (const dirPath of dirs) {
    const parent = path.dirname(dirPath);
    const base = path.basename(dirPath);
    const newPath = path.join(parent, base.replaceAll('Template', appName));
    if (dirPath !== newPath && fs.existsSync(dirPath)) {
      safeRename(dirPath, newPath);
    }
  }
}
