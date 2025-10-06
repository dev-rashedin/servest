import { ReactNode } from 'react';
import LeftSidebar from '@/components/LeftSidebar';
import { getContentLinks } from '@/lib';
import MotionWrapper from '@/components/MotionWrapper';
import DrawerContainer from '@/components/DrawerContainer';
import { SidebarProvider } from '@/components/SidebarToggleContext';

export default function GuideLayout({ children }: { children: ReactNode }) {
  const links = getContentLinks('guide');

  return (
    <SidebarProvider>
      <main className="lg:flex">
        <div className="sidebar">
          <LeftSidebar links={links} type="guide" />
        </div>
        <div className="docs-content relative">
          <DrawerContainer links={links} type="guide">
            <MotionWrapper>{children}</MotionWrapper>
          </DrawerContainer>
        </div>
      </main>
    </SidebarProvider>
  );
}
