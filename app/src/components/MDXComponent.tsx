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

  // Add table support
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <table
      className="min-w-full text-sm text-gray-800 dark:text-gray-200 border-collapse"
      {...props}
    />
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className="border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 uppercase tracking-wider"
      {...props}
    />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-3 py-2 text-left" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />,
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="bg-primary-foreground" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-3 py-2 border-b border-gray-200 dark:border-gray-700" {...props} />
  ),
};
