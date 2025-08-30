import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';
import { cyan, green, red, yellow } from '../../../../utils/colors';
import { checkNodeFramework, getInstallCommandForDevDeps, isPackageInstalled } from '../index';
import { addESLintConfig, addPrettierConfig } from '../lintPrettierHelper';

export async function addESLintPrettier({ cwd, config, packageManager }: IPropsOption) {
  // default framework checking
  checkNodeFramework(config.framework, 'eslint');

  const isTypeScript = config.language === 'ts';

  // Step 1 : Installing dependencies
  const packages = [
    'eslint@9.34.0',
    'globals@16.3.0',
    '@eslint/js@9.34.0',
    'eslint-plugin-prettier@5.5.4',
    'eslint-config-prettier@10.1.8',
  ];
  if (isTypeScript) {
    packages.push('typescript-eslint@8.41.0');
  }

  const installCmd = getInstallCommandForDevDeps(packageManager, packages.join(' '));

  // Step 2: Checking if eslint already installed
  if (isPackageInstalled(cwd, 'eslint') && isPackageInstalled(cwd, 'prettier')) {
    console.log(yellow('👍 ESLint & Prettier already installed.'));
  } else {
    console.log(cyan('⬇️ Installing ESLint, Prettier and recommended plugins...'));
    await new Promise<void>((resolve, reject) => {
      const child = spawn(installCmd, { cwd, stdio: 'inherit', shell: true });
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(red(`Installation failed.`))),
      );
      child.on('error', reject);
    });
  }

  // Step 3: Creating ESLint config file
  addESLintConfig(cwd, isTypeScript, 'eslint-prettier');

  // Step 4: Creating Prettier config & prettierignore files if not already exist
  addPrettierConfig(cwd);

  // Step 5: Adding lint scripts to package.json
  const pkgPath = path.join(cwd, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.scripts = pkg.scripts || {};

    if (
      pkg.scripts.lint &&
      pkg.scripts['lint:fix'] &&
      pkg.scripts.prettier &&
      pkg.scripts['prettier:fix']
    )
      return;

    if (!pkg.scripts.lint) pkg.scripts.lint = 'eslint .';
    if (!pkg.scripts['lint:fix']) pkg.scripts['lint:fix'] = 'eslint . --fix';
    if (!pkg.scripts.prettier)
      pkg.scripts.prettier = 'prettier --ignore-path .gitignore --write "./src/**/*.+(js|ts|json)"';
    if (!pkg.scripts['prettier:fix'])
      pkg.scripts['prettier:fix'] = 'prettier --write "./src/**/*.+(js|ts|json)"';

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');
    console.log(green(`✅ Added lint & prettier scripts to package.json.`));
  }

  console.log(green('🎉 ESLint setup completed!'));
}
