import fs from 'fs/promises';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import CodeBlock from '@/components/CodeBlock';

export default async function ConfigPage() {
  const filePath = path.join(process.cwd(), '../docs/config/index.mdx');
  const source = await fs.readFile(filePath, 'utf-8');

  const { content } = await compileMDX({
    source,
    components: {
      code: ({ className, children }: { className?: string; children: string }) => {
        const lang = className?.replace('language-', '') || 'ts';
        return <CodeBlock code={children} language={lang} />;
      },
    },
    options: { parseFrontmatter: true },
  });

  return <div className="prose-lg">{content}</div>;
}

// import fs from 'fs/promises';
// import path from 'path';
// import { compileMDX } from 'next-mdx-remote/rsc';
// import { MDXComponents } from '@/components/MDXComponent';

// export default async function ConfigPage() {
//   const filePath = path.join(process.cwd(), '../docs/config/index.mdx');
//   const source = await fs.readFile(filePath, 'utf-8');

//   const { content } = await compileMDX({
//     source,
//     components: MDXComponents,
//     options: { parseFrontmatter: true },
//   });

//   return <div className="prose prose-lg">{content}</div>;
// }
