import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';
import { cyan, green, red, yellow } from '../../../../utils/colors';
import { getInstallCommand, isPackageInstalled } from '../index';

const dbContent = `import { drizzle } from 'drizzle-orm/sqlite-js';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./dev.db');
export const client = drizzle(db);`;

const schemaContent = `import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { client } from './../../../dist/index';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
});`;

export async function addDrizzle({
  cwd,
  packageManager,
  language,
}: ICwdAndPkgManager & { language: string }) {
  const isTypeScript = language === 'ts';
  const schemaFileName = isTypeScript ? 'schema.ts' : 'schema.js';
  const clientFileName = isTypeScript ? 'client.ts' : 'client.js';

  // Step 1: Install Drizzle ORM packages
  const packages = ['drizzle-orm', 'sqlite3']; // You can change sqlite3 to pg for PostgreSQL

  const installCmd = getInstallCommand(packageManager, packages.join(' '));

  if (!isPackageInstalled(cwd, 'drizzle-orm')) {
    console.log(cyan('⬇️ Installing Drizzle ORM and SQLite...'));

    await new Promise<void>((resolve, reject) => {
      const child = spawn(installCmd, { cwd, stdio: 'inherit', shell: true });
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(red(`Installation failed.`))),
      );
      child.on('error', reject);
    });
  } else {
    console.log(yellow('👍 Drizzle ORM already installed'));
  }

  // Step 2: Create Drizzle folder and files
  const drizzleDir = path.join(cwd, 'src', 'db');
  if (!fs.existsSync(drizzleDir)) fs.mkdirSync(drizzleDir, { recursive: true });

  // Basic Drizzle client file
  const dbFile = path.join(drizzleDir, clientFileName);
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, dbContent, 'utf-8');
    console.log(green(`✅ Drizzle client created at src/db/client.ts`));
  }

  // Optional: Basic table schema example
  const schemaFile = path.join(drizzleDir, schemaFileName);
  if (!fs.existsSync(schemaFile)) {
    fs.writeFileSync(schemaFile, schemaContent, 'utf-8');
    console.log(green(`✅ Drizzle schema created at src/db/schema.ts`));
  }

  // Step 3: Add scripts to package.json
  const pkgPath = path.join(cwd, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.scripts = pkg.scripts || {};

    if (!pkg.scripts['drizzle:generate']) {
      pkg.scripts['drizzle:generate'] = 'drizzle-kit generate';
    }

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');
    console.log(green(`✅ Added Drizzle scripts to package.json.`));
  }

  console.log(green('🎉 Drizzle setup completed!'));
}
