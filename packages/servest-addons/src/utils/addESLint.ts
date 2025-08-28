import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';
import { cyan, green, red, yellow } from '../../../utils/colors';
import { checkNodeFramework, getInstallCommand, isESModule, isPackageInstalled } from './index';

const tsEslintConfig = `
import js from '@eslint/js';
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierRecommendedPkg from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

const prettierRecommended = prettierRecommendedPkg?.config ?? prettierRecommendedPkg;

export default defineConfig([
  // Base JS recommended config (applies first)
  js.configs.recommended,

  // TypeScript recommended config from @typescript-eslint
  tsPlugin.configs.recommended,

  // Project-specific rules & language options
  {
    files: ['**/*.{ts,tsx,js,mjs,cjs}'],
    languageOptions: {
      parser: tsParser,
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierRecommended.plugins?.prettier || [],
    },
    rules: {
      // core / common rules (TypeScript-aware)
      eqeqeq: 'error',
      'no-console': 'warn',
      // turn off base rule and use TS-aware rule
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'after-used', ignoreRestSiblings: true }],
      'no-unused-expressions': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],

      // Prettier integration
      'prettier/prettier': 'error',
    },
    ignores: ['node_modules/', 'dist/', 'build/'],
  },

  // Prettier recommended last to disable conflicting stylistic rules
  prettierRecommended,
]);
`;

const esmEslintConfig = `
import js from '@eslint/js';
import globals from 'globals';
import prettierRecommendedPkg from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

const prettierRecommended = prettierRecommendedPkg?.config ?? prettierRecommendedPkg;

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettierRecommended.plugins?.prettier || [],
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'warn',
      'no-unused-vars': ['warn', { args: 'after-used', varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      'no-unused-expressions': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'prettier/prettier': 'error',
    },
    ignores: ['node_modules/', 'dist/', 'build/'],
  },
  prettierRecommended,
]);
`;

const cjsEslintConfig = `
const js = require('@eslint/js');
const globals = require('globals');
const prettierRecommendedPkg = require('eslint-plugin-prettier/recommended');
const { defineConfig } = require('eslint/config');

const prettierRecommended = (prettierRecommendedPkg && prettierRecommendedPkg.config) ? prettierRecommendedPkg.config : prettierRecommendedPkg;

module.exports = defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',
      },
    },
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'warn',
      'no-unused-vars': ['warn', { args: 'after-used', varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      'no-unused-expressions': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'prettier/prettier': 'error',
    },
    ignores: ['node_modules/', 'dist/', 'build/'],
  },
  prettierRecommended,
]);
`;

export async function addESLint({ cwd, baseDir, config, packageManager }: PropsOption) {
  const isTypeScript = config.language === 'ts';
  const isESM = isESModule(cwd);

  // default framework checking
  checkNodeFramework(config.framework, 'eslint');

  // Step 1 : Installing dependencies
  const packages = [
    'eslint@9.34.0',
    'eslint-config-prettier@9.1.0', // example
    'eslint-plugin-prettier@5.2.1',
  ];
  if (isTypeScript) {
    packages.push('@typescript-eslint/eslint-plugin@8.41.0', '@typescript-eslint/parser@8.41.0');
  }

  const installCmd = getInstallCommand(packageManager, packages.join(' '));

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
  const configFileName = isTypeScript
    ? 'eslint.config.ts'
    : isESM
      ? 'eslint.config.js'
      : 'eslint.config.cjs';

  const configPath = path.join(baseDir, configFileName);

  if (!fs.existsSync(configPath)) {
    const content = isTypeScript ? tsEslintConfig : isESM ? esmEslintConfig : cjsEslintConfig;

    fs.writeFileSync(configPath, content, 'utf-8');
    console.log(green(`✅ ESLint config created at ${configFileName}`));
  } else {
    console.log(yellow(`⚠️ ESLint config already exists at ${configFileName}`));
  }

  console.log(green('🎉 ESLint setup completed!'));
}
