import CodeBlock from './CodeBlock';

const InlineHighlight = ({ children }: { children: React.ReactNode }) => (
  <strong className="text-highlight text-lg font-medium mx-0.5">{children}</strong>
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
