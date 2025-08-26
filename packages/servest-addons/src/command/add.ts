import { Command } from 'commander';
import { cancelOperation } from '../../../utils/cancel-operation';
import { createFilesForFeature, getServestConfig } from '../utils/add/create-file';
import { checkNodeFramework } from '../utils';

// Main add command
export const add = new Command()
  .name('add')
  .description('Add features or generate files/folders for your project')
  .argument('<feature>', 'Feature name or f-command (e.g., mongoose, f-users)')
  .action((feature: string) => {
    const cwd = process.cwd();
    const config = getServestConfig(cwd);

    if (!config) {
      cancelOperation('servest.config.json not found. Please run "npx servest@latest init" first.');
    }

    if (feature.startsWith('f-')) {
      checkNodeFramework(config!.framework, feature);
      const featureName = feature.slice(2);
      createFilesForFeature(cwd, featureName, config!);
    } else if (feature === 'mongoose') {
      checkNodeFramework(config!.framework, feature);
    } else {
      console.log(`🔧 Add-on feature "${feature}" detected for framework ${config!.framework}.`);
      // Here you can implement your logic for addons (mongoose, eslint, prettier, etc.)
      // This can include installing packages or creating starter files.
    }
  });
