import { ReactNode } from 'react';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-docs">
      <div className="boundary">{children}</div>
    </main>
  );
}
