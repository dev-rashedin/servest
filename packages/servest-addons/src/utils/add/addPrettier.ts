import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { cyan, green, red, yellow } from '../../../../utils/colors';
import { getInstallCommandForDevDeps, isPackageInstalled } from '../index';

interface PropsOption {
  cwd: string;
  packageManager: PackageManager;
}

const prettierConfig = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
};

export async function addPrettier({ cwd, packageManager }: PropsOption) {
  const eslintConfigPaths = [
    path.join(cwd, 'eslint.config.mjs'),
    path.join(cwd, 'eslint.config.cjs'),
    path.join(cwd, '.eslintrc.js'),
  ];

  const eslintConfigPath = eslintConfigPaths.find((p) => fs.existsSync(p));

  // Step 1: Install prettier & eslint-plugin-prettier
  const packages = ['prettier@3.0.0', 'eslint-plugin-prettier@5.2.1'];
  const installCmd = getInstallCommandForDevDeps(packageManager, packages.join(' '));

  if (!isPackageInstalled(cwd, 'prettier')) {
    console.log(cyan('⬇️ Installing Prettier and eslint-plugin-prettier...'));
    await new Promise<void>((resolve, reject) => {
      const child = spawn(installCmd, { cwd, stdio: 'inherit', shell: true });
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(red(`Installation failed with code ${code}`))),
      );
      child.on('error', reject);
    });
  } else {
    console.log(yellow('⚠️ Prettier already installed'));
  }

  if (eslintConfigPath) {
    // Step 2: Inject Prettier into existing ESLint config
    const content = fs.readFileSync(eslintConfigPath, 'utf-8');

    if (!content.includes('eslint-plugin-prettier')) {
      let updatedContent = content;

      if (eslintConfigPath.endsWith('.mjs')) {
        // For flat config .mjs
        const insertIndex = content.lastIndexOf(']);');
        const prettierPlugin = `,
  {
    plugins: { prettier: require('eslint-plugin-prettier') },
    rules: { 'prettier/prettier': 'error' },
  }`;
        updatedContent =
          content.slice(0, insertIndex) + prettierPlugin + content.slice(insertIndex);
      } else if (eslintConfigPath.endsWith('.cjs') || eslintConfigPath.endsWith('.js')) {
        // For legacy CJS
        const insertIndex = content.lastIndexOf('];');
        const prettierPlugin = `,
  {
    plugins: ['prettier'],
    rules: { 'prettier/prettier': 'error' },
  }`;
        updatedContent =
          content.slice(0, insertIndex) + prettierPlugin + content.slice(insertIndex);
      }

      fs.writeFileSync(eslintConfigPath, updatedContent, 'utf-8');
      console.log(green('✅ Prettier injected into ESLint config'));
    } else {
      console.log(yellow('⚠️ Prettier already present in ESLint config'));
    }
  } else {
    // Step 3: Create standalone Prettier config
    const prettierConfigPath = path.join(cwd, '.prettierrc.json');
    if (!fs.existsSync(prettierConfigPath)) {
      fs.writeFileSync(prettierConfigPath, JSON.stringify(prettierConfig, null, 2));
      console.log(green('✅ Prettier config created at .prettierrc.json'));
    } else {
      console.log(yellow('⚠️ Prettier config already exists'));
    }
  }

  console.log(green('🎉 Prettier setup completed!'));
}
