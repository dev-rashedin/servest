#!/usr/bin/env node

import { intro, outro, select, text } from '@clack/prompts';
import { cyan, green } from './utils/console-colors';
import path from 'path';
import fs from 'fs-extra';

async function main() {
  intro(cyan('Servest – Backend project generator'));

  const projectType = await select({
    message: 'Choose a backend framework:',
    options: [
      { value: 'express', label: 'Express (JavaScript)' },
      { value: 'django', label: 'Django (Python)' },
      { value: 'laravel', label: 'Laravel (PHP)' },
    ],
  });

  const folderName = await text({
    message: 'Project folder name:',
    placeholder: 'my-backend-app',
  });

  console.log('\n🛠️  Generating project...');
  console.log('Framework:', projectType);
  console.log('Folder:', folderName);

    const src = path.resolve(__dirname, '../templates/express-js-basic');
    const dest = path.resolve(process.cwd(), folderName as string);

    await fs.copy(src, dest);

   outro(green(`Done! Project created in ./${folderName}`));
}

main().catch(console.error);
