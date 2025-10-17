import fs from 'fs';
import path from 'path';
import { docsOrder, nestedDocsOrder } from '@/data';

export function getContentLinks(endpoint: string) {
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
      label: slug
        .split('-')
        .map((word) =>
          word.toLowerCase() === 'cli' ? 'CLI' : word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join(' '),
    };
  });
}

export function getNestedLinks(): NestedLink[] {
  const categories = nestedDocsOrder.templates || [];

  return categories.map((cat) => ({
    type: 'category',
    label: cat.label,
    items: cat.items.map((slug) => ({
      type: 'link',
      label: slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      slug,
    })),
  }));
}
