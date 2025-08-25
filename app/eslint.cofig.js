import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({ baseDirectory: __dirname });

export default tseslint.config(
  {
    ignores: ['node_modules', '.next', 'dist', 'out'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: compat.extends('next/core-web-vitals', 'next/typescript'),
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
);
