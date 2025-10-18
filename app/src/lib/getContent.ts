import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { extractHeadingsFromMdx } from './mdx';
import { MDXComponents } from '@/components/MDXComponent';
import { docsOrder, nestedDocsOrder } from '@/data';

async function getContent(endpoint: string, slug: string) {
  const baseDir = path.join(process.cwd(), `../docs/${endpoint}`);
  const slugParts = slug.split('/').filter(Boolean); // e.g. ['express','express-basic-js']
  const filePath = path.join(baseDir, ...slugParts) + '.mdx';
  const source = await fs.readFile(filePath, 'utf-8');

  const headings = extractHeadingsFromMdx(source);

  // --------------- NEW ORDER/prev/next LOGIC -----------------
  // Helper: flatten docsOrder (strings only)
  const flattenDocsOrder = (order: any[] = []) =>
    order.flatMap((item) =>
      typeof item === 'string' ? [item] : Array.isArray(item.items) ? item.items : [],
    );

  let slugOrder: string[] = [];
  const currentSlugKey = slugParts.at(-1)!; // the file name part, e.g. 'express-basic-js'
  let prevSlug: string | null = null;
  let nextSlug: string | null = null;
  let prevHref: string | null = null;
  let nextHref: string | null = null;

  if (slugParts.length > 1) {
    // Nested case: using nestedDocsOrder for the category (parent)
    const parent = slugParts[0]; // e.g. 'express'

    const category = (nestedDocsOrder.templates || []).find(
      (c) => c.label.toLowerCase() === parent.toLowerCase(),
    );

    if (category) {
      slugOrder = category.items; // e.g. ['express-basic-js','express-basic-ts']
      const idx = slugOrder.indexOf(currentSlugKey);
      if (idx !== -1) {
        prevSlug = idx > 0 ? slugOrder[idx - 1] : null;
        nextSlug = idx < slugOrder.length - 1 ? slugOrder[idx + 1] : null;
      } else {
        // not found — fallback to category items (first/last)
        prevSlug = null;
        nextSlug = slugOrder.length ? slugOrder[0] : null;
      }

      // build hrefs including parent folder
      prevHref = prevSlug ? `/${endpoint}/${parent}/${prevSlug}` : null;
      nextHref = nextSlug ? `/${endpoint}/${parent}/${nextSlug}` : null;
    } else {
      // Category missing — fallback to filesystem order within that folder
      const dirToRead = path.join(baseDir, parent);
      const files = (await fs.readdir(dirToRead)).filter(
        (f) => f.endsWith('.mdx') && f !== 'index.mdx',
      );
      const fileSlugs = files.map((f) => f.replace(/\.mdx$/, '').toLowerCase());
      const idx = fileSlugs.indexOf(currentSlugKey);
      prevSlug = idx > 0 ? fileSlugs[idx - 1] : null;
      nextSlug = idx < fileSlugs.length - 1 ? fileSlugs[idx + 1] : null;
      prevHref = prevSlug ? `/${endpoint}/${parent}/${prevSlug}` : null;
      nextHref = nextSlug ? `/${endpoint}/${parent}/${nextSlug}` : null;
    }
  } else {
    // Top-level case: using docsOrder (flattened) OR filesystem default
    const defaultDirFiles = (await fs.readdir(baseDir))
      .filter((f) => f.endsWith('.mdx') && f !== 'index.mdx')
      .map((f) => f.replace(/\.mdx$/, ''));

    const orderFromConfig = docsOrder[endpoint]
      ? flattenDocsOrder(docsOrder[endpoint]).filter((s) => !s.startsWith('_'))
      : null;
    slugOrder = orderFromConfig && orderFromConfig.length ? orderFromConfig : defaultDirFiles;

    const idx = slugOrder.indexOf(currentSlugKey);
    prevSlug = idx > 0 ? slugOrder[idx - 1] : null;

    nextSlug = idx < slugOrder.length - 1 ? slugOrder[idx + 1] : null;
    // building hrefs (top-level pages)
    prevHref = prevSlug ? `/${endpoint}/${prevSlug === 'index' ? '' : prevSlug}` : null;
    nextHref = nextSlug ? `/${endpoint}/${nextSlug === 'index' ? '' : nextSlug}` : null;
  }

  // --------------- END ORDER/prev/next LOGIC -----------------

  const { content } = await compileMDX({
    source,
    components: MDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
    },
  });

  return {
    content: content as unknown,
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
