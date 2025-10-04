import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getContentLinks } from '@/lib';
import '../pages.layout.css';
import MotionWrapper from '@/components/MotionWrapper';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  const links = getContentLinks('addons');

  return (
    <main className="lg:flex">
      <div className="sidebar">
        <Sidebar links={links} type="addons" />
      </div>
      <div className="docs-content">
        <MotionWrapper>{children}</MotionWrapper>
      </div>
    </main>
  );
}
