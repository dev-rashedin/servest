// @ts-check
import eslint from '@eslint/js';
import pluginN from 'eslint-plugin-n';
import pluginImportX from 'eslint-plugin-import-x';
import pluginRegExp from 'eslint-plugin-regexp';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import { fileURLToPath } from 'node:url';

const shouldTypeCheck = typeof process.env.VSCODE_PID === 'string';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  pluginRegExp.configs['flat/recommended'],
  {
    // Global ignores
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/*.snap',
      'packages/create-servest/templates/**',

      'eslint.config.js',
      '**/.vscode/**',
      '**/.idea/**',
      '**/.github/**',
    ],
  },
  {
    name: 'main',
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022,
        tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url)),
        project: shouldTypeCheck
          ? [
              './packages/create-servest/tsconfig.json',
              './packages/servest-addons/tsconfig.json',
              './app/tsconfig.json',
            ]
          : undefined,
      },
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
    },
    settings: {
      node: { version: '>=18.0.0' },
    },
    plugins: {
      n: pluginN,
      'import-x': pluginImportX,
    },
    rules: {
      'n/no-exports-assign': 'error',
      'n/no-unpublished-bin': 'error',
      'n/no-unsupported-features/es-builtins': 'error',
      'n/no-unsupported-features/node-builtins': ['error'],
      'n/process-exit-as-throw': 'error',
      eqeqeq: ['warn', 'always', { null: 'ignore' }],
      'no-debugger': 'error',
      'no-empty': ['warn', { allowEmptyCatch: true }],
      'prefer-const': ['warn', { destructuring: 'all' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': [
        'error',
        { allowArgumentsExplicitlyTypedAsAny: true },
      ],
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      'import-x/no-duplicates': 'error',
      'import-x/order': [
        'error',
        { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'] },
      ],
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      'regexp/prefer-regexp-exec': 'error',
      'regexp/prefer-regexp-test': 'error',
    },
  },
  {
    name: 'backend-starter',
    files: ['packages/create-servest/**/*.ts', 'packages/create-servest/**/*.tsx'],
    ignores: ['**/__tests__/**'],
    rules: {
      'no-restricted-globals': ['error', 'require', '__dirname', '__filename'],
    },
  },
  {
    name: 'backend-utilities',
    files: ['packages/servest-addons/**/*.ts', 'packages/servest-addons/**/*.tsx'],
    ignores: ['**/__tests__/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    name: 'tests',
    files: ['**/__tests__/**/*.?([cm])[jt]s?(x)'],
    rules: {
      'n/no-unsupported-features/node-builtins': [
        'error',
        { ignores: ['fetch', 'import.meta.dirname'] },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  {
    name: 'disables/typechecking',
    files: [
      '**/*.js',
      '**/*.mjs',
      '**/*.cjs',
      '**/*.d.ts',
      '**/*.d.cts',
      '**/__tests__/**',
      'docs/**',
      'playground/**',
      'scripts/**',
      'vitest.config.ts',
      'vitest.config.e2e.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: false,
      },
    },
  },
);
