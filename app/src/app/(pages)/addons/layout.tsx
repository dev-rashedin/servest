import { ReactNode } from 'react';
import LeftSidebar from '@/components/LeftSidebar';
import { getContentLinks } from '@/lib';
import '../pages.layout.css';
import MotionWrapper from '@/components/MotionWrapper';
import { SidebarProvider } from '@/components/SidebarToggleContext';
import DrawerContainer from '@/components/DrawerContainer';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  const links = getContentLinks('addons');

  return (
    <SidebarProvider>
      <main className="lg:flex">
        <div className="hidden lg:block lg:w-[20%]">
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
