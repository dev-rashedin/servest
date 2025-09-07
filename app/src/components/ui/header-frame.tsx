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
      className={`h-20 pt-2 flex border-b  items-center sticky top-0  ${type === 'home' ? 'bg-navbar border-border' : type === 'logo' ? 'mr-12 bg-sidebar border-c-logo' : ' justify-end bg-docs border-c-docs'}`}
    >
      {children}
    </header>
  );
}
