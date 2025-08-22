// Node built-in modules
import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// External dependencies
// import spawn from 'cross-spawn';
import mri from 'mri';
import { intro, isCancel, outro, select, text } from '@clack/prompts';

// Local utilities
import { blue, boldGreen, boldRed, boldYellow, green, red, yellow } from './utils/console-colors';
import { cancelOperation } from './utils';

// const argv = mri(process.argv.slice(2), {
//   alias: { h: 'help', t: 'template' },
//   boolean: ['help', 'overwrite'],
//   string: ['template'],
// });
// const cwd = process.cwd();

// prettier-ignore
const helpMessage = `\
Usage: create-servest [OPTION]... [DIRECTORY]

Create a new Servest backend project.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template
  -h, --help                 show this help message

Available templates:
${yellow('express-basic-js   express-basic-ts   express-modular-esm')}
${yellow('express-mvc-cjs    express-mvc-esm     express-mvc-ts')}
${yellow('express-modular-cjs    express-modular-esm   express-modular-ts')}
`;

// ${green('django-basic        django-api        django-channels    django-celery')}
// ${red('laravel-basic       laravel-api       laravel-breeze    laravel-jetstream')}

// interface ColorFunc {
//   (str: string | number) : string;
// }

interface Variant {
  value: string;
  name: string;
  color: (text: string) => string;
  customCommand?: string;
}

interface Framework {
  value: string;
  name: string;
  color: (text: string) => string;
  variants: Variant[];
}

const FRAMEWORKS: Framework[] = [
  {
    value: 'express',
    name: 'Express',
    color: boldYellow,
    variants: [
      {
        value: 'basic-js',
        name: 'Basic - JavaScript',
        color: yellow,
        customCommand: 'npm create servest@latest -- --template express-basic-js',
      },
      {
        value: 'basic-ts',
        name: 'Basic - TypeScript',
        color: blue,
        customCommand: 'npm create servest@latest -- --template express-basic-ts',
      },
      {
        value: 'mvc-cjs',
        name: 'MVC - CommonJS',
        color: yellow,
        customCommand: 'npm create servest@latest -- --template express-mvc-cjs',
      },
      {
        value: 'mvc-esm',
        name: 'MVC - ESM',
        color: yellow,
        customCommand: 'npm create servest@latest -- --template express-mvc-esm',
      },
      {
        value: 'mvc-ts',
        name: 'MVC - TypeScript',
        color: blue,
        customCommand: 'npm create servest@latest -- --template express-mvc-ts',
      },
      {
        value: 'modular-cjs',
        name: 'Modular - CommonJS',
        color: yellow,
        customCommand: 'npm create servest@latest -- --template express-modular-cjs',
      },
      {
        value: 'modular-esm',
        name: 'Modular - ESM',
        color: yellow,
        customCommand: 'npm create servest@latest -- --template express-modular-esm',
      },
      {
        value: 'modular-ts',
        name: 'Modular - TypeScript',
        color: blue,
        customCommand: 'npm create servest@latest -- --template express-modular-ts',
      },
    ],
  },
  {
    value: 'django',
    name: 'Django',
    color: boldGreen,
    variants: [
      { value: 'basic', name: 'Basic', color: green },
      { value: 'api', name: 'API Only', color: green },
      { value: 'channels', name: 'Channels (WebSocket)', color: green },
      { value: 'celery', name: 'Celery (Background Tasks)', color: green },
    ],
  },
  {
    value: 'laravel',
    name: 'Laravel',
    color: boldRed,
    variants: [
      { value: 'basic', name: 'Basic', color: red },
      { value: 'api', name: 'API Only', color: red },
      { value: 'breeze', name: 'Breeze (Simple Auth)', color: red },
      { value: 'jetstream', name: 'Jetstream (Advanced Auth)', color: red },
    ],
  },
];

// Flattening all template names for quick lookup
const ALL_TEMPLATES = FRAMEWORKS.flatMap((f) => f.variants.map((v) => `${f.value}-${v.value}`));

// checking if a directory is empty or not
function isEmptyDir(dir: string) {
  if (!fs.existsSync(dir)) return true;
  const files = fs.readdirSync(dir);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

// Removing all files and folders inside the directory recursively, except the .git folder
function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) return;

  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') continue;

    const fullPath = path.join(dir, file);
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
}

/**
 * Checking if the target directory exists and is not empty.
 * If it contains files (other than .git), asks the user what to do.
 * Exits the process if the user cancels.
 */

async function checkDirectory(dir: string) {
  if (fs.existsSync(dir) && !isEmptyDir(dir)) return;
  const result = await select({
    message: `Target directory "${dir}" is not empty. How do you want to proceed?`,
    options: [
      { value: 'cancel', label: 'Cancel operation' },
      { value: 'overwrite', label: 'Remove existing files and continue' },
      { value: 'ignore', label: 'Ignore and continue' },
    ],
  });

  if (isCancel(result) || result === 'cancel') cancelOperation();
  if (result === 'overwrite') emptyDir(dir);
}

// Copying a directory recursively
function copyRecursiveSync(src: string, dest: string) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });

    for (const file of fs.readdirSync(src)) {
      // skip .gitkeep files
      if (file === '.gitkeep') continue;

      const curSrc = path.join(src, file);

      // If the file is _gitignore, renaming it to .gitignore in destination
      const fileName = file === '_gitignore' ? '.gitignore' : file;
      const curDest = path.join(dest, fileName);
      copyRecursiveSync(curSrc, curDest);
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// the main function
async function main() {
  intro('Servest – Backend project generator');

  const args = mri(process.argv.slice(2), {
    alias: { t: 'template', h: 'help' },
    string: ['template'],
    boolean: ['help'],
  });

  // Showing help if requested
  if (args.h || args.help) {
    console.log(helpMessage);
    process.exit(0);
  }

  let template = args.template;
  let projectType = args.type;
  let variant = args.variant;
  let folderName = args.name;

  // const targetDir = args._[0] ? String(args._[0]).trim() : undefined;

  // If template is provided, validating and extract projectType and variant
  if (template && !ALL_TEMPLATES.includes(template)) {
    console.log(red(`"${template}" is not a valid template.`));
    template = undefined;
  }

  // Prompt for projectType if not provided
  if (!projectType) {
    const selected = await select({
      message: 'Select a project type:',
      options: FRAMEWORKS.map((f) => ({
        label: f.name,
        value: f.value,
      })),
    });

    if (isCancel(selected)) cancelOperation();
    projectType = selected as string;
  }

  // Find the selected framework object
  const framework = FRAMEWORKS.find((f) => f.value === projectType)!;

  // Prompt for variant if not provided
  if (!variant) {
    const selectedVariant = await select({
      message: `Select a variant for ${framework.name}:`,
      options: framework.variants.map((v) => ({
        label: v.name,
        value: v.value,
      })),
    });

    if (isCancel(selectedVariant)) cancelOperation();
    variant = selectedVariant as string;
  }

  // Prompt for folder name if not provided
  if (!folderName) {
    const inputName = await text({
      message: 'Project folder name:',
      placeholder: `${projectType}-${variant}`,
      initialValue: `${projectType}-${variant}`,
    });

    if (isCancel(inputName)) cancelOperation();
    folderName = (inputName as string).trim();
  }

  // Validate folderName
  if (typeof folderName !== 'string' || folderName.trim() === '') {
    cancelOperation('Invalid folder name');
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const src = path.resolve(__dirname, `../templates/${projectType}-${variant}`);
  const dest = path.resolve(process.cwd(), folderName);

  // using the checkDirectory function to handle existing folders
  await checkDirectory(dest);

  // If the selected variant has a custom command, run it instead of copying files
  const variantObj = framework.variants.find((v) => v.value === variant)!;
  if (variantObj.customCommand) {
    console.log(green(`Running custom command for template "${template}"...`));
    const [cmd, ...args] = variantObj.customCommand.split(' ');
    const child = await import('child_process');
    const result = child.spawnSync(cmd, args, { stdio: 'inherit' });
    process.exit(result.status ?? 0);
  }

  console.log(`\n🛠️  Generating project "${folderName}" using ${projectType} (${variant})...`);

  try {
    copyRecursiveSync(src, dest);
  } catch (err) {
    cancelOperation(`Failed to copy template files: ${(err as Error).message}`);
  }

  outro(green(`🎉 Done! Project created at ./${folderName}`));
}

// running the main function
main().catch((err) => {
  console.error(red('Unexpected error:'), err);
  process.exit(1);
});
