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

// TypeScript ESLint config
const tsEslintConfig = `import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-unused-expressions': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { args: 'after-used', ignoreRestSiblings: true },
      ],
    },
  },
]);
`;

// ESM JavaScript config
const esmEslintConfig = `import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-unused-expressions': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
]);
`;

// CJS JavaScript config
const cjsEslintConfig = `const js = require('@eslint/js');
const globals = require('globals');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.node,
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-unused-expressions': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
]);
`;

export async function addESLint({ cwd, config, packageManager }: PropsOption) {
  const isTypeScript = config.language === 'ts';
  const isESM = isESModule(cwd);

  // default framework checking
  checkNodeFramework(config.framework, 'eslint');

  // Step 1 : Installing dependencies
  const packages = ['eslint@9.34.0', 'globals@16.3.0', '@eslint/js@9.34.0'];
  if (isTypeScript) {
    packages.push('@typescript-eslint/eslint-plugin@8.41.0', '@typescript-eslint/parser@8.41.0');
  }

  const installCmd = getInstallCommandForDevDeps(packageManager, packages.join(' '));

  // Step 2: Checking if eslint already installed
  if (isPackageInstalled(cwd, 'eslint')) {
    console.log(yellow('⚠️ ESLint already installed'));
  } else {
    console.log(cyan('⬇️ Installing ESLint and recommended plugins...'));
    await new Promise<void>((resolve, reject) => {
      const child = spawn(installCmd, { cwd, stdio: 'inherit', shell: true });
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(red(`Installation failed with code ${code}`))),
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
    console.log(green(`✅ ESLint config created at ${configFileName}`));
  } else {
    console.log(yellow(`⚠️ ESLint config already exists at ${configFileName}`));
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
    console.log(green(`✅ Added lint scripts to package.json`));
  }

  console.log(green('🎉 ESLint setup completed!'));
}
