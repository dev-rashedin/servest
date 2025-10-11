import CodeBlock from './ui/CodeBlock';
import CodeGroup from './ui/CodeGroup';

const InlineHighlight = ({ children }: { children: React.ReactNode }) => (
  <strong className="text-highlight text-lg font-medium mx-0.5">{children}</strong>
);

export const MDXComponents = {
  code: ({ className, children }: { className?: string; children: string }) => {
    if (!className) {
      return <InlineHighlight>{children}</InlineHighlight>;
    }

    const lang = className.replace('language-', '').trim();

    let variants: Record<string, string> | null = null;

    try {
      variants = Function(`"use strict"; return (${children})`)();
      if (typeof variants !== 'object' || variants === null) variants = null;
    } catch {
      variants = null;
    }

    if (variants) {
      return <CodeGroup variants={variants} language={lang} />;
    }

    return <CodeBlock code={children} language={lang} />;
  },
};
