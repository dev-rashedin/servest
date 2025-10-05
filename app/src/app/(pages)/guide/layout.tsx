import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getContentLinks } from '@/lib';
import MotionWrapper from '@/components/MotionWrapper';
import MobileUI from '@/components/MobileUI';
import { SidebarProvider } from '@/components/SidebarToggleContext';

export default function GuideLayout({ children }: { children: ReactNode }) {
  const links = getContentLinks('guide');

  return (
    <SidebarProvider>
      <main className="lg:flex">
        <div className="sidebar">
          <Sidebar links={links} type="guide" />
        </div>
        <div className="docs-content relative">
          <MobileUI links={links} type="guide">
            <MotionWrapper>{children}</MotionWrapper>
          </MobileUI>
        </div>
      </main>
    </SidebarProvider>
  );
}
