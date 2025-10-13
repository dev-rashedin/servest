// Node built-in modules
import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// External dependencies
import mri from 'mri';
import { intro, isCancel, log, outro, select, text } from '@clack/prompts';
import spawn from 'cross-spawn';

// Local utilities
import { green, red, yellow } from '../../utils/colors';
import { cancelOperation, detectPkgManager } from '../../utils/sharedUtility';
import { getIServestConfig } from '../../servest-addons/src/utils/createFile';
import { ALL_TEMPLATES, FRAMEWORKS, helpMessage } from './utils';
import {
  copyDir,
  emptyDir,
  formatTargetDir,
  getFullCustomCommand,
  isEmpty,
  isValidPackageName,
  pkgFromUserAgent,
  toValidPackageName,
  updatePackageName,
} from './utils/helper';

const cwd = process.cwd();
const defaultTargetDir = 'servest-project';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CLI args
const argv = mri<IArgv>(process.argv.slice(2), {
  alias: { h: 'help', t: 'template', a: 'addons' },
  boolean: ['help', 'overwrite', 'h'],
  string: ['template', 'addons'],
});

async function init() {
  intro('Create Servest project');

  const argTargetDir = argv._[0] ? formatTargetDir(String(argv._[0])) : undefined;
  const argTemplate = argv.template;
  const argOverwrite = argv.overwrite;
  const addonsArg = argv.a || argv.addons;

  const help = argv.help || argv.h;
  if (help) {
    console.log(helpMessage);
    return;
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);

  // 1️⃣ Targeting directory
  let targetDir = argTargetDir;
  if (!targetDir) {
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

  fs.mkdirSync(root, { recursive: true });

  // 3️⃣ validating package name
  let packageName = path.basename(path.resolve(root));
  if (!isValidPackageName(packageName)) {
    const suggestedName = toValidPackageName(packageName);
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

  // 4️⃣ Determine template
  let template = argv.template?.trim();
  let hasInvalidArgTemplate = false;
  if (template && !ALL_TEMPLATES.includes(template)) {
    template = undefined;
    hasInvalidArgTemplate = true;
  }

  if (!template) {
    // Selecting a framework
    const framework = await select({
      message: hasInvalidArgTemplate
        ? `"${argTemplate}" isn't a valid template. Please choose from below: `
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

  // 5️⃣ Running custom command if exists
  const pkgManager = detectPkgManager();

  console.log(pkgManager);

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

  // 6️⃣ Copy template files
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

  copyDir(templateDir, root);

  if (template.includes('express')) {
    updatePackageName(path.join(root, 'package.json'), packageName);
  }

  // 7️⃣ Running addons if specified
  // Start with the -a/-addons value (if any)
  let addons: string[] = addonsArg ? addonsArg.split(/\s+/).filter(Boolean) : [];

  // Include any extra positional arguments after the project name
  addons = addons.concat(argv._.slice(1));

  let inStallCommand = false;

  if (addons.length > 0) {
    // Installing dependencies
    const installResult = spawn.sync(pkgManager, ['install'], { cwd: root, stdio: 'inherit' });
    if (installResult.status !== 0) {
      log.warn(red(`🚨 'npm install' failed. Please run '${pkgManager} install' manually.`));
      process.exit(installResult.status ?? 1);
    } else {
      inStallCommand = true;
      log.success(green(`✅ Dependencies installed successfully!`));
    }

    // Initializing servest
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

    //  Checking if config exists
    const servestConfig = getIServestConfig(root);

    if (servestConfig) {
      // Running all addons in a single command
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

  // 8️⃣ Displaying outro message
  const cdProjectName = path.relative(cwd, root);
  const cdCommand =
    root !== cwd ? `cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}` : '';

  const installCommands =
    pkgManager === 'yarn'
      ? inStallCommand
        ? ['yarn start:dev']
        : ['yarn', 'yarn start:dev']
      : pkgManager === 'pnpm'
        ? inStallCommand
          ? ['pnpm run start:dev']
          : ['pnpm install', 'pnpm run start:dev']
        : inStallCommand
          ? ['npm run start:dev']
          : ['npm install', 'npm run start:dev'];

  let finalMessage = `'🎉 Done. Now run:', ${cdCommand}`;

  if (template.includes('express')) {
    finalMessage = ['Done. Now run:', cdCommand, ...installCommands]
      .filter(Boolean)
      .map((line) => `  ${line}`)
      .join('\n');
  }
  outro(green(finalMessage));
}

// ───── INIT ─────
init().catch((err) => {
  cancelOperation(red(err));
});
