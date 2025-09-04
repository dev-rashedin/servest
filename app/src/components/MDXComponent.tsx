import CodeBlock from './CodeBlock';

const InlineHighlight = ({ children }: { children: React.ReactNode }) => (
  <span className="text-green-500 text-lg font-medium">{children}</span>
);

export const MDXComponents = {
  // Inline vs block distinction
  code: ({ className, children }: { className?: string; children: string }) => {
    if (!className) {
      // single backtick inline code → highlighted text
      return <InlineHighlight>{children}</InlineHighlight>;
    }

    // triple backticks → Shiki code block
    const lang = className.replace('language-', '');
    return <CodeBlock code={children} language={lang} />;
  },
};
