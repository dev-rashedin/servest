import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getAddonLinks } from '@/scripts/getLinks';
import MotionWrapper from '@/components/MotionWrapper'; // <- client wrapper

export default function GuideLayout({ children }: { children: ReactNode }) {
  const links = getAddonLinks(); // server-side

  return (
    <main className="w-full h-full fixed">
      <div className="flex lg:pl-12 xl:pl-24">
        <Sidebar links={links} type="guide" />
        <MotionWrapper>{children}</MotionWrapper>
      </div>
    </main>
  );
}
