import fs from 'node:fs';
import path from 'node:path';
import type { IAspNetOptions } from '../types';

export function applyTestingFeature(root: string, appName: string, options: IAspNetOptions): void {
  const { testing, architecture } = options;

  if (architecture === 'enterprise') {
    handleEnterpriseTests(root, appName, testing);
  }
}

function handleEnterpriseTests(root: string, appName: string, testing: string): void {
  const testsDir = path.join(root, 'tests');
  const slnFiles = fs.readdirSync(root).filter((f) => f.endsWith('.sln'));
  const slnPath = slnFiles.length > 0 ? path.join(root, slnFiles[0]) : null;

  if (testing === 'none') {
    // 1. Remove tests directory
    if (fs.existsSync(testsDir)) {
      fs.rmSync(testsDir, { recursive: true, force: true });
    }

    // 2. Remove test references from .sln
    if (slnPath && fs.existsSync(slnPath)) {
      let slnContent = fs.readFileSync(slnPath, 'utf-8');
      slnContent = removeProjectFromSln(slnContent, `${appName}.UnitTests`);
      slnContent = removeProjectFromSln(slnContent, `${appName}.IntegrationTests`);
      fs.writeFileSync(slnPath, slnContent, 'utf-8');
    }
  } else if (testing === 'unit') {
    // Keep UnitTests, remove IntegrationTests
    const integrationDir = path.join(testsDir, `${appName}.IntegrationTests`);
    if (fs.existsSync(integrationDir)) {
      fs.rmSync(integrationDir, { recursive: true, force: true });
    }

    if (slnPath && fs.existsSync(slnPath)) {
      let slnContent = fs.readFileSync(slnPath, 'utf-8');
      slnContent = removeProjectFromSln(slnContent, `${appName}.IntegrationTests`);
      fs.writeFileSync(slnPath, slnContent, 'utf-8');
    }
  }
}

function removeProjectFromSln(slnContent: string, projectName: string): string {
  // Regex to match Project block
  const projectRegex = new RegExp(
    `Project\\("[^"]*"\\) = "${projectName}", "[^"]*", "{([^}]*)}"\\r?\\nEndProject\\r?\\n?`,
    'g',
  );

  let guid = '';
  const match = projectRegex.exec(slnContent);
  if (match && match[1]) {
    guid = match[1];
  }

  // Remove Project definition block
  slnContent = slnContent.replace(projectRegex, '');

  // Remove project configuration platforms if guid was found
  if (guid) {
    const guidRegex = new RegExp(`\\s*\\{${guid}\\}\\.[^\\r\\n]*\\r?\\n?`, 'gi');
    slnContent = slnContent.replace(guidRegex, '');
  }

  return slnContent;
}
