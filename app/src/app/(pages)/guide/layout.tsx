import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getContentLinks } from '@/lib';
import MotionWrapper from '@/components/MotionWrapper'; // <- client wrapper
import MobileUI from '@/components/MobileUI';

export default function GuideLayout({ children }: { children: ReactNode }) {
  const links = getContentLinks('guide');

  return (
    <main className="lg:flex">
      <div className="sidebar">
        <Sidebar links={links} type="guide" />
      </div>
      <div className="docs-content relative">
        <MobileUI links={links} type="addons">
          <MotionWrapper>{children}</MotionWrapper>
        </MobileUI>
      </div>
    </main>
  );
}
