// Node built-in modules
import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// External dependencies
import spawn from 'cross-spawn';
import mri from 'mri';
import { intro, isCancel, outro, select, text } from '@clack/prompts';

// Local utilities
import { blue, boldGreen, boldRed, boldYellow, green, red, yellow } from './utils/console-colors';
import { cancelOperation } from './utils';

// Map of the frameworks with colors
const frameworkColorMap: Record<string, (text: string) => string> = {
  express: boldYellow,
  django: boldGreen,
  laravel: boldRed,
};

console.log(spawn);

// Map of project types and their variants
const variantMap: Record<string, { value: string; label: string; customCommand?: string }[]> = {
  express: [
    {
      value: 'basic-js',
      label: yellow('Basic - JavaScript'),
      customCommand: 'npm create servest@latest -- --template express-basic-js',
    },
    {
      value: 'basic-ts',
      label: blue('Basic - TypeScript'),
      customCommand: 'npm create servest@latest -- --template express-basic-ts',
    },
    {
      value: 'mvc-cjs',
      label: yellow('MVC - CommonJS'),
      customCommand: 'npm create servest@latest -- --template express-mvc-cjs',
    },
    {
      value: 'mvc-esm',
      label: yellow('MVC - ESM'),
      customCommand: 'npm create servest@latest -- --template express-mvc-esm',
    },
    {
      value: 'mvc-ts',
      label: blue('MVC - TypeScript'),
      customCommand: 'npm create servest@latest -- --template express-mvc-ts',
    },
    {
      value: 'modular-cjs',
      label: yellow('Modular - CommonJS'),
      customCommand: 'npm create servest@latest -- --template express-modular-cjs',
    },
    {
      value: 'modular-esm',
      label: yellow('Modular - ESM'),
      customCommand: 'npm create servest@latest -- --template express-modular-esm',
    },
    {
      value: 'modular-ts',
      label: blue('Modular - TypeScript'),
      customCommand: 'npm create servest@latest -- --template express-modular-ts',
    },
  ],
  django: [
    { value: 'basic', label: green('Django Basic') },
    { value: 'api', label: green('Django API Only') },
    { value: 'channels', label: green('Django Channels (WebSocket)') },
    { value: 'celery', label: green('Django Celery (Background Tasks)') },
  ],
  laravel: [
    { value: 'basic', label: red('Laravel Basic') },
    { value: 'api', label: red('Laravel API Only') },
    { value: 'breeze', label: red('Laravel Breeze (Simple Auth)') },
    { value: 'jetstream', label: red('Laravel Jetstream (Advanced Auth)') },
  ],
};

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
  if (fs.existsSync(dir) && !isEmptyDir(dir)) {
    const result = await select({
      message: `Target directory "${dir}" is not empty. How do you want to proceed?`,
      options: [
        { value: 'cancel', label: 'Cancel operation' },
        { value: 'overwrite', label: 'Remove existing files and continue' },
        { value: 'ignore', label: 'Ignore and continue' },
      ],
    });

    if (isCancel(result) || result === 'cancel') {
      cancelOperation();
    }

    if (result === 'overwrite') {
      emptyDir(dir);
    }
  }
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
    alias: { t: 'type', v: 'variant', n: 'name', T: 'template' },
    string: ['type', 'variant', 'name', 'template'],
  });

  let projectType = args.type;
  let variant = args.variant;
  let folderName = args.name;
  const template = args.template;

  console.log('hello args', args);

  if (template && projectType && variant) {
    // User provided --template and it matched a known template
    console.log(green(`Using template: ${projectType}-${variant}`));

    // Directly scaffold without prompting
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const src = path.resolve(__dirname, `../templates/${projectType}-${variant}`);
    const dest = path.resolve(process.cwd(), folderName || projectType);

    await checkDirectory(dest);

    console.log(
      `\n🛠️  Generating project "${folderName || projectType}" using ${projectType} (${variant})...`,
    );

    copyRecursiveSync(src, dest);

    outro(green(`🎉 Done! Project created at ./${folderName || projectType}`));
    process.exit(0);
  }

  // Validate or prompt for projectType
  if (!projectType || !Object.keys(variantMap).includes(projectType)) {
    const selected = await select({
      message: 'Choose a backend framework:',
      options: Object.entries(variantMap).map(([key, _]) => {
        const color = frameworkColorMap[key] || ((t: string) => t);
        return {
          label: color(key.charAt(0).toUpperCase() + key.slice(1)),
          value: key,
        };
      }),
    });
    if (isCancel(selected)) {
      cancelOperation();
    }
    projectType = selected;
  }

  // Validate or prompt for variant
  if (!variant || !variantMap[projectType].some((v) => v.value === variant)) {
    const selected = await select({
      message: 'Choose a variant:',
      options: variantMap[projectType],
    });
    if (isCancel(selected)) {
      cancelOperation();
    }
    variant = selected;
  }

  // Validate or prompt for folderName
  if (!folderName) {
    const input = await text({
      message: 'Project folder name:',
      placeholder: 'my-backend-app',
    });
    if (isCancel(input)) {
      cancelOperation();
    }
    folderName = input;
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
