import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/MDXComponent';

export default async function ConfigPage() {
  const filePath = path.join(process.cwd(), '../docs/config/index.mdx');
  const source = await fs.readFile(filePath, 'utf-8');

  const { content } = await compileMDX({
    source,
    components: MDXComponents,
    options: { parseFrontmatter: true },
  });

  return <div className="prose prose-lg">{content}</div>;
}
