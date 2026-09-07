// Node built-in modules
import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// External dependencies
import { intro, isCancel, log, outro, select, text } from '@clack/prompts';
import spawn from 'cross-spawn';
import mri from 'mri';

// Local utilities
import { getIServestConfig } from '../../servest-addons/src/utils/createFile';
import { cyan, green, red, yellow } from '../../utils/colors';
import { cancelOperation, detectPkgManager } from '../../utils/sharedUtility';
import {
  type ArchitectureType,
  type AuthType,
  type AuthorizationType,
  type DatabaseType,
  type DotnetVersion,
  type ExampleType,
  type IAspNetOptions,
  type OrmType,
  type TestingType,
  generateAspNetProject,
  promptAspNetOptions,
} from './generators/aspnet';
import { ALL_TEMPLATES, FRAMEWORKS, helpMessage } from './utils';
import {
  copyDir,
  emptyDir,
  formatTargetDir,
  getDotnetTargetFramework,
  getFullCustomCommand,
  isEmpty,
  isValidPackageName,
  pkgFromUserAgent,
  toPascalCase,
  toValidPackageName,
  updatePackageName,
} from './utils/helper';

const cwd = process.cwd();
const defaultTargetDir = 'servest-project';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CLI raw args & parsed
const rawArgs = process.argv.slice(2);
const argv = mri<IArgv>(rawArgs, {
  alias: { h: 'help', t: 'template', a: 'addons', v: 'version' },
  boolean: [
    'help',
    'overwrite',
    'h',
    'version',
    'v',
    'dryRun',
    'dry-run',
    'nonInteractive',
    'non-interactive',
    'docker',
    'git',
  ],
  string: [
    'template',
    'addons',
    'framework',
    'dotnet',
    'database',
    'orm',
    'auth',
    'authorization',
    'tests',
    'example',
    'config',
  ],
});

function normalizeTemplate(name?: string): string | undefined {
  if (!name) return undefined;
  const lower = name.trim().toLowerCase();
  if (lower === 'enterprise' || lower === 'aspnet-enterprise')
    return 'aspnet-enterprise-architecture';
  if (lower === 'mvc' || lower === 'aspnet-mvc') return 'aspnet-mvc';
  if (lower === 'minimal' || lower === 'minimal-api' || lower === 'aspnet-minimal')
    return 'aspnet-minimal-api';
  return name.trim();
}

async function init() {
  const isHelp = Boolean(argv.help || argv.h);
  if (isHelp) {
    console.log(helpMessage);
    return;
  }

  const isVersion = Boolean(argv.version || argv.v);
  if (isVersion) {
    try {
      const pkgPath = path.resolve(__dirname, '../package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      console.log(`v${pkg.version}`);
    } catch {
      console.log('v2.1.0');
    }
    return;
  }

  const argTargetDir = argv._[0] ? formatTargetDir(String(argv._[0])) : undefined;
  let template = normalizeTemplate(argv.template);
  const argOverwrite = argv.overwrite;
  const addonsArg = argv.a || argv.addons;

  const hasExplicitNonInteractive = Boolean(argv.nonInteractive || argv['non-interactive']);
  const isNonInteractive = Boolean(
    hasExplicitNonInteractive ||
    (!process.stdin.isTTY && Boolean(template) && ALL_TEMPLATES.includes(template)),
  );
  const isDryRun = Boolean(argv.dryRun || argv['dry-run']);

  if (!isNonInteractive) {
    intro('Create Servest project');
  }

  // 1️⃣ Targeting directory
  let targetDir = argTargetDir;
  if (!targetDir) {
    if (isNonInteractive) {
      return cancelOperation(
        'ERROR: Project directory name is required in non-interactive mode. (e.g. npx create-servest my-api --non-interactive)',
      );
    }
    const projectName = await text({
      message: 'Project name:',
      defaultValue: defaultTargetDir,
      placeholder: defaultTargetDir,
      validate: (value) => {
        return value.length === 0 || formatTargetDir(value).length > 0
          ? undefined
          : 'Invalid project name';
      },
    });
    if (isCancel(projectName)) return cancelOperation();
    targetDir = formatTargetDir(projectName);
  }

  const root = path.join(cwd, targetDir);

  // 2️⃣ Handling existing directory
  if (fs.existsSync(root) && !isEmpty(root)) {
    if (isNonInteractive) {
      if (!argOverwrite) {
        return cancelOperation(
          `ERROR: Target directory "${targetDir}" already exists and is not empty. Use --overwrite to replace existing files.`,
        );
      }
      emptyDir(root);
    } else {
      const overwrite = argOverwrite
        ? 'yes'
        : await select({
            message: `${
              targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`
            } is not empty. Choose how to proceed:`,
            options: [
              { value: 'no', label: red('Cancel operation') },
              { value: 'yes', label: yellow('Remove existing files and continue') },
              { value: 'ignore', label: green('Ignore files and continue') },
            ],
          });
      if (isCancel(overwrite)) return cancelOperation();
      switch (overwrite) {
        case 'no':
          return cancelOperation();
        case 'yes':
          emptyDir(root);
          break;
        case 'ignore':
          break;
      }
    }
  }

  if (!isDryRun) {
    fs.mkdirSync(root, { recursive: true });
  }

  // 3️⃣ Validating package name
  let packageName = path.basename(path.resolve(root));
  if (!isValidPackageName(packageName)) {
    const suggestedName = toValidPackageName(packageName);
    if (isNonInteractive) {
      packageName = suggestedName;
    } else {
      const packageNameResult = await text({
        message: 'Package name:',
        defaultValue: suggestedName,
        placeholder: suggestedName,
        validate(dir) {
          if (!isValidPackageName(dir))
            return 'Invalid package name: only lowercase letters, numbers, hyphens (-), and underscores (_) are allowed';
        },
      });
      if (isCancel(packageNameResult)) return cancelOperation();
      packageName = packageNameResult;
    }
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);

  // 4️⃣ Determine template
  let hasInvalidArgTemplate = false;
  if (template && !ALL_TEMPLATES.includes(template)) {
    if (hasExplicitNonInteractive) {
      return cancelOperation(
        `ERROR: "${argv.template}" is not a valid template. Valid templates: ${ALL_TEMPLATES.join(', ')}`,
      );
    }
    template = undefined;
    hasInvalidArgTemplate = true;
  }

  if (!template) {
    if (hasExplicitNonInteractive) {
      return cancelOperation('ERROR: --template is required when using --non-interactive mode.');
    }

    // Selecting a framework
    const framework = await select({
      message: hasInvalidArgTemplate
        ? `"${argv.template}" isn't a valid template. Please choose from below: `
        : 'Select a framework:',
      options: FRAMEWORKS.map((f) => ({
        label: f.color(f.name),
        value: f,
      })),
    });
    if (isCancel(framework)) return cancelOperation();

    // Selecting a variant
    const variant = await select({
      message: 'Select a variant:',
      options: framework.variants.map((v) => {
        const hint = v.customCommand
          ? getFullCustomCommand(v.customCommand, pkgInfo)
              .replace(/TARGET_DIR/g, targetDir)
              .trim()
          : undefined;
        return {
          label: v.color(v.name),
          value: v.value,
          hint,
        };
      }),
    });
    if (isCancel(variant)) return cancelOperation();

    template = variant as string;
  }

  // 5️⃣ ASP.NET Core Composable Workflow
  if (template.startsWith('aspnet')) {
    const arch: ArchitectureType =
      template === 'aspnet-mvc'
        ? 'mvc'
        : template === 'aspnet-minimal-api'
          ? 'minimal-api'
          : 'enterprise';

    // Parse options from CLI flags or fallback
    const cliOptions: Partial<IAspNetOptions> = {
      architecture: arch,
      dotnetVersion: (argv.dotnet as DotnetVersion) || undefined,
      database: (argv.database as DatabaseType) || undefined,
      orm: (argv.orm as OrmType) || undefined,
      auth: (argv.auth as AuthType) || undefined,
      authorization: (argv.authorization as AuthorizationType) || undefined,
      docker: rawArgs.includes('--no-docker')
        ? false
        : rawArgs.includes('--docker')
          ? true
          : undefined,
      testing: (argv.tests as TestingType) || undefined,
      git: rawArgs.includes('--no-git') ? false : rawArgs.includes('--git') ? true : undefined,
      example: (argv.example as ExampleType) || undefined,
    };

    let aspNetOptions: IAspNetOptions;

    if (isNonInteractive) {
      aspNetOptions = {
        projectName: packageName,
        targetDir,
        root,
        architecture: arch,
        dotnetVersion: cliOptions.dotnetVersion || 'auto',
        database: cliOptions.database || 'sqlite',
        orm: cliOptions.orm || (cliOptions.database === 'none' ? 'none' : 'ef'),
        auth: cliOptions.auth || 'none',
        authorization: cliOptions.authorization || 'none',
        docker: cliOptions.docker !== undefined ? cliOptions.docker : true,
        testing: cliOptions.testing || 'unit-integration',
        git: cliOptions.git !== undefined ? cliOptions.git : true,
        example: cliOptions.example || 'sample',
        dryRun: isDryRun,
        nonInteractive: true,
      };
    } else {
      aspNetOptions = await promptAspNetOptions(packageName, targetDir, root, cliOptions);
      aspNetOptions.dryRun = isDryRun;
    }

    if (isDryRun) {
      log.step(cyan('ℹ️ Dry Run - Proposed Project Configuration:'));
      console.log(`
  Project:        ${toPascalCase(packageName)}
  Framework:      ASP.NET Core
  Architecture:   ${aspNetOptions.architecture}
  .NET Version:   ${aspNetOptions.dotnetVersion}
  Database:       ${aspNetOptions.database}
  ORM:            ${aspNetOptions.orm}
  Authentication: ${aspNetOptions.auth}
  Authorization:  ${aspNetOptions.authorization}
  Docker:         ${aspNetOptions.docker ? 'Enabled' : 'Disabled'}
  Tests:          ${aspNetOptions.testing}
  Git:            ${aspNetOptions.git ? 'Initialized' : 'Skipped'}
  Example:        ${aspNetOptions.example}
`);
      outro(green('✨ Dry run complete. No files were written.'));
      return;
    }

    log.step(green(`ℹ️ Scaffolding project in ${root}...`));

    try {
      generateAspNetProject(aspNetOptions);
    } catch (err: any) {
      return cancelOperation(err.message || String(err));
    }

    const appName = toPascalCase(packageName);
    const targetFw = getDotnetTargetFramework();
    const cdProjectName = path.relative(cwd, root);
    const cdCommand =
      root !== cwd
        ? `cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`
        : '';
    const runCmd =
      aspNetOptions.architecture === 'enterprise'
        ? `dotnet watch --project src/${appName}.API`
        : 'dotnet watch';

    console.log(`
  ╭─────────────────────────────────────────────╮
  │        🎉 Servest Project Created           │
  ╰─────────────────────────────────────────────╯

  Project:        ${appName}
  Framework:      ASP.NET Core
  Architecture:   ${aspNetOptions.architecture}
  .NET Version:   ${targetFw}
  Database:       ${aspNetOptions.database}
  ORM:            ${aspNetOptions.orm}
  Authentication: ${aspNetOptions.auth}
  Authorization:  ${aspNetOptions.authorization}
  Docker:         ${aspNetOptions.docker ? 'Enabled' : 'Disabled'}
  Tests:          ${aspNetOptions.testing}
  Git:            ${aspNetOptions.git ? 'Initialized' : 'Skipped'}

  Next steps:
    ${cdCommand}
    dotnet restore
    ${runCmd}
`);
    outro(green('Done. Happy coding!'));
    return;
  }

  // 6️⃣ Running custom command if exists (for external frameworks)
  const pkgManager = detectPkgManager();
  const { customCommand } =
    FRAMEWORKS.flatMap((f) => f.variants).find((v) => v.value === template) ?? {};

  if (customCommand) {
    const fullCustomCommand = getFullCustomCommand(customCommand, pkgInfo);

    if (fullCustomCommand.includes('--template')) {
      log.info(`ℹ️ Running custom command: ${fullCustomCommand}`);
    }

    const [command, ...args] = fullCustomCommand.split(' ');
    const replacedArgs = args.map((arg) => arg.replace('TARGET_DIR', targetDir));

    const { status } = spawn.sync(command, replacedArgs, {
      stdio: 'inherit',
    });
    process.exit(status ?? 0);
  }

  log.step(green(`ℹ️ Scaffolding project in ${root}...`));

  // 7️⃣ Copy template files (for Express, Fastify, Django)
  const variantEntry = FRAMEWORKS.flatMap((f) =>
    f.variants.map((v) => ({ ...v, framework: f.value })),
  ).find((v) => v.value === template);

  if (!variantEntry) {
    return cancelOperation(`🚨 Cannot determine framework for template "${template}"`);
  }

  const templateDir = path.resolve(__dirname, '../templates', variantEntry.framework, template);

  if (!fs.existsSync(templateDir)) {
    return cancelOperation(
      `🚨 Template directory "${templateDir}" does not exist! Check your template name.`,
    );
  }

  if (!isDryRun) {
    copyDir(templateDir, root);

    if (template.includes('express') || template.includes('fastify')) {
      updatePackageName(path.join(root, 'package.json'), packageName);
    }
  }

  // 8️⃣ Running addons if specified
  let addons: string[] = addonsArg ? addonsArg.split(/\s+/).filter(Boolean) : [];
  addons = addons.concat(argv._.slice(1));

  let inStallCommand = false;

  if (addons.length > 0 && !isDryRun) {
    const installResult = spawn.sync(pkgManager, ['install'], { cwd: root, stdio: 'inherit' });
    if (installResult.status !== 0) {
      log.warn(red(`🚨 'npm install' failed. Please run '${pkgManager} install' manually.`));
      process.exit(installResult.status ?? 1);
    } else {
      inStallCommand = true;
      log.success(green(`✅ Dependencies installed successfully!`));
    }

    const initResult = spawn.sync('npx', ['servest@latest', 'init'], {
      cwd: root,
      stdio: 'inherit',
    });
    if (initResult.status !== 0) {
      log.warn(
        red(
          `🚨 Failed to initialize servest. Run 'npx servest@latest init' manually inside ${root}.`,
        ),
      );
      process.exit(initResult.status ?? 1);
    }

    const servestConfig = getIServestConfig(root);
    if (servestConfig) {
      const { status } = spawn.sync('npx', ['servest@latest', 'add', ...addons], {
        cwd: root,
        stdio: 'inherit',
        shell: true,
      });

      if (status !== 0) {
        log.warn(red(`🚨 Failed to add addons: ${addons.join(', ')}`));
        process.exit(status ?? 1);
      } else {
        log.success(green(`✅ Addons added successfully!`));
      }
    } else {
      log.warn(yellow(`⚠️ servest.config.json not found. Skipping addon installation.`));
    }
  }

  // 9️⃣ Outro for other templates
  const cdProjectName = path.relative(cwd, root);
  const cdCommand =
    root !== cwd ? `cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}` : '';

  const installCommands =
    pkgManager === 'yarn'
      ? inStallCommand
        ? ['yarn start']
        : ['yarn', 'yarn start']
      : pkgManager === 'pnpm'
        ? inStallCommand
          ? ['pnpm run start']
          : ['pnpm install', 'pnpm run start']
        : inStallCommand
          ? ['npm run start']
          : ['npm install', 'npm run start'];

  const finalMessage = ['Done. Now run:', cdCommand, ...installCommands]
    .filter(Boolean)
    .map((line) => `  ${line}`)
    .join('\n');

  outro(green(finalMessage));
}

// ───── INIT ─────
init().catch((err) => {
  cancelOperation(red(err));
});
