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
  copy,
  emptyDir,
  formatTargetDir,
  getFullCustomCommand,
  isEmpty,
  isValidPackageName,
  pkgFromUserAgent,
  toValidPackageName,
} from './utils/helper';
import { green } from './utils/colors';

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

  // 2️⃣ Handle existing directory
  if (fs.existsSync(root) && !isEmpty(root)) {
    const overwrite = argOverwrite
      ? 'yes'
      : await select({
          message: `Target directory "${targetDir}" is not empty. Choose:`,
          options: [
            { value: 'no', label: 'Cancel' },
            { value: 'yes', label: 'Remove existing files and continue' },
            { value: 'ignore', label: 'Ignore and continue' },
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

  // 3️⃣ Package name validation
  let packageName = path.basename(path.resolve(root));
  if (!isValidPackageName(packageName)) {
    const packageNameResult = await text({
      message: 'Package name:',
      defaultValue: toValidPackageName(packageName),
      placeholder: toValidPackageName(packageName),
      validate(dir) {
        if (!isValidPackageName(dir)) return 'Invalid package.json name';
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
    const framework = await select({
      message: hasInvalidArgTemplate
        ? `"${argTemplate}" isn't a valid template. Please choose from below: `
        : 'Select a framework:',
      options: FRAMEWORKS.map((framework) => {
        const frameworkColor = framework.color;
        return {
          label: frameworkColor(framework.name),
          value: framework,
        };
      }),
    });
    if (isCancel(framework)) return cancelOperation();

    const variant = await select({
      message: 'Select a variant:',
      options: framework.variants.map((variant) => {
        const variantColor = variant.color;
        const command = variant.customCommand
          ? getFullCustomCommand(variant.customCommand, pkgInfo).replace(/ TARGET_DIR$/, '')
          : undefined;
        return {
          label: variantColor(variant.name),
          value: variant.name,
          hint: command,
        };
      }),
    });
    if (isCancel(framework)) return cancelOperation();

    template = variant as string;
  }

  // 5️⃣ Run custom command if exists
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

  const { customCommand } =
    FRAMEWORKS.flatMap((f) => f.variants).find((v) => v.name === template) ?? {};

  if (customCommand) {
    const fullCustomCommand = getFullCustomCommand(customCommand, pkgInfo);

    const [command, ...args] = fullCustomCommand.split(' ');
    // we replace TARGET_DIR here because targetDir may include a space
    const replacedArgs = args.map((arg) => arg.replace('TARGET_DIR', () => targetDir));
    const { status } = spawn.sync(command, replacedArgs, {
      stdio: 'inherit',
    });
    process.exit(status ?? 0);
  }

  log.step(`Scaffolding project in ${root}...`);

  // 6️⃣ Copy template files
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../templates',
    `template-${template}`,
  );

  const write = (file: string, content?: string) => {
    // Skip .gitkeep files entirely
    if (file === '.gitkeep') return;

    const finalName = file === '_gitignore' ? '.gitignore' : file;
    const targetPath = path.join(root, finalName);

    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = fs.readdirSync(templateDir);
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file);
  }

  const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'));

  pkg.name = packageName;

  write('package.json', JSON.stringify(pkg, null, 2) + '\n');

  let doneMessage = '';
  const cdProjectName = path.relative(cwd, root);
  doneMessage += `Done. Now run:\n`;
  if (root !== cwd) {
    doneMessage += `\n  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`;
  }
  switch (pkgManager) {
    case 'yarn':
      doneMessage += '\n  yarn';
      doneMessage += '\n  yarn dev';
      break;
    default:
      doneMessage += `\n  ${pkgManager} install`;
      doneMessage += `\n  ${pkgManager} run dev`;
      break;
  }

  // 8️⃣ Outro message
  outro(green(doneMessage));
}

// ───── INIT ─────
init().catch((err) => {
  console.error(err);
  process.exit(1);
});
