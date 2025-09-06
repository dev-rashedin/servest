import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getAddonLinks } from '@/scripts/getLinks';
import MotionWrapper from '@/components/MotionWrapper'; // <- client wrapper

export default function GuideLayout({ children }: { children: ReactNode }) {
  const links = getAddonLinks(); // server-side

  return (
    <main className="flex min-h-[calc(100vh-80px)]">
      <div className="sidebar bg-black">
        <Sidebar links={links} type="guide" />
      </div>
      <div className="docs-content bg-docs">
        <MotionWrapper>{children}</MotionWrapper>
      </div>
    </main>
  );
}
