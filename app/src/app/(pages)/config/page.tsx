// "use client"

import { promises as fs } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';

export default async function ConfigPage() {
  const filePath = path.join(process.cwd(), '../docs/config/index.mdx');
  const source = await fs.readFile(filePath, 'utf-8');
  // const {theme} = useTheme()

  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  return <div className={`prose prose-lg wall`}>{content}</div>;
}
