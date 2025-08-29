import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';
import { cyan, green, red, yellow } from '../../../../utils/colors';
import { getInstallCommand, getInstallCommandForDevDeps, isPackageInstalled } from '../index';

const schemaContent = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`;

export async function addPrisma({ cwd, packageManager }: ICwdAndPkgManager) {
  // Step 1: Installing Prisma & dev dependencies
  const devPackages = ['prisma@6.15.0'];
  const runtimePackages = ['@prisma/client@6.15.0'];

  const installDevCmd = getInstallCommandForDevDeps(packageManager, devPackages.join(' '));
  const installRuntimeCmd = getInstallCommand(packageManager, runtimePackages.join(' '));

  // Step 1: Install Prisma CLI (dev dependency)
  if (!isPackageInstalled(cwd, 'prisma')) {
    console.log(cyan('⬇️ Installing Prisma CLI as dev dependency...'));
    await new Promise<void>((resolve, reject) => {
      const child = spawn(installDevCmd, { cwd, stdio: 'inherit', shell: true });
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(red(`Installation failed.`))),
      );
      child.on('error', reject);
    });
  } else {
    console.log(yellow('👍 Prisma CLI already installed'));
  }

  // Step 2: Install @prisma/client (runtime dependency)
  if (!isPackageInstalled(cwd, '@prisma/client')) {
    console.log(cyan('⬇️ Installing @prisma/client as runtime dependency...'));
    await new Promise<void>((resolve, reject) => {
      const child = spawn(installRuntimeCmd, { cwd, stdio: 'inherit', shell: true });
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(red(`Installation failed.`))),
      );
      child.on('error', reject);
    });
  } else {
    console.log(yellow('👍 @prisma/client already installed'));
  }

  // Step 2: Create Prisma schema & .env files if they don't exist
  const prismaDir = path.join(cwd, 'prisma');
  if (!fs.existsSync(prismaDir)) {
    fs.mkdirSync(prismaDir);
  }

  const schemaPath = path.join(prismaDir, 'schema.prisma');
  if (!fs.existsSync(schemaPath)) {
    fs.writeFileSync(schemaPath, schemaContent.trim(), 'utf-8');
    console.log(green('✅ Created prisma/schema.prisma'));
  } else {
    console.log(yellow('⚠️ prisma/schema.prisma already exists'));
  }

  const envPath = path.join(cwd, '.env');
  if (!fs.existsSync(envPath)) {
    const envContent = 'DATABASE_URL="postgresql://user:password@localhost:5432/dbname"';
    fs.writeFileSync(envPath, envContent, 'utf-8');
    console.log(green('✅ Created .env for Prisma'));
  } else {
    console.log(yellow('⚠️ .env already exists'));
  }

  // Step 3: Add scripts to package.json
  const pkgPath = path.join(cwd, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.scripts = pkg.scripts || {};

    if (!pkg.scripts['prisma:generate']) {
      pkg.scripts['prisma:generate'] = 'prisma generate';
    }
    if (!pkg.scripts['prisma:migrate']) {
      pkg.scripts['prisma:migrate'] = 'prisma migrate dev';
    }

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');
    console.log(green('✅ Added Prisma scripts to package.json'));
  }

  console.log(green('🎉 Prisma setup completed!'));
}
