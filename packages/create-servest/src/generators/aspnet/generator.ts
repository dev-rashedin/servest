import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyDir, toPascalCase, updateDotnetProject } from '../../utils/helper';
import { applyAuthFeature } from './features/auth';
import { applyAuthorizationFeature } from './features/authorization';
import { applyDatabaseFeature } from './features/database';
import { applyDockerFeature } from './features/docker';
import { applyExampleFeature } from './features/example';
import { applyGitFeature } from './features/git';
import { applyTestingFeature } from './features/testing';
import type { IAspNetOptions } from './types';
import { validateAspNetOptions } from './validator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateAspNetProject(options: IAspNetOptions): {
  success: boolean;
  message?: string;
} {
  // 1. Validation
  const validation = validateAspNetOptions(options);
  if (!validation.valid) {
    throw new Error(
      `Invalid ASP.NET options:\n${validation.errors.map((e) => `  - ${e}`).join('\n')}`,
    );
  }

  // 2. Dry run check
  if (options.dryRun) {
    return {
      success: true,
      message: 'Dry run completed successfully. No files written.',
    };
  }

  const appName = toPascalCase(options.projectName);

  // 3. Locate template
  const templateMap: Record<string, string> = {
    enterprise: 'aspnet-enterprise-architecture',
    mvc: 'aspnet-mvc',
    'minimal-api': 'aspnet-minimal-api',
  };

  const templateName = templateMap[options.architecture] || 'aspnet-enterprise-architecture';
  let templateDir = path.resolve(__dirname, '../templates/aspnet', templateName);
  if (!fs.existsSync(templateDir)) {
    templateDir = path.resolve(__dirname, '../../../templates/aspnet', templateName);
  }

  if (!fs.existsSync(templateDir)) {
    throw new Error(`Template directory not found: ${templateDir}`);
  }

  fs.mkdirSync(options.root, { recursive: true });

  // 4. Copy template files
  copyDir(templateDir, options.root);

  // 5. Core PascalCase & TargetFramework update
  updateDotnetProject(options.root, options.projectName);

  // 6. Apply composable features
  applyDatabaseFeature(options.root, appName, options);
  applyAuthFeature(options.root, appName, options);
  applyAuthorizationFeature(options.root, appName, options);
  applyTestingFeature(options.root, appName, options);
  applyDockerFeature(options.root, appName, options);
  applyExampleFeature(options.root, appName, options);
  applyGitFeature(options.root, options.git);

  return { success: true };
}
