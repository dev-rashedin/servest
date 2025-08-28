import fs from 'fs';
import path from 'path';
import { cancelOperation } from '../../../utils/sharedUtility';

export const checkNodeFramework = (framework: string, feature: string): void => {
  if (!['express', 'nest', 'fastify', 'koa'].includes(framework)) {
    cancelOperation(
      `Cannot add "${feature}": detected framework is ${framework}. Only Node.js frameworks are supported for this feature.`,
    );
  }
};

export const getInstallCommand = (pkgManager: string, pkg: string): string => {
  switch (pkgManager) {
    case 'pnpm':
    case 'yarn':
    case 'bun':
      return `${pkgManager} add ${pkg}`;
    case 'npm':
    default:
      return `npm install ${pkg}`;
  }
};

export const getInstallCommandForDevDeps = (packageManager: string, packages: string) => {
  switch (packageManager) {
    case 'npm':
      return `npm install -D ${packages}`;
    case 'yarn':
      return `yarn add -D ${packages}`;
    case 'pnpm':
      return `pnpm add -D ${packages}`;
    case 'bun':
      return `bun add -d ${packages}`;
    default:
      throw new Error(`Unsupported package manager: ${packageManager}`);
  }
};

export const getBaseDir = (cwd: string): string => {
  const srcDir = path.join(cwd, 'src');
  const appDir = path.join(srcDir, 'app');

  if (fs.existsSync(appDir)) {
    return appDir;
  } else if (fs.existsSync(srcDir)) {
    return srcDir;
  } else {
    return cwd;
  }
};

export const isPackageInstalled = (cwd: string, pkg: string): boolean => {
  const pkgJsonPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgJsonPath)) return false;

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
  return (
    (pkgJson.dependencies && pkgJson.dependencies[pkg]) ||
    (pkgJson.devDependencies && pkgJson.devDependencies[pkg])
  );
};

export const isESModule = (cwd: string): boolean => {
  const pkgJsonPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgJsonPath)) return false;

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
  return pkgJson.type === 'module';
};
