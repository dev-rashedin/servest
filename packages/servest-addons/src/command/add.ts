import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import { cancelOperation } from '../../../utils/cancelOperation';

const filesOrFoldersArray = ['routes', 'models', 'controllers', 'services'];

const existFileMessage = (filePath: string): void => {
  return console.log(`⚠️  File ${filePath} already exists. Skipping...`);
};

const fileCreatedMessage = (feature: string, architecture: string): void => {
  return console.log(`✅ Feature "${feature}" files created based on ${architecture} structure.`);
};

const createFileIfNotExists = (filePath: string, feature: string, architecture: string) => {
  if (fs.existsSync(filePath)) {
    existFileMessage(filePath);
  } else {
    fs.writeFileSync(filePath, '');
    fileCreatedMessage(feature, architecture);
  }
};

// Utility to read servest.config.json
const getServestConfig = (cwd: string): ServestConfig | null => {
  const configPath = path.join(cwd, 'servest.config.json');
  if (!fs.existsSync(configPath)) return null;
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
};

// Utility to create folders/files for f-commands
const createFilesForFeature = (cwd: string, feature: string, config: ServestConfig) => {
  const baseDir = config.srcDir ? path.join(cwd, 'src') : cwd;

  if (config.architecture === 'mvc') {
    filesOrFoldersArray.forEach((folder) => {
      const folderPath = path.join(baseDir, folder);
      if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

      const fileExt = config.language === 'ts' ? 'ts' : 'js';
      const filePath = path.join(folderPath, `${feature}.${folder.slice(0, -1)}.${fileExt}`);

      // checking if file already exists, if not creating it
      createFileIfNotExists(filePath, feature, config.architecture);
    });
  } else if (config.architecture === 'modular') {
    const moduleDir = path.join(baseDir, 'modules', feature);

    // Create module directory if it doesn't exist
    if (!fs.existsSync(moduleDir)) fs.mkdirSync(moduleDir, { recursive: true });

    const fileExt = config.language === 'ts' ? 'ts' : 'js';
    filesOrFoldersArray.forEach((type) => {
      const filePath = path.join(moduleDir, `${feature}.${type}.${fileExt}`);

      // checking if file already exists, if not creating it
      createFileIfNotExists(filePath, feature, config.architecture);
    });
  } else {
    console.log(`⚠️  Basic architecture detected: creating a single file for ${feature}`);
    const fileExt = config.language === 'ts' ? 'ts' : 'js';
    const filePath = path.join(baseDir, `${feature}.${fileExt}`);

    // checking if file already exists, if not creating it
    createFileIfNotExists(filePath, feature, config.architecture);
  }
};

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
      const featureName = feature.slice(2);
      createFilesForFeature(cwd, featureName, config!);
    } else {
      console.log(`🔧 Add-on feature "${feature}" detected for framework ${config!.framework}.`);
      // Here you can implement your logic for addons (mongoose, eslint, prettier, etc.)
      // This can include installing packages or creating starter files.
    }
  });
