import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getContentLinks } from '@/lib';
import MotionWrapper from '@/components/MotionWrapper'; // <- client wrapper

export default function GuideLayout({ children }: { children: ReactNode }) {
  const links = getContentLinks('guide'); // server-side

  return (
    <main className="flex min-h-[calc(100vh-80px)]">
      <div className="sidebar">
        <Sidebar links={links} type="guide" />
      </div>
      <div className="docs-content">
        <MotionWrapper>{children}</MotionWrapper>
      </div>
    </main>
  );
}
