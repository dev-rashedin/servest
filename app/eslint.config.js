import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  { ignores: ['node_modules', '.next', 'dist', 'out'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { '@next/next': nextPlugin },
    rules: nextPlugin.configs['core-web-vitals'].rules,
  },

  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
]);
