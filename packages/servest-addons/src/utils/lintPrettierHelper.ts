import fs from 'fs';
import path from 'path';
import { green, yellow } from '../../../utils/colors';
import {
  cjsEslintConfig,
  cjsEslintConfigWithPrettier,
  esmEslintConfig,
  esmEslintConfigWithPrettier,
  prettierConfig,
  prettierIgnoreFile,
  tsEslintConfig,
  tsEslintConfigWithPrettier,
} from './lintPrettierConstants';
import { isESModule } from './index';

export const addESLintConfig = (cwd: string, isTypeScript: boolean, type: string) => {
  const isESM = isESModule(cwd);

  const configFileName = isTypeScript || isESM ? 'eslint.config.esm' : 'eslint.config.cjs';

  const configPath = path.join(cwd, configFileName);
  let content;

  if (!fs.existsSync(configPath)) {
    if (type === 'eslint') {
      content = isTypeScript ? tsEslintConfig : isESM ? esmEslintConfig : cjsEslintConfig;
    } else {
      content = isTypeScript
        ? tsEslintConfigWithPrettier
        : isESM
          ? esmEslintConfigWithPrettier
          : cjsEslintConfigWithPrettier;
    }

    fs.writeFileSync(configPath, content as string, 'utf-8');
    console.log(green(`✅ ESLint config created.`));
  } else {
    console.log(yellow(`👍 ESLint config already exists.`));
  }
};

export const addPrettierConfig = (cwd: string) => {
  const prettierrcPath = path.join(cwd, '.prettierrc.json');
  const prettierignorePath = path.join(cwd, '.prettierignore');

  if (!fs.existsSync(prettierrcPath)) {
    fs.writeFileSync(prettierrcPath, JSON.stringify(prettierConfig, null, 2));
    console.log(green('✅ Created .prettierrc.json.'));
  } else {
    console.log(yellow('👍 .prettierrc.json already exists.'));
  }

  if (!fs.existsSync(prettierignorePath)) {
    fs.writeFileSync(prettierignorePath, prettierIgnoreFile, 'utf-8');
    console.log(green('✅ Created .prettierignore.'));
  } else {
    console.log(yellow('⚠️ .prettierignore already exists.'));
  }
};
