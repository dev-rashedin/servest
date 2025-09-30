import { ReactNode } from 'react';

export default function PagesLayout({ children }: { children: ReactNode }) {
  return <main className="min-h-[calc(100vh-80px)]">{children}</main>;
}
