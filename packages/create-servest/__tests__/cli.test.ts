import fs from 'node:fs';
import path from 'node:path';
import type { SyncOptions, SyncResult } from 'execa';
import { execaCommandSync } from 'execa';
import { afterEach, beforeAll, expect, test } from 'vitest';

const CLI_PATH = path.resolve(__dirname, '..');

console.log(CLI_PATH);

const projectName = 'test-app';
const genPath = path.join(__dirname, projectName);
const genPathWithSubfolder = path.join(__dirname, 'subfolder', projectName);

const run = <SO extends SyncOptions>(args: string[], options?: SO): SyncResult<SO> => {
  return execaCommandSync(`node ${CLI_PATH} ${args.join(' ')}`, options);
};

// Helper to create a non-empty directory
const createNonEmptyDir = (overrideFolder?: string) => {
  const newNonEmptyFolder = overrideFolder || genPath;
  fs.mkdirSync(newNonEmptyFolder, { recursive: true });

  const pkgJson = path.join(newNonEmptyFolder, 'package.json');
  fs.writeFileSync(pkgJson, '{ "foo": "bar" }');
};

// Dynamically load template files based on framework
const getTemplateFiles = (framework: string) => {
  const templatesRoot = path.join(CLI_PATH, 'templates');

  // Find the first template folder that starts with the given framework name
  const matchedTemplate = fs
    .readdirSync(templatesRoot, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .find((name) => name.startsWith(framework));

  if (!matchedTemplate) {
    throw new Error(`No template folder found for framework: ${framework}`);
  }

  const templateDir = path.join(templatesRoot, matchedTemplate);
  console.log('Using Template Dir:', templateDir);

  return fs
    .readdirSync(templateDir)
    .map((filePath) => (filePath === '_gitignore' ? '.gitignore' : filePath))
    .sort();
};

// Clear generated test folders
const clearAnyPreviousFolders = () => {
  if (fs.existsSync(genPath)) fs.rmSync(genPath, { recursive: true, force: true });
  if (fs.existsSync(genPathWithSubfolder))
    fs.rmSync(genPathWithSubfolder, { recursive: true, force: true });
};

beforeAll(() => clearAnyPreviousFolders());
afterEach(() => clearAnyPreviousFolders());

// -------------------- TESTS -------------------- //

test('prompts for the project name if none supplied', () => {
  const { stdout } = run([]);
  expect(stdout).toContain('Project name:');
});

test('prompts for the framework if none supplied when target dir is current directory', () => {
  fs.mkdirSync(genPath, { recursive: true });
  const { stdout } = run(['.'], { cwd: genPath });
  expect(stdout).toContain('Select a framework:');
});

test('prompts for the framework if none supplied', () => {
  const { stdout } = run([projectName]);
  expect(stdout).toContain('Select a framework:');
});

test('prompts for the framework on not supplying a value for --template', () => {
  const { stdout } = run([projectName, '--template']);
  expect(stdout).toContain('Select a framework:');
});

test('prompts for the framework on supplying an invalid template', () => {
  const { stdout } = run([projectName, '--template', 'unknown']);
  expect(stdout).toContain(`"unknown" isn't a valid template. Please choose from below:`);
});

test('asks to overwrite non-empty target directory', () => {
  createNonEmptyDir();
  const { stdout } = run([projectName], { cwd: __dirname });
  expect(stdout).toContain(`Target directory "${projectName}" is not empty.`);
});

test('asks to overwrite non-empty target directory with subfolder', () => {
  createNonEmptyDir(genPathWithSubfolder);
  const { stdout } = run([`subfolder/${projectName}`], { cwd: __dirname });
  expect(stdout).toContain(`Target directory "subfolder/${projectName}" is not empty.`);
});

test('asks to overwrite non-empty current directory', () => {
  createNonEmptyDir();
  const { stdout } = run(['.'], { cwd: genPath });
  expect(stdout).toContain(`Current directory is not empty.`);
});

test('successfully scaffolds a project based on express starter template', () => {
  const framework = 'express-mvc-ts';
  const templateFiles = getTemplateFiles(framework);

  const { stdout } = run([projectName, '--template', framework], { cwd: __dirname });
  const generatedFiles = fs.readdirSync(genPath).sort();

  expect(stdout).toContain(`Scaffolding project in ${genPath}`);
  expect(templateFiles).toEqual(generatedFiles);
});

// test('successfully scaffolds a project with subfolder based on django starter template', () => {
//   const framework = 'django';
//   const templateFiles = getTemplateFiles(framework);

//   const { stdout } = run([`subfolder/${projectName}`, '--template', framework], { cwd: __dirname });
//   const generatedFiles = fs.readdirSync(genPathWithSubfolder).sort();

//   expect(stdout).toMatch(/Create Servest/i);
//   expect(templateFiles).toEqual(generatedFiles);

//   // Only check package.json if the template includes it
//   if (generatedFiles.includes('package.json')) {
//     const pkg = fs.readFileSync(path.join(genPathWithSubfolder, 'package.json'), 'utf8');
//     expect(pkg).toBeTruthy();
//   }
// });

test('works with the -t alias', () => {
  const framework = 'express-modular-cjs';
  const templateFiles = getTemplateFiles(framework);

  const { stdout } = run([projectName, '-t', framework], { cwd: __dirname });
  const generatedFiles = fs.readdirSync(genPath).sort();

  expect(stdout).toContain(`Scaffolding project in ${genPath}`);
  expect(templateFiles).toEqual(generatedFiles);
});

test('accepts command line override for --overwrite', () => {
  createNonEmptyDir();
  const { stdout } = run(['.', '--overwrite', 'ignore'], { cwd: genPath });
  expect(stdout).not.toContain(`Current directory is not empty.`);
});

test('return help usage how to use create-servest', () => {
  const { stdout } = run(['--help'], { cwd: __dirname });
  const message = 'Usage: create-servest [OPTION]... [DIRECTORY]';
  expect(stdout).toContain(message);
});

test('return help usage how to use create-servest with -h alias', () => {
  const { stdout } = run(['-h'], { cwd: __dirname });
  const message = 'Usage: create-servest [OPTION]... [DIRECTORY]';
  expect(stdout).toContain(message);
});
