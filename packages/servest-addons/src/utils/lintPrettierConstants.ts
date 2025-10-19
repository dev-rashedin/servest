export const prettierConfig = {
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

export const prettierIgnoreFile = `dist/
node_modules/
pnpm-lock.yaml
yarn.lock
package-lock.json
coverage/
build/
*.log
*.tsbuildinfo`;

// TypeScript ESLint config
export const tsEslintConfig = `import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Ignore patterns
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },

  //  Base configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  //   Custom overrides
  {
    files: ['**/*.{js,esm,cjs,ts,mts,cts}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.node,
    },
    settings: {
      node: { version: '>=18.0.0' },
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

// ESM JavaScript config
export const esmEslintConfig = `import eslint from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Ignore patterns
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },

  //  Base configs
  eslint.configs.recommended,

  //   Custom overrides
  {
    files: ['**/*.{js,esm,cjs,ts,mts,cts}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.node,
    },
    settings: {
      node: { version: '>=18.0.0' },
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
export const cjsEslintConfig = `const eslint = require('@eslint/js');
const globals = require('globals');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  // Ignore patterns
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },

  // Base configs
  eslint.configs.recommended,

  // Custom overrides
  {
    files: ['**/*.{js,esm,cjs,ts,mts,cts}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',
      },
      globals: globals.node,
    },
    settings: {
      node: { version: '>=18.0.0' },
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

// TypeScript ESLint config
export const tsEslintConfigWithPrettier = `import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  // Ignore patterns
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },

  //  Base configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  //  Prettier plugin (runs Prettier as a rule)
  eslintPluginPrettierRecommended,

  //   Custom overrides
  {
    files: ['**/*.{js,esm,cjs,ts,mts,cts}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.node,
    },
    settings: {
      node: { version: '>=18.0.0' },
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-unused-expressions': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },

  //  Disable conflicting formatting rules (always last)
  eslintConfigPrettier,
]);
`;

// ESM JavaScript config
export const esmEslintConfigWithPrettier = `import eslint from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  // Ignore patterns
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },

  //  Base configs
  eslint.configs.recommended,

  //  Prettier plugin (runs Prettier as a rule)
  eslintPluginPrettierRecommended,

  //   Custom overrides
  {
    files: ['**/*.{js,esm,cjs,ts,mts,cts}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.node,
    },
    settings: {
      node: { version: '>=18.0.0' },
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-unused-expressions': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },

  //  Disable conflicting formatting rules (always last)
  eslintConfigPrettier,
]);
`;

// CJS JavaScript config
export const cjsEslintConfigWithPrettier = `const eslint = require('@eslint/js');
const globals = require('globals');
const { defineConfig } = require('eslint/config');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = defineConfig([
  // Ignore patterns
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },

  // Base configs
  eslint.configs.recommended,

  // Prettier plugin (runs Prettier as a rule)
  eslintPluginPrettierRecommended,

  // Custom overrides
  {
    files: ['**/*.{js,esm,cjs,ts,mts,cts}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',
      },
      globals: globals.node,
    },
    settings: {
      node: { version: '>=18.0.0' },
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-unused-expressions': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },

  // Disable conflicting formatting rules (always last)
  eslintConfigPrettier,
]);
`;
