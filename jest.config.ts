import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  projects: [
    {
      displayName: 'create-servest',
      rootDir: '<rootDir>/packages/create-servest',
      testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
    },
  ],
  collectCoverageFrom: [
    'packages/**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
};

export default config;
