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
  const dir = path.join(process.cwd(), `../docs/${endpoint}`);
  const files = await fs.readdir(dir);

  const filePath = path.join(dir, `${slug}.mdx`);
  const source = await fs.readFile(filePath, 'utf-8');

  const headings = extractHeadingsFromMdx(source);

  const defaultOrder = files
    .filter((f) => f.endsWith('.mdx') && f !== 'index.mdx')
    .map((f) => f.replace(/\.mdx$/, ''));

  const slugOrder = docsOrder[endpoint] || defaultOrder;

  const currentIndex = slugOrder.indexOf(slug);

  const prevSlug = currentIndex > 0 ? slugOrder[currentIndex - 1] : null;
  const nextSlug = currentIndex < slugOrder.length - 1 ? slugOrder[currentIndex + 1] : null;

  const { content } = await compileMDX({
    source,
    components: MDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
    },
  });

  return {
    content: content as unknown as ReactNode,
    headings,
    slugOrder,
    currentSlug: slug,
    prevSlug,
    nextSlug,
  };
}

export default getContent;
