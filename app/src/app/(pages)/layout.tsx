import { ReactNode } from 'react';

export default function PagesLayout({ children }: { children: ReactNode }) {
  return <main className="boundary bg-[rgb(var(--footer-bg))]">{children}</main>;
}
