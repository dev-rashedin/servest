import { promises as fs } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import MDXComponent from '@/components/MDXComponent';

export default async function ConfigPage() {
  const filePath = path.join(process.cwd(), '../docs/config/index.mdx');
  const source = await fs.readFile(filePath, 'utf-8');

  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
    components: MDXComponent, // <-- automatically apply Prism to all <code> blocks
  });

  return <div className="prose prose-lg wall">{content}</div>;
}
