import CodeBlock from './ui/CodeBlock';

const InlineHighlight = ({ children }: { children: React.ReactNode }) => (
  <strong className="text-highlight text-lg font-medium mx-0.5">{children}</strong>
);

export const MDXComponents = {
  code: ({ className, children }: { className?: string; children: string }) => {
    if (!className) {
      return <InlineHighlight>{children}</InlineHighlight>;
    }

    const lang = className.replace('language-', '').trim() || 'text';

    return <CodeBlock code={children} language={lang || 'bash'} />;
  },
};
