// app/config/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { JSX } from 'react';

export default async function ConfigPage(): Promise<JSX.Element> {
  const filePath = path.join(process.cwd(), '../docs/config/index.mdx');
  const source = await fs.readFile(filePath, 'utf-8');

  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  return <div className="prose prose-lg dark:prose-invert mx-auto">{content}</div>;
}
