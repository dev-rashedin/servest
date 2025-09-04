'use client';

import CodeBlock from './CodeBlock';

export const MDXComponents = {
  code: ({ className, children }: { className?: string; children: string }) => {
    const lang = className?.replace('language-', '');

    if (lang) {
      // Triple backticks → code block → Shiki
      return <CodeBlock code={children} language={lang} />;
    }

    // Single backticks → inline highlight
    return <span className="highlight">{children}</span>;
  },
};
