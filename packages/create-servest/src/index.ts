import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { intro, isCancel, outro, select } from '@clack/prompts';
import mri from 'mri';
import spawn from 'cross-spawn';
import { ALL_TEMPLATES, FRAMEWORKS, cancelOperation } from './utils';

// Detect package manager
function detectPkgManager(): string {
  const userAgent = process.env.npm_config_user_agent ?? '';
  if (userAgent.startsWith('yarn')) return 'yarn';
  if (userAgent.startsWith('pnpm')) return 'pnpm';
  return 'npm';
}

// Replace TARGET_DIR in command
function getFullCustomCommand(cmd: string, targetDir: string) {
  return cmd.replace('TARGET_DIR', `"${targetDir}"`);
}

// Check if directory is empty
function isEmptyDir(dir: string) {
  if (!fs.existsSync(dir)) return true;
  const files = fs.readdirSync(dir);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

// Remove all files in directory except .git
function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') continue;
    const fullPath = path.join(dir, file);
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
}

// Check directory and prompt user if needed
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

// Copy template recursively
function copyRecursiveSync(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      if (file === '.gitkeep') continue;
      const curSrc = path.join(src, file);
      const curDest = path.join(dest, file === '_gitignore' ? '.gitignore' : file);
      copyRecursiveSync(curSrc, curDest);
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

async function main() {
  intro('Servest – Backend project generator');

  const args = mri(process.argv.slice(2), {
    alias: { t: 'template', h: 'help' },
    string: ['template'],
    boolean: ['help'],
  });

  if (args.h || args.help) {
    console.log(`Usage: create-servest [OPTION]... [DIRECTORY]
With no arguments, start the interactive mode.`);
    process.exit(0);
  }

  const targetDir = args._[0] ?? 'my-backend-app';
  let template = args.template;

  // If template is invalid, prompt user
  if (!template || !ALL_TEMPLATES.includes(template)) {
    // Choose framework
    const framework = await select({
      message: 'Choose a backend framework:',
      options: FRAMEWORKS.map((f) => ({ label: f.color(f.name), value: f.value })),
    });
    if (isCancel(framework)) cancelOperation();

    const fw = FRAMEWORKS.find((f) => f.value === framework)!;

    // Choose variant
    const variant = await select({
      message: 'Choose a variant:',
      options: fw.variants.map((v) => ({ label: v.color(v.name), value: v.value })),
    });
    if (isCancel(variant)) cancelOperation();

    if (typeof variant === 'string') {
      template = `${fw.value}-${variant}`;
    } else {
      cancelOperation('Invalid variant selected');
    }
  }

  const fwVariant = FRAMEWORKS.flatMap((f) => f.variants).find(
    (v) => `${v.value}` === template.split('-')[1],
  );

  const pkgManager = detectPkgManager();

  // If variant has a custom command, run it and exit
  if (fwVariant?.customCommand) {
    const fullCmd = getFullCustomCommand(fwVariant.customCommand, targetDir);
    const [command, ...args] = fullCmd.split(' ');
    const { status } = spawn.sync(command, args, { stdio: 'inherit' });
    process.exit(status ?? 0);
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const templateDir = path.resolve(__dirname, `../templates/${template}`);
  const root = path.resolve(process.cwd(), targetDir);

  await checkDirectory(root);

  console.log(`\n🛠️  Generating project "${targetDir}" using template ${template}...`);
  copyRecursiveSync(templateDir, root);

  // Modify package.json if exists
  const pkgPath = path.join(root, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.name = targetDir;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  }

  let doneMessage = `🎉 Done! Project created at ./${targetDir}\n\n`;
  if (root !== process.cwd()) {
    doneMessage += `cd ${targetDir.includes(' ') ? `"${targetDir}"` : targetDir}\n`;
  }
  doneMessage +=
    pkgManager === 'yarn' ? 'yarn\n' + 'yarn dev' : `${pkgManager} install\n${pkgManager} run dev`;
  outro(doneMessage);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
