#!/usr/bin/env node

import pc from 'picocolors';
import { intro, outro, select, text } from '@clack/prompts';

async function main() {
  intro(pc.cyan('Servest – Backend project generator'));

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

  // For now, just print out results
  console.log('\n🛠️  Generating project...');
  console.log('Framework:', projectType);
  console.log('Folder:', folderName);

  outro(pc.green('Done!'));
}

main().catch(console.error);
