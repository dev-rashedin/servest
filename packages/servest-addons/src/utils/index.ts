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
