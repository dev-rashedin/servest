// app/(pages)/addons/[slug]/page.tsx
import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { MDXComponents } from '@/components/MDXComponent';
import RightSidebar from '@/components/RightSidebar';
import { extractHeadingsFromMdx, readMdxSource } from '@/lib/mdx';

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), '../docs/addons');
  const files = await fs.readdir(dir);
  return files.filter((f) => f.endsWith('.mdx')).map((f) => ({ slug: f.replace(/\.mdx$/, '') }));
}

export default async function AddonPage({ params }: { params: { slug: string } }) {
  const source = await readMdxSource('addons', params.slug);

  // build-time extract headings (ids will match rehype-slug)
  const headings = extractHeadingsFromMdx(source);

  const { content } = await compileMDX({
    source,
    components: MDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug], // ensures rendered headings have id attributes
      },
    },
  });

  return (
    <div className="flex gap-8">
      <article className="prose prose-lg max-w-none flex-1">{content}</article>

      {/* pass precomputed headings to client RightSidebar */}
      <RightSidebar clientHeadings={headings} />
    </div>
  );
}
