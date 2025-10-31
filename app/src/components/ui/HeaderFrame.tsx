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
      className={`h-20 pt-2 flex border-b  items-center lg:sticky lg:top-0 z-50  ${type === 'home' ? 'bg-navbar border-border sticky top-0' : type === 'logo' ? 'mr-12 bg-sidebar border-c-logo' : ' justify-end bg-docs border-c-docs'}`}
    >
      {children}
    </header>
  );
}
