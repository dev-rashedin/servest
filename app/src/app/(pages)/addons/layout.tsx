// app/(pages)/addons/layout.tsx
import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getAddonLinks } from '@/scripts/getAddonLinks';
import MotionWrapper from '@/components/MotionWrapper'; // <- client wrapper

export default function AddonsLayout({ children }: { children: ReactNode }) {
  const links = getAddonLinks(); // server-side

  return (
    <div className="flex w-full h-full fixed">
      <Sidebar links={links} type="addons" />
      <MotionWrapper>{children}</MotionWrapper>
    </div>
  );
}
