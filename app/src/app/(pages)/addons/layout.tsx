import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getAddonLinks } from '@/scripts/getLinks';
import MotionWrapper from '@/components/MotionWrapper';
import RightSidebar from '@/components/RightSidebar';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  const links = getAddonLinks();

  return (
    <main className="flex min-h-[calc(100vh-80px)]">
      <div className="sidebar">
        <Sidebar links={links} type="addons" />
      </div>
      <div className="docs-content">
        <MotionWrapper>{children}</MotionWrapper>
        <RightSidebar clientHeadings={[]} />
      </div>
    </main>
  );
}
