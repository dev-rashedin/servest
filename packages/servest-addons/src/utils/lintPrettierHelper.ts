import fs from 'fs';
import path from 'path';
import { green, yellow } from '../../../utils/colors';
import { cjsEslintConfig, esmEslintConfig, tsEslintConfig } from './lintPrettierConstants';
import { isESModule } from './index';

export const addESLintConfig = (cwd: string, isTypeScript: boolean) => {
  const isESM = isESModule(cwd);

  const configFileName = isTypeScript || isESM ? 'eslint.config.mjs' : 'eslint.config.cjs';

  const configPath = path.join(cwd, configFileName);

  if (!fs.existsSync(configPath)) {
    const content = isTypeScript ? tsEslintConfig : isESM ? esmEslintConfig : cjsEslintConfig;

    fs.writeFileSync(configPath, content, 'utf-8');
    console.log(green(`✅ ESLint config created.}`));
  } else {
    console.log(yellow(`👍 ESLint config already exists.`));
  }
};
