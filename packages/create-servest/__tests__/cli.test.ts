// test/cli.spec.test.ts
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLI_RELATIVE = '../src/index.ts';
const CLI_ABS = path.resolve(__dirname, CLI_RELATIVE);
const projectName = 'test-backend';
const genPath = path.join(__dirname, projectName);

const origCwd = process.cwd();
const clearGenerated = () => {
  if (fs.existsSync(genPath)) fs.rmSync(genPath, { recursive: true, force: true });
};

// ─── Mocks ───
vi.mock('@clack/prompts', () => ({
  intro: vi.fn(),
  outro: vi.fn(),
  select: vi.fn(),
  text: vi.fn(),
  isCancel: (v: any) => v === 'cancel',
  log: { info: vi.fn(), step: vi.fn() },
}));

vi.mock('../src/utils/helper', async (importOriginal) => {
  const original = await importOriginal<any>();
  return {
    ...original,
    copyDir: vi.fn(),
    updatePackageName: vi.fn(),
    emptyDir: vi.fn(),
    cancelOperation: vi.fn((msg?: string) => {
      throw new Error(msg || 'Operation cancelled');
    }),
  };
});

vi.mock('cross-spawn', () => ({
  default: {
    sync: vi.fn(() => ({ status: 0 })),
  },
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
    await import(CLI_ABS); // init() runs automatically
  } finally {
    process.argv = originalArgv;
  }
}

describe('create-servest CLI', () => {
  test('scaffolds via prompts', async () => {
    const prompts: any = await import('@clack/prompts');
    prompts.text.mockResolvedValueOnce(projectName); // folder name
    prompts.select.mockResolvedValueOnce({ name: 'express-basic-js', variants: [] }); // framework
    prompts.select.mockResolvedValueOnce('express-basic-js'); // variant

    await runCli();

    expect(prompts.intro).toHaveBeenCalled();
    expect(fs.existsSync(genPath)).toBe(true);
  });

  test('scaffolds non-interactively with --template', async () => {
    const prompts: any = await import('@clack/prompts');
    prompts.select.mockImplementation(() => {
      throw new Error('select should not be called in non-interactive mode');
    });
    prompts.text.mockImplementation(() => {
      throw new Error('text should not be called in non-interactive mode');
    });

    await runCli(['--template', 'express-basic-js', projectName]);

    expect(fs.existsSync(genPath)).toBe(true);
  });

  test('handles non-empty dir with overwrite', async () => {
    fs.mkdirSync(genPath, { recursive: true });
    fs.writeFileSync(path.join(genPath, 'keep.txt'), 'x');

    const prompts: any = await import('@clack/prompts');
    prompts.text.mockResolvedValueOnce(projectName);
    prompts.select.mockResolvedValueOnce('yes'); // overwrite decision

    await runCli();

    expect(fs.existsSync(genPath)).toBe(true);
    const files = fs.readdirSync(genPath);
    expect(files).not.toContain('keep.txt');
  });
});
