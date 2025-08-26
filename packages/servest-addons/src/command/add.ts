import { Command } from 'commander';

export const add = new Command()
  .name('add')
  .description('Add a new feature to your project')
  .argument('<feature>', 'Feature to add (e.g., mongoose, prettier)')
  .action((feature: string) => {
    console.log(`Adding feature: ${feature}`);
    // Here you would implement the logic to add the specified feature
  });
