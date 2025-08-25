import { Command } from 'commander';

export const init = new Command()
  .name('init')
  .description('Initialize a new project')
  .action(() => {
    console.log('Initializing new project...');
  });
