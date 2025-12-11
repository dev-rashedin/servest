import DocsImage from './DocsImage';
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

  // images
  img: ({ src, alt }: { src?: string; alt?: string }) => {
    return (
      <DocsImage
        src={src ?? ''}
        alt={alt ?? ''}
        width={1200} // required for next/image
        height={800} // adjust if needed
      />
    );
  },

  // styling table in mdx
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

  // defining navigation route
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
    const isExternal = href && !href.startsWith('/') && !href.startsWith('#');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined} // open external links in new tab
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  },
};
