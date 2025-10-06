import fs from 'fs';
import path from 'path';
import { docsOrder } from '@/data';

function getContentLinks(endpoint: string) {
  const dir = path.join(process.cwd(), `../docs/${endpoint}`);
  const files = fs.readdirSync(dir);

  const defaultOrder = files.filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));

  const slugOrder = docsOrder[endpoint] || defaultOrder;

  return slugOrder.map((slug) => {
    if (slug.startsWith('_')) {
      return { type: 'group' as const, label: slug.slice(1) };
    }
    return {
      type: 'link' as const,
      slug,
      label: slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
    };
  });
}

export default getContentLinks;
