import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getAddonLinks } from '@/scripts/getLinks';
import MotionWrapper from '@/components/MotionWrapper'; // <- client wrapper

export default function GuideLayout({ children }: { children: ReactNode }) {
  const links = getAddonLinks(); // server-side

  return (
    <main className="flex">
      <Sidebar links={links} type="guide" />
      <MotionWrapper>{children}</MotionWrapper>
    </main>
  );
}
