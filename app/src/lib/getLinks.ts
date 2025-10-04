import fs from 'fs';
import path from 'path';

function getContentLinks(endPoint: string) {
  const dir = path.join(process.cwd(), `../docs/${endPoint}`);
  const files = fs.readdirSync(dir);
  return files
    .filter((f) => f.endsWith('.mdx') && f !== 'index.mdx')
    .map((f) => ({ slug: f.replace(/\.mdx$/, ''), label: f[0].toUpperCase() + f.slice(1) }));
}

export default getContentLinks;
