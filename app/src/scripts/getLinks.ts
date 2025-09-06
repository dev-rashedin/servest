// scripts/getAddonLinks.ts
import fs from 'fs';
import path from 'path';

export function getAddonLinks() {
  const dir = path.join(process.cwd(), '../docs/addons');
  const files = fs.readdirSync(dir);
  return files
    .filter((f) => f.endsWith('.mdx') && f !== 'index.mdx')
    .map((f) => ({ slug: f.replace(/\.mdx$/, ''), label: f[0].toUpperCase() + f.slice(1) }));
}
