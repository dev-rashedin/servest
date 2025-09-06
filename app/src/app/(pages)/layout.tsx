import { ReactNode } from 'react';

export default function PagesLayout({ children }: { children: ReactNode }) {
  return <main className="boundary">{children}</main>;
}
