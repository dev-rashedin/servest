import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getContentLinks } from '@/lib';
import '../pages.layout.css';
import MotionWrapper from '@/components/MotionWrapper';
import SidebarToggles from '@/components/SidebarTogglers';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  const links = getContentLinks('addons');

  return (
    <main className="lg:flex">
      <div className="sidebar">
        <Sidebar links={links} type="addons" />
      </div>
      <div className="docs-content">
        <SidebarToggles links={links} type="addons" />
        <MotionWrapper>{children}</MotionWrapper>
      </div>
    </main>
  );
}
