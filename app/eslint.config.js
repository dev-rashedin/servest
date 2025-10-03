import { defineConfig } from 'eslint-define-config';
import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import eslintPluginNext from 'eslint-plugin-next';

export default defineConfig({
  ignores: ['node_modules', '.next', 'dist', 'out'],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
  },
  plugins: {
    '@typescript-eslint': eslintPluginTs,
    next: eslintPluginNext,
  },
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
});
