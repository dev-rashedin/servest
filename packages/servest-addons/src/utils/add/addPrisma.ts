import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';
import { cyan, green, red, yellow } from '../../../../utils/colors';
import { getInstallCommandForDevDeps, isPackageInstalled } from '../index';
import { addPrismaFiles } from '../prismaHelper';

interface PropsOption {
  cwd: string;
  packageManager: PackageManager;
}

export async function addPrisma({ cwd, packageManager }: PropsOption) {
  // Step 1: Installing Prisma & dev dependencies
  const packages = ['prisma@5.14.0', '@prisma/client@5.14.0'];

  const installCmd = getInstallCommandForDevDeps(packageManager, packages.join(' '));

  if (!isPackageInstalled(cwd, 'prisma')) {
    console.log(cyan('⬇️ Installing Prisma and @prisma/client...'));

    await new Promise<void>((resolve, reject) => {
      const child = spawn(installCmd, { cwd, stdio: 'inherit', shell: true });
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(red(`Installation failed.`))),
      );
      child.on('error', reject);
    });
  } else {
    console.log(yellow('👍 Prisma already installed'));
  }

  // Step 2: Generate initial Prisma setup (schema, .env)
  addPrismaFiles(cwd);

  // Step 3: Adding scripts to package.json
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
