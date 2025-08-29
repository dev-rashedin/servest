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
  ];

  const eslintConfigPath = eslintConfigPaths.find((p) => fs.existsSync(p));
  const prettierrcPath = path.join(cwd, '.prettierrc.json');
  const prettierignorePath = path.join(cwd, '.prettierignore');

  // Step 1: Installing prettier & eslint-plugin-prettier
  const packages = ['prettier@3.6.2'];

  if (eslintConfigPath) {
    packages.push('eslint-plugin-prettier@5.5.4', 'eslint-config-prettier@10.1.8');
  }

  const installCmd = getInstallCommandForDevDeps(packageManager, packages.join(' '));

  if (!isPackageInstalled(cwd, 'prettier')) {
    console.log(cyan('⬇️ Installing Prettier and related plugins...'));

    await new Promise<void>((resolve, reject) => {
      const child = spawn(installCmd, { cwd, stdio: 'inherit', shell: true });
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(red(`Installation failed with code ${code}`))),
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
    fs.writeFileSync(prettierignorePath, `node_modules\nbuild\ndist\ncoverage\n`);
    console.log(green('✅ Created .prettierignore.'));
  } else {
    console.log(yellow('⚠️ .prettierignore already exists.'));
  }

  if (eslintConfigPath) {
    // Step 2: Injecting Prettier into existing ESLint config
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
      console.log(green('✅ Prettier injected into ESLint config.'));
    } else {
      console.log(yellow('👍 Prettier already present in ESLint config.'));
    }
  } else {
    // Step 3: Create standalone Prettier config
    const prettierConfigPath = path.join(cwd, '.prettierrc.json');
    if (!fs.existsSync(prettierConfigPath)) {
      fs.writeFileSync(prettierConfigPath, JSON.stringify(prettierConfig, null, 2));
      console.log(green('✅ Prettier config created.'));
    } else {
      console.log(yellow('👍 Prettier config already exists.'));
    }
  }

  console.log(green('🎉 Prettier setup completed!'));
}
