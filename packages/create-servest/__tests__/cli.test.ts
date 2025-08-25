import fs from 'node:fs';
import path from 'node:path';
import { execaCommandSync } from 'execa';
import { afterEach, beforeAll, expect, test } from 'vitest';

const CLI_PATH = path.join(__dirname, '..');

const projectName = 'test-servest';
const genPath = path.join(__dirname, projectName);
const genPathWithSubfolder = path.join(__dirname, 'subfolder', projectName);

// Helper to run CLI
const runCLI = (args: string[], options: { cwd?: string } = {}) => {
  return execaCommandSync(`node ${CLI_PATH} ${args.join(' ')}`, options);
};

// Helper to create non-empty directory
const createNonEmptyDir = (dirPath?: string) => {
  const folder = dirPath || genPath;
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'package.json'), '{ "foo": "bar" }');
};

// Cleanup previous test folders
const cleanup = () => {
  [genPath, genPathWithSubfolder].forEach((dir) => {
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
  });
};

beforeAll(() => cleanup());
afterEach(() => cleanup());

test('displays help message with --help', () => {
  const { stdout } = runCLI(['--help']);
  expect(stdout).toContain('Usage: create-servest [OPTION]... [DIRECTORY]');
});

test('prompts for project name if none supplied', () => {
  const { stdout } = runCLI([]);
  expect(stdout).toContain('Project name:');
});

test('asks to overwrite non-empty target directory', () => {
  createNonEmptyDir();
  const { stdout } = runCLI([projectName], { cwd: __dirname });
  expect(stdout).toContain(`Target directory "${projectName}" is not empty.`);
});

test('successfully scaffolds a project from a template', () => {
  // Using a valid template argument (replace with a real one from FRAMEWORKS)
  const templateArg = 'express-basic-js';
  const { stdout } = runCLI([projectName, '--template', templateArg], { cwd: __dirname });

  expect(stdout).toContain(`Scaffolding project in ${genPath}`);

  const files = fs.readdirSync(genPath);
  expect(files.length).toBeGreaterThan(0);
  expect(files).toContain('package.json');
});

test('supports template short alias -t', () => {
  const templateArg = 'express-basic-js';
  const { stdout } = runCLI([projectName, '-t', templateArg], { cwd: __dirname });

  expect(stdout).toContain(`Scaffolding project in ${genPath}`);
  const files = fs.readdirSync(genPath);
  expect(files.length).toBeGreaterThan(0);
});

test('adds addons if specified', () => {
  // Just check if CLI attempts to run `npx add`
  const addon = 'example-addon';
  const { stdout } = runCLI([projectName, '--template', 'express-basic-js', '--addons', addon], {
    cwd: __dirname,
  });
  expect(stdout).toContain(`Adding ${addon}`);
});
