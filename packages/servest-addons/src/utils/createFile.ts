import fs from 'fs';
import path from 'path';
import { green, yellow } from '../../../utils/colors';

export const filesOrFoldersArray = ['routes', 'models', 'controllers', 'services'];

// Utility to read servest.config.json
export const getIServestConfig = (cwd: string): IServestConfig | null => {
  const configPath = path.join(cwd, 'servest.config.json');
  if (!fs.existsSync(configPath)) return null;
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
};

// Utility to create folders/files for f-commands
export const createFilesForFeature = (baseDir: string, feature: string, config: IServestConfig) => {
  let filesCreated = false;
  let filesExist = false;

  const checkAndCreateFile = (filePath: string) => {
    if (fs.existsSync(filePath)) {
      filesExist = true;
      return false;
    }
    fs.writeFileSync(filePath, '');
    filesCreated = true;
    return true;
  };

  if (config.architecture === 'mvc') {
    filesOrFoldersArray.forEach((folder) => {
      const folderPath = path.join(baseDir, folder);
      if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

      const fileExt = config.language === 'ts' ? 'ts' : 'js';
      const filePath = path.join(folderPath, `${feature}.${folder.slice(0, -1)}.${fileExt}`);

      checkAndCreateFile(filePath);
    });
  } else if (config.architecture === 'modular') {
    const moduleDir = path.join(baseDir, 'modules', feature);
    if (!fs.existsSync(moduleDir)) fs.mkdirSync(moduleDir, { recursive: true });

    const fileExt = config.language === 'ts' ? 'ts' : 'js';
    filesOrFoldersArray.forEach((type) => {
      const filePath = path.join(moduleDir, `${feature}.${type.slice(0, -1)}.${fileExt}`);
      checkAndCreateFile(filePath);
    });
  } else {
    const fileExt = config.language === 'ts' ? 'ts' : 'js';
    const filePath = path.join(baseDir, `${feature}.${fileExt}`);
    checkAndCreateFile(filePath);
  }

  // Showing file creation or existence message
  if (filesCreated)
    console.info(
      green(`✅ Feature "${feature}" files created based on ${config.architecture} structure.`),
    );
  if (filesExist)
    console.log(yellow(`👍  Some files for "${feature}" already existed. Skipped them.`));
};
