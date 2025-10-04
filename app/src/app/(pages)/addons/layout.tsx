import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getContentLinks } from '@/lib';
import MotionWrapper from '@/components/MotionWrapper';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  const links = getContentLinks('addons');

  return (
    <main className="flex min-h-[calc(100vh-80px)]">
      <div className="sidebar">
        <Sidebar links={links} type="addons" />
      </div>
      <div className="docs-content">
        <MotionWrapper>{children}</MotionWrapper>
      </div>
    </main>
  );
}
