import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { intro, isCancel, log, outro, select, text } from '@clack/prompts';
import mri from 'mri';
import spawn from 'cross-spawn';
import { ALL_TEMPLATES, FRAMEWORKS, cancelOperation, helpMessage } from './utils';
// import { formatTargetDir, getFullCustomCommand, isValidPackageName, pkgFromUserAgent } from './utils/helper';

const cwd = process.cwd();
const defaultTargetDir = 'servest-project';

// CLI args
const argv = mri<{
  template?: string;
  help?: boolean;
  h: boolean;
  overwrite?: boolean;
}>(process.argv.slice(2), {
  alias: { h: 'help', t: 'template' },
  boolean: ['help', 'overwrite', 'h'],
  string: ['template'],
});

// const cwd = process.cwd();

// const renameFiles: Record<string, string | undefined> = {
//   _gitignore: '.gitignore',
// };

// const defaultTargetDir = 'servest-backend-project';

async function init() {
  intro('Create Servest project');

  const argTargetDir = argv._[0] ? formatTargetDir(String(argv._[0])) : undefined;
  const argTemplate = argv.template;
  const argOverwrite = argv.overwrite;

  const help = argv.help || argv.h;
  if (help) {
    console.log(helpMessage);
    return;
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);

  // 1️⃣ Target directory
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
  let template = argTemplate;
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

// function toValidPackageName(projectName: string) {
//   return projectName
//     .trim()
//     .toLowerCase()
//     .replace(/\s+/g, '-')
//     .replace(/^[._]/, '')
//     .replace(/[^a-z\d\-~]+/g, '-');
// }

// function isEmpty(path: string) {
//   const files = fs.readdirSync(path);
//   return files.length === 0 || (files.length === 1 && files[0] === '.git');
// }

// function emptyDir(dir: string) {
//   if (!fs.existsSync(dir)) return;
//   for (const file of fs.readdirSync(dir)) {
//     if (file === '.git') continue;
//     fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
//   }
// }

// function copyDir(srcDir: string, destDir: string) {
//   fs.mkdirSync(destDir, { recursive: true });
//   for (const file of fs.readdirSync(srcDir)) {
//     const srcFile = path.join(srcDir, file);
//     const destFile = path.join(destDir, file);
//     if (fs.statSync(srcFile).isDirectory()) {
//       copyDir(srcFile, destFile);
//     } else {
//       fs.copyFileSync(srcFile, destFile);
//     }
//   }
// }

// ───── INIT ─────
init().catch((err) => {
  console.error(err);
  process.exit(1);
});

// helper functions

interface PkgInfo {
  name: string;
  version: string;
}

export function formatTargetDir(targetDir: string): string {
  return targetDir.trim().replace(/\/+$/g, '');
}

export function copy(src: string, dest: string): void {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

export function isValidPackageName(projectName: string): boolean {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

export function toValidPackageName(projectName: string): string {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-');
}

export function copyDir(srcDir: string, destDir: string): void {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

export function isEmpty(path: string): boolean {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

export function emptyDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

export function pkgFromUserAgent(userAgent: string | undefined): PkgInfo | undefined {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

export function setupReactSwc(root: string, isTs: boolean): void {
  // renovate: datasource=npm depName=@vitejs/plugin-react-swc
  const reactSwcPluginVersion = '3.11.0';

  editFile(path.resolve(root, 'package.json'), (content) => {
    return content.replace(
      /"@vitejs\/plugin-react": ".+?"/,
      `"@vitejs/plugin-react-swc": "^${reactSwcPluginVersion}"`,
    );
  });
  editFile(path.resolve(root, `vite.config.${isTs ? 'ts' : 'js'}`), (content) => {
    return content.replace('@vitejs/plugin-react', '@vitejs/plugin-react-swc');
  });
}

export function editFile(file: string, callback: (content: string) => string): void {
  const content = fs.readFileSync(file, 'utf-8');
  fs.writeFileSync(file, callback(content), 'utf-8');
}

export function getFullCustomCommand(customCommand: string, pkgInfo?: PkgInfo): string {
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';
  const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.');

  return (
    customCommand
      .replace(/^npm create (?:-- )?/, () => {
        // `bun create` uses it's own set of templates,
        // the closest alternative is using `bun x` directly on the package
        if (pkgManager === 'bun') {
          return 'bun x create-';
        }
        // pnpm doesn't support the -- syntax
        if (pkgManager === 'pnpm') {
          return 'pnpm create ';
        }
        // For other package managers, preserve the original format
        return customCommand.startsWith('npm create -- ')
          ? `${pkgManager} create -- `
          : `${pkgManager} create `;
      })
      // Only Yarn 1.x doesn't support `@version` in the `create` command
      .replace('@latest', () => (isYarn1 ? '' : '@latest'))
      .replace(/^npm exec/, () => {
        // Prefer `pnpm dlx`, `yarn dlx`, or `bun x`
        if (pkgManager === 'pnpm') {
          return 'pnpm dlx';
        }
        if (pkgManager === 'yarn' && !isYarn1) {
          return 'yarn dlx';
        }
        if (pkgManager === 'bun') {
          return 'bun x';
        }
        // Use `npm exec` in all other cases,
        // including Yarn 1.x and other custom npm clients.
        return 'npm exec';
      })
  );
}
