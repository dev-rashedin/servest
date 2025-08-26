import fs from 'fs';

export const filesOrFoldersArray = ['routes', 'models', 'controllers', 'services'];

const existFileMessage = (filePath: string): void => {
  return console.log(`⚠️  File ${filePath} already exists. Skipping...`);
};

const fileCreatedMessage = (feature: string, architecture: string): void => {
  return console.log(`✅ Feature "${feature}" files created based on ${architecture} structure.`);
};

export const createFileIfNotExists = (filePath: string, feature: string, architecture: string) => {
  if (fs.existsSync(filePath)) {
    existFileMessage(filePath);
  } else {
    fs.writeFileSync(filePath, '');
    fileCreatedMessage(feature, architecture);
  }
};
