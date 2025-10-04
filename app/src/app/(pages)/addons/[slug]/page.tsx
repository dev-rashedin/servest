import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { MDXComponents } from '@/components/MDXComponent';
import RightSidebar from '@/components/RightSidebar';
import { extractHeadingsFromMdx } from '@/lib/mdx';

// ✅ generateStaticParams
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const files = await fs.readdir(path.join(process.cwd(), '../docs/addons'));
  return files.filter((f) => f.endsWith('.mdx')).map((f) => ({ slug: f.replace(/\.mdx$/, '') }));
}

// ✅ Page props type including optional searchParams
interface SlugPageProps {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function AddonPage({ params }: SlugPageProps) {
  const filePath = path.join(process.cwd(), '../docs/addons', `${params.slug}.mdx`);
  const source = await fs.readFile(filePath, 'utf-8');

  const headings = extractHeadingsFromMdx(source);

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

  return (
    <div className="flex gap-8">
      <article className="prose prose-lg flex-1">{content}</article>
      <RightSidebar clientHeadings={headings} />
    </div>
  );
}
