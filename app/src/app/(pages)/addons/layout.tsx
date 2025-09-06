import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getAddonLinks } from '@/scripts/getLinks';
import MotionWrapper from '@/components/MotionWrapper';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  const links = getAddonLinks(); // server-side

  return (
    <div className="flex w-full h-full fixed">
      <Sidebar links={links} type="addons" />
      <MotionWrapper>{children}</MotionWrapper>
    </div>
  );
}
