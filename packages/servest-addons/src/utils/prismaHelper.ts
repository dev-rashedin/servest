import fs from 'fs';
import path from 'path';

export const addPrismaFiles = (cwd: string): void => {
  const schemaPath = path.join(cwd, 'schema.prisma');
  const envPath = path.join(cwd, '.env');

  fs.writeFileSync(schemaPath, '');
  fs.writeFileSync(envPath, '');
};
