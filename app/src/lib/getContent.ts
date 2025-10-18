import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import type { ReactNode } from 'react';
import { extractHeadingsFromMdx } from './mdx';
import { MDXComponents } from '@/components/MDXComponent';
import { docsOrder } from '@/data';

interface GetContentResult {
  content: ReactNode;
  headings: { id: string; text: string; level: number }[];
  slugOrder: string[];
  currentSlug: string;
  prevSlug: string | null;
  nextSlug: string | null;
}

async function getContent(endpoint: string, slug: string): Promise<GetContentResult> {
  const baseDir = path.join(process.cwd(), `../docs/${endpoint}`);

  // Converting "express/express-basic-js" → ["express", "express-basic-js"]
  const slugParts = slug.split('/').filter(Boolean);

  // Build correct path for nested files
  const filePath = path.join(baseDir, ...slugParts) + '.mdx';

  //  Readind MDX file
  const source = await fs.readFile(filePath, 'utf-8');

  const headings = extractHeadingsFromMdx(source);

  const dirToRead = slugParts.length > 1 ? path.join(baseDir, slugParts[0]) : baseDir;

  const files = await fs.readdir(dirToRead);

  const defaultOrder = files
    .filter((f) => f.endsWith('.mdx') && f !== 'index.mdx')
    .map((f) => f.replace(/\.mdx$/, ''));

  const slugOrder = docsOrder[endpoint]?.filter((s) => !s.startsWith('_')) || defaultOrder;

  const currentIndex = slugOrder.indexOf(slugParts.at(-1)!);

  const prevSlug = currentIndex > 0 ? slugOrder[currentIndex - 1] : null;
  const nextSlug = currentIndex < slugOrder.length - 1 ? slugOrder[currentIndex + 1] : null;

  const { content } = await compileMDX({
    source,
    components: MDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  return {
    content: content as unknown as React.ReactNode,
    headings,
    slugOrder,
    currentSlug: slug,
    prevSlug,
    nextSlug,
  };
}

export default getContent;
