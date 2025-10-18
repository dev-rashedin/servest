import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { extractHeadingsFromMdx } from './mdx';
import { MDXComponents } from '@/components/MDXComponent';
import { docsOrder, nestedDocsOrder } from '@/data';

/**
 * Combine docsOrder and nestedDocsOrder into a unified flattened order list
 */
function flattenDocsOrder(endpoint: string): string[] {
  const topLevel = docsOrder[endpoint] || [];
  const nested = nestedDocsOrder[endpoint] || [];
  const flattened: string[] = [];

  for (const item of topLevel) {
    if (typeof item === 'string') {
      // regular page slug
      flattened.push(item);
    }
  }

  // append all nested template items (from nestedDocsOrder)
  for (const group of nested) {
    flattened.push(...group.items);
  }

  return flattened.filter((s) => !s.startsWith('_')); // remove section titles like _Reference
}

/**
 * Read, compile, and return a doc's content + navigation data
 */
async function getContent(endpoint: string, slug: string) {
  const baseDir = path.join(process.cwd(), `../docs/${endpoint}`);
  const slugParts = slug.split('/').filter(Boolean); // e.g. ['templates','express-basic-js']
  const filePath = path.join(baseDir, ...slugParts) + '.mdx';
  const source = await fs.readFile(filePath, 'utf-8');

  const headings = extractHeadingsFromMdx(source);
  const currentSlugKey = slugParts.at(-1)!;

  // unified flattened order (top-level + nested)
  const slugOrder = flattenDocsOrder(endpoint);

  // find prev/next slugs
  const idx = slugOrder.indexOf(currentSlugKey);
  const prevSlug = idx > 0 ? slugOrder[idx - 1] : null;
  const nextSlug = idx < slugOrder.length - 1 ? slugOrder[idx + 1] : null;

  // determine hrefs (preserve parent if nested)
  const parent = slugParts.length > 1 ? slugParts[0] : null;
  const prevHref = prevSlug ? `/${endpoint}/${parent ? `${parent}/` : ''}${prevSlug}` : null;
  const nextHref = nextSlug ? `/${endpoint}/${parent ? `${parent}/` : ''}${nextSlug}` : null;

  // compile MDX to React content
  const { content } = await compileMDX({
    source,
    components: MDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
    },
  });

  return {
    content: content as React.ReactNode,
    headings,
    slugOrder,
    currentSlug: slug,
    prevSlug,
    nextSlug,
    prevHref,
    nextHref,
  };
}

export default getContent;
