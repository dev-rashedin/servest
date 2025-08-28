import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';
import { cyan, green, red, yellow } from '../../../utils/colors';
import { checkNodeFramework, getInstallCommand, isESModule, isPackageInstalled } from './index';

const tsEslintConfig = `import { Linter } from "eslint";

const config: Linter.Config = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "prettier/prettier": "warn",
  },
};

export default config;
`;

const esmEslintConfig = `export default {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {},
};
`;

const cjsEslintConfig = `module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "script",
  },
  rules: {},
};
`;

export async function addESLint({ cwd, baseDir, config, packageManager }: PropsOption) {
  const isTypeScript = config.language === 'ts';
  const isESM = isESModule(cwd);

  // --- Framework check ---
  checkNodeFramework(config.framework, 'eslint');

  // --- Install dependencies ---
  const packages = ['eslint', 'eslint-config-prettier', 'eslint-plugin-prettier'];
  if (isTypeScript) packages.push('@typescript-eslint/eslint-plugin', '@typescript-eslint/parser');

  const installCmd = getInstallCommand(packageManager, packages.join(' '));

  // Check if eslint already installed
  if (isPackageInstalled(cwd, 'eslint')) {
    console.log(yellow('⚠️ ESLint already installed'));
  } else {
    console.log(cyan('⬇️ Installing ESLint and recommended plugins...'));
    await new Promise<void>((resolve, reject) => {
      const child = spawn(installCmd, { cwd, stdio: 'inherit', shell: true });
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(red(`Installation failed with code ${code}`))),
      );
      child.on('error', reject);
    });
  }

  // --- Create ESLint config file ---
  const configFileName = isTypeScript
    ? 'eslint.config.ts'
    : isESM
      ? 'eslint.config.js'
      : 'eslint.config.cjs';

  const configPath = path.join(baseDir, configFileName);

  if (!fs.existsSync(configPath)) {
    const content = isTypeScript ? tsEslintConfig : isESM ? esmEslintConfig : cjsEslintConfig;

    fs.writeFileSync(configPath, content, 'utf-8');
    console.log(green(`✅ ESLint config created at ${configFileName}`));
  } else {
    console.log(yellow(`⚠️ ESLint config already exists at ${configFileName}`));
  }

  console.log(green('🎉 ESLint setup completed!'));
}
