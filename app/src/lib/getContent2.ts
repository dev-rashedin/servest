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
  slugOrder: string[];
  currentSlug: string;
  prevSlug: string | null;
  nextSlug: string | null;
}

async function getAllMdxFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return await getAllMdxFiles(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        return fullPath;
      } else {
        return [];
      }
    }),
  );
  return files.flat();
}

async function getContent(endpoint: string, slug: string): Promise<GetContentResult> {
  // const dir = path.join(process.cwd(), `../docs/${endpoint}`);
  // const files = await fs.readdir(dir);
  const baseDir = path.join(process.cwd(), `../docs/${endpoint}`);
  const allFiles = await getAllMdxFiles(baseDir);

  // const filePath = path.join(dir, `${slug}.mdx`);
  const filePath = path.join(baseDir, `${slug}.mdx`);
  const source = await fs.readFile(filePath, 'utf-8');

  const headings = extractHeadingsFromMdx(source);

  // const defaultOrder = files
  //   .filter((f) => f.endsWith('.mdx') && f !== 'index.mdx')
  //   .map((f) => f.replace(/\.mdx$/, ''));

  // const slugOrder = docsOrder[endpoint]?.filter((s) => !s.startsWith('_')) || defaultOrder;

  const slugOrder = allFiles
    .map((f) => f.replace(baseDir + path.sep, '').replace(/\.mdx$/, ''))
    .sort();

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
