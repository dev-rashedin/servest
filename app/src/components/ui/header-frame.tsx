import { ReactNode } from 'react';

export default function HeaderFrame({
  children,
  type = 'nav',
}: {
  children: ReactNode;
  type?: string;
  bg?: string;
}) {
  return (
    <header
      className={`
        flex items-center sticky top-0 w-full z-50
        ${
          type === 'home'
            ? 'bg-navbar border-border border-b'
            : type === 'logo'
              ? 'mr-12 bg-sidebar border-c-logo border-b'
              : 'justify-end bg-docs border-c-docs border-b'
        }
      `}
    >
      {children}
    </header>
  );
}
