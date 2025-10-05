import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getContentLinks } from '@/lib';
import '../pages.layout.css';
import MotionWrapper from '@/components/MotionWrapper';
import { SidebarProvider } from '@/components/SidebarToggleContext';
import MobileUI from '@/components/MobileUI';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  const links = getContentLinks('addons');

  return (
    <SidebarProvider>
      <main className="lg:flex">
        {/* Desktop sidebar (always visible on large screens) */}
        <div className="hidden lg:block lg:w-[20%]">
          <Sidebar links={links} type="addons" />
        </div>

        {/* Content area */}
        <div className="flex-1 relative">
          <MobileUI links={links} type="addons">
            <MotionWrapper>{children}</MotionWrapper>
          </MobileUI>
        </div>
      </main>
    </SidebarProvider>
  );
}
