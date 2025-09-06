import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getAddonLinks } from '@/scripts/getLinks';
import MotionWrapper from '@/components/MotionWrapper';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  const links = getAddonLinks(); // server-side

  return (
    <main className="w-full h-full fixed">
      <div className="flex boundary">
        <Sidebar links={links} type="addons" />
        <MotionWrapper>{children}</MotionWrapper>
      </div>
    </main>
  );
}
