import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

const timeout = process.env.CI ? 50000 : 30000;

export default defineConfig({
  resolve: {
    alias: {
      '~utils': resolve(__dirname, './playground/test-utils'), // optional for helpers you need in tests
    },
  },
  test: {
    include: ['./playground/**/*.spec.[tj]s'], // e2e tests live in playground
    testTimeout: timeout,
    hookTimeout: timeout,
    reporters: 'dot',
    globals: true, // optional, useful if you use global setup/expect
    deps: {
      // prevent Vitest from using workspace packages in Node runtime
      moduleDirectories: ['node_modules', 'packages'],
    },
    expect: {
      poll: {
        timeout: 50 * (process.env.CI ? 200 : 50),
      },
    },
  },
  esbuild: {
    target: 'node20', // Node target for e2e tests
  },
  publicDir: false, // no public folder needed for CLI tests
});
