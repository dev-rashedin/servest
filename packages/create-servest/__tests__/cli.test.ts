import path from 'path';
import { describe, expect, it } from 'vitest';
import { execa } from 'execa';

const cliPath = path.resolve(__dirname, '../dist/cli.js'); // or src/cli.ts if using ts-node

describe('CLI Commands', () => {
  it('should run `hello` command', async () => {
    const { stdout } = await execa('node', [cliPath, 'hello']);
    expect(stdout).toContain('Hello'); // adjust based on your CLI output
  });

  it('should run `add` command with multiple args', async () => {
    const { stdout } = await execa('node', [cliPath, 'add', 'eslint', 'prettier']);
    expect(stdout).toContain('Installed eslint');
    expect(stdout).toContain('Installed prettier');
  });

  it('should fail gracefully on unknown command', async () => {
    try {
      await execa('node', [cliPath, 'unknown']);
    } catch (err: any) {
      expect(err.stderr).toContain('Command not found');
    }
  });
});
