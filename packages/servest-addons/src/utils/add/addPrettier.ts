import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';
import { cyan, green, red, yellow } from '../../../../utils/colors';
import { getInstallCommandForDevDeps, isPackageInstalled } from '../index';
import { prettierConfig, prettierIgnoreFile } from '../lintPrettierConstants';

interface PropsOption {
  cwd: string;
  packageManager: PackageManager;
}

export async function addPrettier({ cwd, packageManager }: PropsOption) {
  const prettierrcPath = path.join(cwd, '.prettierrc.json');
  const prettierignorePath = path.join(cwd, '.prettierignore');

  // Step 1: Installing prettier & eslint-plugin-prettier
  const packages = ['prettier@3.6.2'];

  const installCmd = getInstallCommandForDevDeps(packageManager, packages.join(' '));

  if (!isPackageInstalled(cwd, 'prettier')) {
    console.log(cyan('⬇️ Installing Prettier and related plugins...'));

    await new Promise<void>((resolve, reject) => {
      const child = spawn(installCmd, { cwd, stdio: 'inherit', shell: true });
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(red(`Installation failed.`))),
      );
      child.on('error', reject);
    });
  } else {
    console.log(yellow('👍 Prettier already installed'));
  }

  // Step 2: Creating Prettier config & prettierignore files if not already exist

  if (!fs.existsSync(prettierrcPath)) {
    fs.writeFileSync(prettierrcPath, JSON.stringify(prettierConfig, null, 2));
    console.log(green('✅ Created .prettierrc.json.'));
  } else {
    console.log(yellow('👍 .prettierrc.json already exists.'));
  }

  if (!fs.existsSync(prettierignorePath)) {
    fs.writeFileSync(prettierignorePath, JSON.stringify(prettierIgnoreFile, null, 2));
    console.log(green('✅ Created .prettierignore.'));
  } else {
    console.log(yellow('⚠️ .prettierignore already exists.'));
  }

  // Step 3: Adding prettier scripts to package.json
  const pkgPath = path.join(cwd, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.scripts = pkg.scripts || {};

    if (pkg.scripts.prettier && pkg.scripts['prettier:fix']) return;

    if (!pkg.scripts.prettier) {
      pkg.scripts.prettier = 'prettier --ignore-path .gitignore --write "./src/**/*.+(js|ts|json)"';
    }
    if (!pkg.scripts['prettier:fix']) {
      pkg.scripts['prettier:fix'] = 'npx prettier --write ./src/**/*.+(js|ts|json)';
    }

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');
    console.log(green(`✅ Added lint scripts to package.json.`));
  }

  console.log(green('🎉 Prettier setup completed!'));
}
