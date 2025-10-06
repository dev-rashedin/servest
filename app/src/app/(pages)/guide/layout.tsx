import { ReactNode } from 'react';
import LeftSidebar from '@/components/LeftSidebar';
import { getContentLinks } from '@/lib';
import MotionWrapper from '@/components/MotionWrapper';
import DrawerContainer from '@/components/DrawerContainer';

export default function GuideLayout({ children }: { children: ReactNode }) {
  const links = getContentLinks('guide');

  return (
    <main className="lg:flex">
      <div className="sidebar">
        <LeftSidebar links={links} type="addons" />
      </div>

      {/* content area */}
      <div className="docs-content relative">
        <DrawerContainer links={links} type="addons">
          <MotionWrapper>{children}</MotionWrapper>
        </DrawerContainer>
      </div>
    </main>
  );
}
