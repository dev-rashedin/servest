// test/cli.spec.test.ts
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

// ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const CLI_RELATIVE = '../src/index.ts';
const CLI_ABS = path.resolve(__dirname, CLI_RELATIVE);
const projectName = 'test-backend';
const genPath = path.join(__dirname, projectName);

const origCwd = process.cwd();
const clearGenerated = () => {
  if (fs.existsSync(genPath)) fs.rmSync(genPath, { recursive: true, force: true });
};

// Mocks
vi.mock('@clack/prompts', () => ({
  intro: vi.fn(),
  outro: vi.fn(),
  select: vi.fn(),
  text: vi.fn(),
  isCancel: (v: any) => v === 'cancel',
}));

vi.mock('../src/helpers', () => ({
  cancelOperation: vi.fn((msg?: string) => {
    throw new Error(msg || 'Operation cancelled');
  }),
}));

beforeEach(() => {
  process.chdir(__dirname);
  clearGenerated();
  vi.resetModules();
});

afterEach(() => {
  clearGenerated();
  process.chdir(origCwd);
});

async function runCli(argv: string[] = []) {
  const originalArgv = process.argv;
  process.argv = ['node', 'cli', ...argv];
  try {
    // Run TS entry with ts-node ESM loader
    await import(CLI_ABS);
  } finally {
    process.argv = originalArgv;
  }
}

describe('create-servest CLI', () => {
  test('scaffolds via prompts', async () => {
    const prompts: any = await import('@clack/prompts');
    prompts.select.mockResolvedValueOnce('express-basic-js'); // template
    prompts.text.mockResolvedValueOnce(projectName); // folder name

    await runCli();

    expect(fs.existsSync(genPath)).toBe(true);
    const files = fs.readdirSync(genPath);
    expect(files.length).toBeGreaterThan(0);
  });

  test('scaffolds non-interactively with --template flag', async () => {
    const prompts: any = await import('@clack/prompts');
    prompts.select.mockImplementation(() => {
      throw new Error('select should not be called in flags mode');
    });
    prompts.text.mockImplementation(() => {
      throw new Error('text should not be called in flags mode');
    });

    await runCli(['--template', 'express-basic-js', '--name', projectName]);

    expect(fs.existsSync(genPath)).toBe(true);
    const files = fs.readdirSync(genPath);
    expect(files.length).toBeGreaterThan(0);
  });

  test('handles non-empty dir with overwrite', async () => {
    // Prepare non-empty dir
    fs.mkdirSync(genPath, { recursive: true });
    fs.writeFileSync(path.join(genPath, 'keep.txt'), 'x');

    const prompts: any = await import('@clack/prompts');
    prompts.select.mockResolvedValueOnce('express-basic-js'); // template
    prompts.text.mockResolvedValueOnce(projectName); // folder name
    prompts.select.mockResolvedValueOnce('yes'); // overwrite decision

    await runCli();

    // ensure overwrite happened (keep.txt removed)
    expect(fs.existsSync(genPath)).toBe(true);
    const files = fs.readdirSync(genPath);
    expect(files).not.toContain('keep.txt');
    expect(files.length).toBeGreaterThan(0);
  });
});
