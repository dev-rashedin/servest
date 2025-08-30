import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { cyan, green, red, yellow } from '../../../../utils/colors';
import { getInstallCommandForDevDeps, isPackageInstalled } from '../index';

export async function addLintStage(cwd: string, packageManager: string) {
  const devDeps = ['lint-staged', 'simple-git-hooks'];
  const installCmd = getInstallCommandForDevDeps(packageManager, devDeps.join(' '));
  const pkgPath = path.join(cwd, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    console.log(red('❌ package.json not found.'));
    return;
  }

  // Install packages if not installed
  const notInstalled = devDeps.filter((pkg) => !isPackageInstalled(cwd, pkg));
  if (notInstalled.length > 0) {
    console.log(cyan(`⬇️ Installing ${notInstalled.join(', ')}...`));

    await new Promise<void>((resolve, reject) => {
      const child = spawn(installCmd, { cwd, stdio: 'inherit', shell: true });
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(red(`Installation failed.`))),
      );
      child.on('error', reject);
    });
  } else {
    console.log(yellow('👍 lint-staged and simple-git-hooks already installed'));
  }

  // Update package.json
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  // Add postinstall script
  pkg.scripts = pkg.scripts || {};
  if (!pkg.scripts.postinstall || !pkg.scripts.postinstall.includes('simple-git-hooks')) {
    pkg.scripts.postinstall = 'simple-git-hooks';
    console.log(green('✅ Added postinstall script.'));
  }

  // Add simple-git-hooks config
  pkg['simple-git-hooks'] = pkg['simple-git-hooks'] || {
    'pre-commit': 'npx lint-staged',
  };

  // Add lint-staged config
  pkg['lint-staged'] = pkg['lint-staged'] || {
    '*.{js,ts,tsx,json,css,md}': ['prettier --write', 'eslint --fix'],
  };

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log(green('✅ Updated package.json with simple-git-hooks and lint-staged configs.'));
}
