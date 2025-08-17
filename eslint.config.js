// @ts-check
import { createRequire } from 'node:module';
import eslint from '@eslint/js';
import pluginN from 'eslint-plugin-n';
import pluginImportX from 'eslint-plugin-import-x';
import pluginRegExp from 'eslint-plugin-regexp';
import tseslint from 'typescript-eslint';
import globals from 'globals';

const require = createRequire(import.meta.url);

// Flags type-checking only in IDE (optional)
const shouldTypeCheck = typeof process.env.VSCODE_PID === 'string';

export default tseslint.config(
  {
    // Global ignores
    ignores: [
      'packages/*/dist/**',
      '**/node_modules/**',
      '**/playground-temp/**',
      '**/*.snap',
      // Ignore backend starter templates temporarily
      'packages/servest-addons/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  pluginRegExp.configs['flat/recommended'],
  {
    name: 'main',
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022,
        project: shouldTypeCheck ? ['./packages/*/tsconfig.json'] : undefined,
      },
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
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
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off', // optional, allow templates
      '@typescript-eslint/explicit-module-boundary-types': 'off',
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
    name: 'frontend',
    files: ['packages/web-frontend/**/*.ts', 'packages/web-frontend/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // allow some flexibility
    },
  },
  {
    name: 'backend-starter',
    files: ['packages/servest-addons/**/*.ts', 'packages/servest-addons/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
);
