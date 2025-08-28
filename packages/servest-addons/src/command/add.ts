import { Command } from 'commander';
import { cancelOperation, detectPkgManager } from '../../../utils/sharedUtility';
import { createFilesForFeature, getServestConfig } from '../utils/createFile';
import { checkNodeFramework, getBaseDir } from '../utils';
import { addMongoose } from '../utils/addMongoose';

const packageManager = detectPkgManager();

// Main add command
export const add = new Command()
  .name('add')
  .description('Add features or generate files/folders for your project')
  .argument('<features...>', 'Feature names or f-commands (e.g., mongoose, f-users)')
  .action((features: string[]) => {
    const cwd = process.cwd();
    const config = getServestConfig(cwd);
    const baseDir = getBaseDir(cwd);

    if (!config) {
      cancelOperation('servest.config.json not found. Please run "npx servest@latest init" first.');
    }

    for (const feature of features) {
      switch (feature) {
        case 'mongoose':
          addMongoose({ cwd, baseDir, config: config!, packageManager });
          break;

        case 'eslint':
          // call addESLint function
          break;

        case 'prettier':
          // call addPrettier function
          break;

        default:
          if (feature.startsWith('f-')) {
            checkNodeFramework(config!.framework, feature);
            const featureName = feature.slice(2);
            createFilesForFeature(baseDir, featureName, config!);
          } else {
            console.log(`🔧 Feature "${feature}" not recognized.`);
          }
      }
    }
  });
