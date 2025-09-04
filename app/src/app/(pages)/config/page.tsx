import { promises as fs } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Highlight } from 'prism-react-renderer';
import { NoctisTheme } from '@/components/theme/noctis';

const MDXComponents = {
  code: ({ className, children }: { className?: string; children: React.ReactNode }) => {
    const language = className?.replace('language-', '') || 'ts';
    const code = String(children).trim();

    return (
      <Highlight code={code} language={language} theme={NoctisTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  },
};

export default async function ConfigPage() {
  const filePath = path.join(process.cwd(), '../docs/config/index.mdx');
  const source = await fs.readFile(filePath, 'utf-8');

  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
    components: MDXComponents, // <-- automatically apply Prism to all <code> blocks
  });

  return <div className="prose prose-lg wall">{content}</div>;
}
