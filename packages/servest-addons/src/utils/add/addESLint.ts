import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';
import { cyan, green, red, yellow } from '../../../../utils/colors';
import {
  checkNodeFramework,
  getInstallCommandForDevDeps,
  isESModule,
  isPackageInstalled,
} from '../index';
import { cjsEslintConfig, esmEslintConfig, tsEslintConfig } from '../constants';

export async function addESLint({ cwd, config, packageManager }: PropsOption) {
  const isTypeScript = config.language === 'ts';
  const isESM = isESModule(cwd);

  // default framework checking
  checkNodeFramework(config.framework, 'eslint');

  // Step 1 : Installing dependencies
  const packages = ['eslint@9.34.0', 'globals@16.3.0', '@eslint/js@9.34.0'];
  if (isTypeScript) {
    packages.push('typescript-eslint@8.41.0');
  }

  const installCmd = getInstallCommandForDevDeps(packageManager, packages.join(' '));

  // Step 2: Checking if eslint already installed
  if (isPackageInstalled(cwd, 'eslint')) {
    console.log(yellow('👍 ESLint already installed.'));
  } else {
    console.log(cyan('⬇️ Installing ESLint and recommended plugins...'));
    await new Promise<void>((resolve, reject) => {
      const child = spawn(installCmd, { cwd, stdio: 'inherit', shell: true });
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(red(`Installation failed.`))),
      );
      child.on('error', reject);
    });
  }

  // Step 3: Creating ESLint config file
  const configFileName = isTypeScript || isESM ? 'eslint.config.mjs' : 'eslint.config.cjs';

  const configPath = path.join(cwd, configFileName);

  if (!fs.existsSync(configPath)) {
    const content = isTypeScript ? tsEslintConfig : isESM ? esmEslintConfig : cjsEslintConfig;

    fs.writeFileSync(configPath, content, 'utf-8');
    console.log(green(`✅ ESLint config created.}`));
  } else {
    console.log(yellow(`👍 ESLint config already exists.`));
  }

  // Step 4: Adding lint scripts to package.json
  const pkgPath = path.join(cwd, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.scripts = pkg.scripts || {};

    if (pkg.scripts.lint && pkg.scripts['lint:fix']) return;

    if (!pkg.scripts.lint) {
      pkg.scripts.lint = 'eslint .';
    }
    if (!pkg.scripts['lint:fix']) {
      pkg.scripts['lint:fix'] = 'eslint . --fix';
    }

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');
    console.log(green(`✅ Added lint scripts to package.json.`));
  }

  console.log(green('🎉 ESLint setup completed!'));
}
