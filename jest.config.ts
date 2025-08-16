import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // All packages in your monorepo
  projects: ['<rootDir>/packages/*'],

  collectCoverageFrom: [
    'packages/**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
};

export default config;
