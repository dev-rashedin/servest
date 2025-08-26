import fs from 'fs';
import path from 'path';
import { Command } from 'commander';

interface ServestConfig {
  framework: string;
  language: 'ts' | 'js' | 'py' | 'php';
  architecture: 'mvc' | 'modular' | 'basic';
  srcDir: boolean;
  createdAt: string;
}

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
    ['routes', 'controllers', 'services', 'models'].forEach((folder) => {
      const folderPath = path.join(baseDir, folder);
      if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
      const fileExt = config.language === 'ts' ? 'ts' : 'js';
      const filePath = path.join(folderPath, `${feature}.${folder.slice(0, -1)}.${fileExt}`);
      if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '');
    });
  } else if (config.architecture === 'modular') {
    const moduleDir = path.join(baseDir, 'modules', feature);
    if (!fs.existsSync(moduleDir)) fs.mkdirSync(moduleDir, { recursive: true });
    const fileExt = config.language === 'ts' ? 'ts' : 'js';
    ['interface', 'model', 'controller', 'service'].forEach((type) => {
      const filePath = path.join(moduleDir, `${feature}.${type}.${fileExt}`);
      if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '');
    });
  } else {
    console.log(`⚠️  Basic architecture detected: creating a single file for ${feature}`);
    const fileExt = config.language === 'ts' ? 'ts' : 'js';
    const filePath = path.join(baseDir, `${feature}.${fileExt}`);
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '');
  }

  console.log(`✅ Feature "${feature}" files created based on ${config.architecture} structure.`);
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
      console.error(
        '❌ servest.config.json not found. Please run "npx servest@latest init" first.',
      );
      process.exit(1);
    }

    if (feature.startsWith('f-')) {
      const featureName = feature.slice(2); // remove "f-"
      createFilesForFeature(cwd, featureName, config);
    } else {
      console.log(`🔧 Add-on feature "${feature}" detected for framework ${config.framework}.`);
      // Here you can implement your logic for addons (mongoose, eslint, prettier, etc.)
      // This can include installing packages or creating starter files.
    }
  });
