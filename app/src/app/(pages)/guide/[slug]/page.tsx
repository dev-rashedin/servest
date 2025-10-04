import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from '@/components/MDXComponent';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const files = await fs.readdir(path.join(process.cwd(), '../docs/guide'));
  return files.filter((f) => f.endsWith('.mdx')).map((f) => ({ slug: f.replace(/\.mdx$/, '') }));
}

// Updated props type to include optional searchParams
interface AddonPageProps {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function AddonPage({ params }: AddonPageProps) {
  const filePath = path.join(process.cwd(), '../docs/guide', `${params.slug}.mdx`);
  const source = await fs.readFile(filePath, 'utf-8');

  const { content } = await compileMDX({
    source,
    components: MDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  });

  return <div className="prose prose-lg">{content}</div>;
}
