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
        <div className="hidden lg:block">
          <LeftSidebar links={links} type="addons" />
        </div>

        {/* content area */}
        <div className="flex-1 relative">
          <DrawerContainer links={links} type="addons">
            <MotionWrapper>{children}</MotionWrapper>
          </DrawerContainer>
        </div>
      </main>
    </SidebarProvider>
  );
}
