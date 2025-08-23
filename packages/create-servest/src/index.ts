// Node built-in modules
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// External dependencies
import mri from 'mri';
import { intro, isCancel, log, outro, select, text } from '@clack/prompts';
import spawn from 'cross-spawn';

// Local utilities
import { ALL_TEMPLATES, FRAMEWORKS, cancelOperation, helpMessage } from './utils';
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
import { green, red, yellow } from './utils/colors';

const cwd = process.cwd();
const defaultTargetDir = 'servest-backend-project';

// CLI args
const argv = mri<{
  template?: string;
  help?: boolean;
  h?: boolean;
  overwrite?: boolean;
}>(process.argv.slice(2), {
  alias: { h: 'help', t: 'template' },
  boolean: ['help', 'overwrite', 'h'],
  string: ['template'],
});

async function init() {
  intro('Create Servest project');

  const argTargetDir = argv._[0]?.toString() ? formatTargetDir(String(argv._[0])) : undefined;
  const argTemplate = argv.template;
  const argOverwrite = argv.overwrite;

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
          value: v.name,
          hint,
        };
      }),
    });
    if (isCancel(variant)) return cancelOperation();

    template = variant as string;
  }

  // 5️⃣ Running custom command if exists
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

  const { customCommand } =
    FRAMEWORKS.flatMap((f) => f.variants).find((v) => v.name === template) ?? {};

  if (customCommand) {
    const fullCustomCommand = getFullCustomCommand(customCommand, pkgInfo);

    if (fullCustomCommand.includes('--template')) {
      log.info(`Running custom command: ${fullCustomCommand}`);
    }

    const [command, ...args] = fullCustomCommand.split(' ');
    const replacedArgs = args.map((arg) => arg.replace('TARGET_DIR', targetDir));

    const { status } = spawn.sync(command, replacedArgs, {
      stdio: 'inherit',
    });
    process.exit(status ?? 0);
  }

  log.step(`Scaffolding project in ${root}...`);

  // 6️⃣ Copy template files
  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../templates', template);
  copyDir(templateDir, root);
  updatePackageName(path.join(root, 'package.json'), packageName);

  // 8️⃣ Displaying outro message
  const cdProjectName = path.relative(cwd, root);

  const cdCommand =
    root !== cwd ? `cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}` : '';

  const installCommands =
    pkgManager === 'yarn'
      ? ['yarn', 'yarn dev']
      : [`${pkgManager} install`, `${pkgManager} run dev`];

  const finalMessage = ['Done. Now run:', cdCommand, ...installCommands]
    .filter(Boolean) // remove empty strings if cdCommand is ''
    .map((line) => `  ${line}`) // indent each line
    .join('\n');

  outro(green(finalMessage));
}

// ───── INIT ─────
init().catch((err) => {
  console.error(err);
  process.exit(1);
});
