import { ReactNode } from 'react';

export default function HeaderFrame({
  children,
  type = 'nav',
  bg = 'bg-[rgb(var(--navbar-bg))]',
}: {
  children: ReactNode;
  type?: string;
  bg?: string;
}) {
  return (
    <header
      className={`h-24 w-full flex items-center justiry-end sticky top-0 ${type === 'nav' ? '' : ''} ${bg}`}
    >
      <div>
        {children}
        <div className="border-t-2 border-border mt-4"></div>
      </div>
    </header>
  );
}
