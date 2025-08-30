import { Command } from 'commander';
import { cancelOperation, detectPkgManager } from '../../../utils/sharedUtility';
import { createFilesForFeature, getIServestConfig } from '../utils/createFile';
import { checkNodeFramework, getBaseDir } from '../utils';
import { addMongoose } from '../utils/add/addMongoose';
import { addESLint } from '../utils/add/addESLint';
import { addPrettier } from '../utils/add/addPrettier';
import { addESLintPrettier } from '../utils/add/addESLintPrettier';
import { addPrisma } from '../utils/add/addPrisma';
import { red } from '../../../utils/colors';
import { addDrizzle } from '../utils/add/addDrizzle';
import { addLintStage } from '../utils/add/addLintStage';

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

    const propsObject = {
      cwd,
      config: config!,
      packageManager,
    };

    const featureMap: Record<string, () => Promise<void>> = {
      mongoose: async () => addMongoose({ cwd, baseDir, config: config!, packageManager }),
      eslint: async () => addESLint(propsObject),
      prettier: async () => addPrettier(propsObject),
      'eslint-prettier': async () => addESLintPrettier({ cwd, config: config!, packageManager }),
      prisma: async () => addPrisma(propsObject),
      drizzle: async () => addDrizzle(propsObject),
      'lint-staged': async () => addLintStage(propsObject),
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
            console.log(red(`🚩 Feature "${feature}" not recognized.`));
          }
        } catch (err) {
          console.error(red(`🚨 Failed to process "${feature}": ${err}`));
          // Continue with next feature
        }
      }
    };

    commandRun().catch((err) => {
      console.error(red(`🚨 An unexpected error occurred: ${err}`));
    });
  });
