#!/usr/bin/env node

import { intro, outro, select, text } from '@clack/prompts';
import { green } from './utils/console-colors';
import path from 'node:path';
import fs from 'node:fs/promises';
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

const argv = mri<{
  template?: string;
  help?: boolean;
  overwrite?: boolean;
}>(process.argv.slice(2), {
  alias: { h: 'help', t: 'template' },
  boolean: ['help', 'overwrite'],
  string: ['template'],
});

const cwd = process.cwd();

async function main() {
  intro(('Servest – Backend project generator'));

  const projectType = (await select({
    message: 'Choose a backend framework:',
    options: [
      { value: 'express', label: 'Express (JavaScript)' },
      { value: 'django', label: 'Django (Python)' },
      { value: 'laravel', label: 'Laravel (PHP)' },
    ],
  })) as 'express' | 'django' | 'laravel' | symbol;

  const folderName = await text({
    message: 'Project folder name:',
    placeholder: 'my-backend-app',
  });

  if (typeof projectType !== 'string') {
    console.error('❌ Operation cancelled.');
    process.exit(1);
  }

  const variant = (await select({
    message: 'Choose a variant:',
    options: variantMap[projectType],
  })) as string;

  if (!folderName || typeof folderName !== 'string') {
    console.error('❌ Invalid folder name');
    process.exit(1);
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const src = path.resolve(__dirname, `../templates/${projectType}-${variant}`);
  
  const dest = path.resolve(process.cwd(), folderName);
  
    if (fs.existsSync(dest)) {
      console.error(`❌ Folder "${folderName}" already exists.`);
      process.exit(1);
    }


  console.log('\n🛠️  Generating project...');
  console.log('Framework:', projectType);
  console.log('Folder:', folderName);



    await fs.copy(src, dest);

   outro(green(`Done! Project created in ./${folderName}`));
}

main().catch(console.error);
