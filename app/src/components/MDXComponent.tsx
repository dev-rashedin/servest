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

  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="border-t border-border" {...props} />
  ),

  // Add table support
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <table className="min-w-full text-sm px-4 border-collapse rounded-lg" {...props} />
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <thead {...props} />,
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="p-5 text-left text-secondary-foreground uppercase tracking-wider bg-even border-none"
      {...props}
    />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />,
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="text-secondary-foreground text-[15px] tracking-wide odd:bg-odd even:bg-even border-none"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-3 py-2" {...props} />
  ),
};
