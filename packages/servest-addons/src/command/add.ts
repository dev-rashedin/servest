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

    const featureMap: Record<string, () => Promise<void>> = {
      mongoose: async () => addMongoose({ cwd, baseDir, config: config!, packageManager }),
      // eslint: async () => addESLint({ baseDir, packageManager }),
      // prettier: async () => addPrettier({ baseDir, packageManager }),
    };

    const commandRun = async () => {
      for (const feature of features) {
        try {
          if (feature.startsWith('f-')) {
            checkNodeFramework(config!.framework, feature);
            const featureName = feature.slice(2);
            await createFilesForFeature(baseDir, featureName, config!);
          } else if (featureMap[feature]) {
            await featureMap[feature]();
          } else {
            console.log(`🔧 Feature "${feature}" not recognized.`);
          }
        } catch (err) {
          console.error(`❌ Failed to process "${feature}":`, err);
          // Continue with next feature
        }
      }
    };

    commandRun().catch((err) => {
      console.error('❌ An unexpected error occurred:', err);
    });
  });
