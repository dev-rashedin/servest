import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from '@/components/MDXComponent';

export default async function AddonsPage() {
  const filePath = path.join(process.cwd(), '../docs/addons/index.mdx');
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
