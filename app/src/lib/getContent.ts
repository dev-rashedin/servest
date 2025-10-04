import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import type { ReactNode } from 'react';
import { extractHeadingsFromMdx } from './mdx';
import { MDXComponents } from '@/components/MDXComponent';

interface GetContentResult {
  content: ReactNode;
  headings: { id: string; text: string; level: number }[];
}

async function getContent(endpoint: string, slug: string): Promise<GetContentResult> {
  const filePath = path.join(process.cwd(), `../docs/${endpoint}`, `${slug}.mdx`);
  const source = await fs.readFile(filePath, 'utf-8');

  const headings = extractHeadingsFromMdx(source);

  const { content } = await compileMDX({
    source,
    components: MDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
    },
  });

  return { content: content as unknown as ReactNode, headings };
}

export default getContent;
