// @ts-check
import eslint from '@eslint/js';
import pluginN from 'eslint-plugin-n';
import pluginImportX from 'eslint-plugin-import-x';
import pluginRegExp from 'eslint-plugin-regexp';
import tseslint from 'typescript-eslint';
import globals from 'globals';

// Flags type-checking only in IDE (optional)
const shouldTypeCheck = typeof process.env.VSCODE_PID === 'string';

export default tseslint.config(
  {
    // Global ignores
    ignores: [
      'packages/*/dist/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/*.snap',
      'packages/create-servest/templates/**',
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
        project: shouldTypeCheck
          ? ['./packages/create-servest/tsconfig.json', './packages/servest-addons/tsconfig.json']
          : undefined,
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
    name: 'backend-starter',
    files: ['packages/**/*.?([cm])[jt]s?(x)'],
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
    name: 'frontend',
    files: ['packages/servest-frontend/**/*.ts', 'packages/servest-frontend**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // allow some flexibility
    },
  },
  {
    name: 'tests',
    files: ['**/__tests__/**/*.?([cm])[jt]s?(x)'],
    rules: {
      'n/no-unsupported-features/node-builtins': [
        'error',
        {
          ignores: ['fetch', 'import.meta.dirname'],
        },
      ],
    },
  },
);
