import fs from 'node:fs';
import path from 'node:path';
import type { SyncOptions, SyncResult } from 'execa';
import { execaSync } from 'execa';
import { afterEach, beforeAll, expect, test } from 'vitest';

const CLI_PATH = path.resolve(__dirname, '..');

console.log(CLI_PATH);

const projectName = 'test-app';
const genPath = path.join(__dirname, projectName);
const genPathWithSubfolder = path.join(__dirname, 'subfolder', projectName);

const run = <SO extends SyncOptions>(args: string[], options?: SO): SyncResult<SO> => {
  return execaSync('node', [CLI_PATH, ...args], options);
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

  const categories = fs
    .readdirSync(templatesRoot, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const category of categories) {
    const categoryPath = path.join(templatesRoot, category);
    const matched = fs
      .readdirSync(categoryPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .find((name) => name.startsWith(framework));

    if (matched) {
      const templateDir = path.join(categoryPath, matched);
      console.log('Using Template Dir:', templateDir);

      return fs
        .readdirSync(templateDir)
        .filter((filePath) => filePath !== '.gitkeep' && filePath !== '.stackblitz')
        .map((filePath) => {
          if (filePath === '_gitignore') return '.gitignore';
          if (filePath === '.env.example') return '.env';
          return filePath;
        })
        .sort();
    }
  }

  throw new Error(`No template folder found for framework: ${framework}`);
};

// Clear generated test folders safely on Windows
const clearAnyPreviousFolders = () => {
  const safeRm = (target: string) => {
    if (!fs.existsSync(target)) return;
    for (let attempt = 0; attempt < 10; attempt++) {
      try {
        fs.rmSync(target, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 });
        return;
      } catch (err: any) {
        if (err.code === 'EBUSY' || err.code === 'EPERM') {
          const waitTill = Date.now() + 100;
          while (Date.now() < waitTill) {
            // spin-wait for Windows file unlock
          }
        } else {
          break;
        }
      }
    }
  };
  safeRm(genPath);
  safeRm(genPathWithSubfolder);
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

test('successfully scaffolds an ASP.NET Core Enterprise Architecture solution', () => {
  const framework = 'aspnet-enterprise-architecture';
  const { stdout } = run([projectName, '--template', framework], { cwd: __dirname });

  expect(stdout).toContain(`Scaffolding project in ${genPath}`);
  expect(fs.existsSync(path.join(genPath, 'TestApp.sln'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, '.env'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, 'Dockerfile'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, '.dockerignore'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, '.gitignore'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, 'src', 'TestApp.API', 'TestApp.API.csproj'))).toBe(true);
  expect(
    fs.existsSync(path.join(genPath, 'src', 'TestApp.Application', 'TestApp.Application.csproj')),
  ).toBe(true);
  expect(fs.existsSync(path.join(genPath, 'src', 'TestApp.Domain', 'TestApp.Domain.csproj'))).toBe(
    true,
  );
  expect(
    fs.existsSync(
      path.join(genPath, 'src', 'TestApp.Infrastructure', 'TestApp.Infrastructure.csproj'),
    ),
  ).toBe(true);
  expect(
    fs.existsSync(path.join(genPath, 'src', 'TestApp.Persistence', 'TestApp.Persistence.csproj')),
  ).toBe(true);
  expect(
    fs.existsSync(path.join(genPath, 'tests', 'TestApp.UnitTests', 'TestApp.UnitTests.csproj')),
  ).toBe(true);
  expect(
    fs.existsSync(
      path.join(genPath, 'tests', 'TestApp.IntegrationTests', 'TestApp.IntegrationTests.csproj'),
    ),
  ).toBe(true);

  const dockerfileContent = fs.readFileSync(path.join(genPath, 'Dockerfile'), 'utf-8');
  expect(dockerfileContent).toContain('TestApp.API.csproj');
  expect(dockerfileContent).toContain('TestApp.API.dll');
});

test('successfully scaffolds an ASP.NET Core MVC Web API project', () => {
  const framework = 'aspnet-mvc';
  const { stdout } = run([projectName, '--template', framework], { cwd: __dirname });

  expect(stdout).toContain(`Scaffolding project in ${genPath}`);
  expect(fs.existsSync(path.join(genPath, 'TestApp.csproj'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, '.env'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, 'Dockerfile'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, '.dockerignore'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, '.gitignore'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, 'Controllers', 'SampleItemsController.cs'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, 'Services', 'SampleItemService.cs'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, 'Data', 'ApplicationDbContext.cs'))).toBe(true);

  const dockerfileContent = fs.readFileSync(path.join(genPath, 'Dockerfile'), 'utf-8');
  expect(dockerfileContent).toContain('TestApp.csproj');
  expect(dockerfileContent).toContain('TestApp.dll');
});

test('successfully scaffolds an ASP.NET Core Minimal API project', () => {
  const framework = 'aspnet-minimal-api';
  const { stdout } = run([projectName, '--template', framework], { cwd: __dirname });

  expect(stdout).toContain(`Scaffolding project in ${genPath}`);
  expect(fs.existsSync(path.join(genPath, 'TestApp.csproj'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, '.env'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, 'Dockerfile'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, '.dockerignore'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, '.gitignore'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, 'Endpoints', 'SampleEndpoints.cs'))).toBe(true);
  expect(fs.existsSync(path.join(genPath, 'Data', 'ApplicationDbContext.cs'))).toBe(true);

  const dockerfileContent = fs.readFileSync(path.join(genPath, 'Dockerfile'), 'utf-8');
  expect(dockerfileContent).toContain('TestApp.csproj');
  expect(dockerfileContent).toContain('TestApp.dll');
});

test('returns version number on --version or -v', () => {
  const { stdout } = run(['--version'], { cwd: __dirname });
  expect(stdout).toMatch(/v\d+\.\d+\.\d+/);
});

test('supports --dry-run without creating files on disk', () => {
  const { stdout } = run([projectName, '--template', 'enterprise', '--dry-run'], {
    cwd: __dirname,
  });
  expect(stdout).toContain('Dry Run - Proposed Project Configuration:');
  expect(stdout).toContain('✨ Dry run complete. No files were written.');
  expect(fs.existsSync(genPath)).toBe(false);
});

test('supports short template alias "enterprise"', () => {
  const { stdout } = run([projectName, '--template', 'enterprise'], { cwd: __dirname });
  expect(stdout).toContain(`Scaffolding project in ${genPath}`);
  expect(fs.existsSync(path.join(genPath, 'TestApp.sln'))).toBe(true);
});

test('successfully configures PostgreSQL database provider', () => {
  run([projectName, '--template', 'enterprise', '--database', 'postgres'], { cwd: __dirname });

  const persistenceCsproj = fs.readFileSync(
    path.join(genPath, 'src', 'TestApp.Persistence', 'TestApp.Persistence.csproj'),
    'utf-8',
  );
  expect(persistenceCsproj).toContain('Npgsql.EntityFrameworkCore.PostgreSQL');

  const diCs = fs.readFileSync(
    path.join(genPath, 'src', 'TestApp.Persistence', 'DependencyInjection.cs'),
    'utf-8',
  );
  expect(diCs).toContain('options.UseNpgsql(connectionString)');

  const appsettings = fs.readFileSync(
    path.join(genPath, 'src', 'TestApp.API', 'appsettings.json'),
    'utf-8',
  );
  expect(appsettings).toContain('Host=localhost;Port=5432;Database=TestAppDb');
});

test('successfully configures JWT authentication and TokenService', () => {
  run([projectName, '--template', 'enterprise', '--auth', 'jwt'], { cwd: __dirname });

  const apiCsproj = fs.readFileSync(
    path.join(genPath, 'src', 'TestApp.API', 'TestApp.API.csproj'),
    'utf-8',
  );
  expect(apiCsproj).toContain('Microsoft.AspNetCore.Authentication.JwtBearer');

  const tokenService = path.join(
    genPath,
    'src',
    'TestApp.Infrastructure',
    'Services',
    'TokenService.cs',
  );
  expect(fs.existsSync(tokenService)).toBe(true);

  const programCs = fs.readFileSync(
    path.join(genPath, 'src', 'TestApp.API', 'Program.cs'),
    'utf-8',
  );
  expect(programCs).toContain('builder.Services.AddAuthentication(');
  expect(programCs).toContain('app.UseAuthentication();');
});

test('successfully configures RBAC authorization policies', () => {
  run([projectName, '--template', 'enterprise', '--auth', 'jwt', '--authorization', 'rbac'], {
    cwd: __dirname,
  });

  const rolesFile = path.join(genPath, 'src', 'TestApp.Domain', 'Constants', 'Roles.cs');
  const policiesFile = path.join(genPath, 'src', 'TestApp.Domain', 'Constants', 'Policies.cs');
  expect(fs.existsSync(rolesFile)).toBe(true);
  expect(fs.existsSync(policiesFile)).toBe(true);

  const programCs = fs.readFileSync(
    path.join(genPath, 'src', 'TestApp.API', 'Program.cs'),
    'utf-8',
  );
  expect(programCs).toContain('options.AddPolicy("RequireAdmin"');
});

test('omits Docker files when --no-docker is specified', () => {
  run([projectName, '--template', 'enterprise', '--no-docker'], { cwd: __dirname });
  expect(fs.existsSync(path.join(genPath, 'Dockerfile'))).toBe(false);
  expect(fs.existsSync(path.join(genPath, '.dockerignore'))).toBe(false);
});

test('removes tests directory and unlinks from .sln when --tests none', () => {
  run([projectName, '--template', 'enterprise', '--tests', 'none'], { cwd: __dirname });
  expect(fs.existsSync(path.join(genPath, 'tests'))).toBe(false);

  const slnContent = fs.readFileSync(path.join(genPath, 'TestApp.sln'), 'utf-8');
  expect(slnContent).not.toContain('TestApp.UnitTests');
  expect(slnContent).not.toContain('TestApp.IntegrationTests');
});

test('scaffolds a clean slate project without SampleItem when --example none', () => {
  run([projectName, '--template', 'enterprise', '--example', 'none'], { cwd: __dirname });

  const sampleEntity = path.join(genPath, 'src', 'TestApp.Domain', 'Entities', 'SampleItem.cs');
  const sampleController = path.join(
    genPath,
    'src',
    'TestApp.API',
    'Controllers',
    'SampleItemsController.cs',
  );
  expect(fs.existsSync(sampleEntity)).toBe(false);
  expect(fs.existsSync(sampleController)).toBe(false);
});
