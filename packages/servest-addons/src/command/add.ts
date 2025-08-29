import { Command } from 'commander';
import { cancelOperation, detectPkgManager } from '../../../utils/sharedUtility';
import { createFilesForFeature, getIServestConfig } from '../utils/createFile';
import { checkNodeFramework, getBaseDir } from '../utils';
import { addMongoose } from '../utils/add/addMongoose';
import { addESLint } from '../utils/add/addESLint';
import { addPrettier } from '../utils/add/addPrettier';
import { addESLintPrettier } from '../utils/add/addESLintPrettier';
import { addPrisma } from '../utils/add/addPrisma';

const packageManager = detectPkgManager();

// Main add command
export const add = new Command()
  .name('add')
  .description('Add features or generate files/folders for your project')
  .argument('<features...>', 'Feature names or f-commands (e.g., mongoose, f-users)')
  .action((features: string[]) => {
    const cwd = process.cwd();
    const config = getIServestConfig(cwd);
    const baseDir = getBaseDir(cwd);

    if (!config) {
      cancelOperation('servest.config.json not found. Please run "npx servest@latest init" first.');
    }

    const featureMap: Record<string, () => Promise<void>> = {
      mongoose: async () => addMongoose({ cwd, baseDir, config: config!, packageManager }),
      eslint: async () => addESLint({ cwd, config: config!, packageManager }),
      prettier: async () => addPrettier({ cwd, packageManager }),
      'eslint-prettier': async () => addESLintPrettier({ cwd, config: config!, packageManager }),
      prisma: async () => addPrisma({ cwd, packageManager }),
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
