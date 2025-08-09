import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { intro, outro, select, text, isCancel } from '@clack/prompts';
import { green, red } from './utils/console-colors';
import mri from 'mri';

const variantMap: Record<string, { value: string; label: string }[]> = {
  express: [
    { value: 'js-basic', label: 'JavaScript – Basic' },
    { value: 'ts-basic', label: 'TypeScript – Basic' },
    { value: 'js-mvc', label: 'JavaScript – MVC' },
    { value: 'ts-mvc', label: 'TypeScript – MVC' },
  ],
  django: [
    { value: 'py-basic', label: 'Python – Basic' },
    { value: 'py-api', label: 'Python – API Only' },
  ],
  laravel: [
    { value: 'php-basic', label: 'PHP – Basic' },
    { value: 'php-api', label: 'PHP – API Only' },
  ],
};

function copyRecursiveSync(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      const curSrc = path.join(src, file);
      const curDest = path.join(dest, file);
      copyRecursiveSync(curSrc, curDest);
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

async function main() {
  intro('Servest – Backend project generator');

  const args = mri(process.argv.slice(2), {
    alias: { t: 'type', v: 'variant', n: 'name' },
    string: ['type', 'variant', 'name'],
  });

  let projectType = args.type;
  let variant = args.variant;
  let folderName = args.name;

  // Validate or prompt for projectType
  if (!projectType || !Object.keys(variantMap).includes(projectType)) {
    const selected = await select({
      message: 'Choose a backend framework:',
      options: Object.entries(variantMap).map(([key, _]) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value: key,
      })),
    });
    if (isCancel(selected)) {
      console.error(red('❌ Operation cancelled.'));
      process.exit(1);
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
      console.error(red('❌ Operation cancelled.'));
      process.exit(1);
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
      console.error(red('❌ Operation cancelled.'));
      process.exit(1);
    }
    folderName = input;
  }

  if (typeof folderName !== 'string' || folderName.trim() === '') {
    console.error(red('❌ Invalid folder name'));
    process.exit(1);
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const src = path.resolve(__dirname, `../templates/${projectType}-${variant}`);
  const dest = path.resolve(process.cwd(), folderName);

  if (fs.existsSync(dest)) {
    console.error(red(`❌ Folder "${folderName}" already exists.`));
    process.exit(1);
  }

  console.log(
    `\n🛠️  Generating project "${folderName}" using ${projectType} (${variant})...`
  );

  try {
    copyRecursiveSync(src, dest);
  } catch (err) {
    console.error(
      red(`❌ Failed to copy template files: ${(err as Error).message}`)
    );
    process.exit(1);
  }

  outro(green(`🎉 Done! Project created at ./${folderName}`));
}

main().catch((err) => {
  console.error(red('❌ Unexpected error:'), err);
  process.exit(1);
});
