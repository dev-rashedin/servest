import fs from 'node:fs';
import path from 'node:path';
import { execaCommandSync } from 'execa';
import { afterEach, beforeAll, expect, test } from 'vitest';

const CLI_PATH = path.join(__dirname, '../src/index.ts'); // path to your CLI entry

const projectName = 'test-servest';
const genPath = path.join(__dirname, projectName);
const genPathWithSubfolder = path.join(__dirname, 'subfolder', projectName);

// Run CLI as subprocess
const runCLI = (args: string[], options: { cwd?: string } = {}) => {
  return execaCommandSync(`node ${CLI_PATH} ${args.join(' ')}`, {
    ...options,
    env: process.env,
  });
};

// Helpers
const clearFolders = () => {
  if (fs.existsSync(genPath)) fs.rmSync(genPath, { recursive: true, force: true });
  if (fs.existsSync(genPathWithSubfolder))
    fs.rmSync(genPathWithSubfolder, { recursive: true, force: true });
};

beforeAll(() => clearFolders());
afterEach(() => clearFolders());

test('prompts for project name if none supplied', () => {
  const { stdout } = runCLI([]);
  expect(stdout).toContain('Project name:');
});

test('prompts for framework if template not supplied', () => {
  const { stdout } = runCLI([projectName]);
  expect(stdout).toContain('Select a framework:');
});

test('prompts for framework on invalid template', () => {
  const { stdout } = runCLI([projectName, '--template', 'unknown']);
  expect(stdout).toContain(`"unknown" isn't a valid template`);
});

test('asks to overwrite non-empty target directory', () => {
  fs.mkdirSync(genPath, { recursive: true });
  fs.writeFileSync(path.join(genPath, 'package.json'), '{"foo":"bar"}');

  const { stdout } = runCLI([projectName]);
  expect(stdout).toContain(`Target directory "${projectName}" is not empty.`);
});

test('successfully scaffolds a project with a template', () => {
  const { stdout } = runCLI([projectName, '--template', 'express-basic-js']);
  expect(stdout).toContain(`Scaffolding project in ${genPath}`);

  const files = fs.readdirSync(genPath);
  expect(files).toContain('package.json');
});

test('supports --help option', () => {
  const { stdout } = runCLI(['--help']);
  expect(stdout).toContain('Usage: create-servest');
});
