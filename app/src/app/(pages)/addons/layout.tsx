import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getAddonLinks } from '@/scripts/getLinks';
import MotionWrapper from '@/components/MotionWrapper';
import RightSidebar from '@/components/RightSidebar';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  const links = getAddonLinks();
  const headings = [
    { id: 'installation', text: 'Installation', level: 2 },
    { id: 'usage', text: 'Usage', level: 2 },
    { id: 'examples', text: 'Examples', level: 3 },
  ];

  return (
    <main className="flex min-h-[calc(100vh-80px)]">
      <div className="sidebar">
        <Sidebar links={links} type="addons" />
      </div>
      <div className="docs-content">
        <MotionWrapper>{children}</MotionWrapper>
        <RightSidebar headings={headings} />
      </div>
    </main>
  );
}
