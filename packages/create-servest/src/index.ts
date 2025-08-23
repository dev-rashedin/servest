import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { intro, isCancel, log, outro, select, text } from '@clack/prompts';
import mri from 'mri';
import spawn from 'cross-spawn';
import { ALL_TEMPLATES, FRAMEWORKS, cancelOperation } from './utils';

const cwd = process.cwd();
const defaultTargetDir = 'servest-project';

// CLI args
const argv = mri(process.argv.slice(2), {
  alias: { h: 'help', f: 'framework', v: 'variant', t: 'template' },
  boolean: ['help', 'overwrite'],
  string: ['framework', 'variant', 'template'],
});

// Get args
const argTargetDir = argv._[0] as string | undefined;
const argFramework = argv.framework as string | undefined;
const argVariant = argv.variant as string | undefined;
const argTemplate = argv.template as string | undefined;
const argOverwrite = argv.overwrite as boolean | undefined;

// Help message
const helpMessage = `
Usage: create-servest [OPTION]... [DIRECTORY]

Create a new backend project.

Options:
  -f, --framework NAME    choose a framework
  -v, --variant NAME      choose a variant
  -t, --template NAME     use a specific template
  -h, --help              show help
  --overwrite             overwrite existing files

Available frameworks:
${FRAMEWORKS.map((f) => f.color(f.name)).join('\n')}
`;

async function init() {
  intro('Create Servest project');

  if (argv.help) {
    console.log(helpMessage);
    return;
  }

  // 1️⃣ Target directory
  let targetDir = argTargetDir;
  if (!targetDir) {
    const projectName = await text({
      message: 'Project name:',
      defaultValue: defaultTargetDir,
      placeholder: defaultTargetDir,
      validate(value) {
        return value.trim().length > 0 ? undefined : 'Invalid project name';
      },
    });
    if (isCancel(projectName)) return cancelOperation();
    targetDir = projectName.trim();
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
  let template = argTemplate;
  let hasInvalidArgTemplate = false;
  if (template && !ALL_TEMPLATES.includes(template)) {
    template = undefined;
    hasInvalidArgTemplate = true;
  }

  let framework, variant;
  if (!template) {
    // Select framework
    framework = argFramework ? FRAMEWORKS.find((f) => f.value === argFramework) : undefined;
    if (!framework) {
      framework = await select({
        message: hasInvalidArgTemplate
          ? `"${argTemplate}" isn't valid. Select framework:`
          : 'Select a framework:',
        options: FRAMEWORKS.map((f) => ({ label: f.color(f.name), value: f })),
      });
      if (isCancel(framework)) return cancelOperation();
    }

    // Select variant
    variant = argVariant ? framework.variants.find((v) => v.value === argVariant) : undefined;
    if (!variant) {
      variant = await select({
        message: 'Select a variant:',
        options: framework.variants.map((v) => ({
          label: v.color(v.name),
          value: v,
          hint: v.customCommand,
        })),
      });
      if (isCancel(variant)) return cancelOperation();
    }

    template = `${framework.value}-${variant.value}`;
  }

  // 5️⃣ Run custom command if exists
  const customVariant = FRAMEWORKS.flatMap((f) =>
    f.variants.map((v) => ({ framework: f, variant: v })),
  ).find(({ framework, variant }) => `${framework.value}-${variant.value}` === template)?.variant;
  if (customVariant?.customCommand) {
    const cmd = customVariant.customCommand.replace('TARGET_DIR', targetDir);
    const [command, ...args] = cmd.split(' ');
    const { status } = spawn.sync(command, args, { stdio: 'inherit' });
    process.exit(status ?? 0);
  }

  log.step(`Scaffolding project in ${root}...`);

  // 6️⃣ Copy template files
  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../templates', template);

  copyDir(templateDir, root);

  // 7️⃣ Patch package.json
  const pkgFile = path.join(root, 'package.json');
  if (fs.existsSync(pkgFile)) {
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf-8'));
    pkg.name = packageName;
    fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
  }

  // 8️⃣ Outro message
  outro(
    `Project created in ${root}\n\nNext steps:\n  cd ${targetDir}\n  npm install\n  npm run dev`,
  );
}

// ───── HELPERS ─────

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-');
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') continue;
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    if (fs.statSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  }
}

// ───── INIT ─────
init().catch((err) => {
  console.error(err);
  process.exit(1);
});
