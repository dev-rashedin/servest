import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getContentLinks } from '@/lib';
import MotionWrapper from '@/components/MotionWrapper'; // <- client wrapper

export default function GuideLayout({ children }: { children: ReactNode }) {
  const links = getContentLinks('guide');

  return (
    <main className="lg:flex">
      <div className="sidebar">
        <Sidebar links={links} type="guide" />
      </div>
      <div className="docs-content">
        <MotionWrapper>{children}</MotionWrapper>
      </div>
    </main>
  );
}
