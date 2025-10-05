'use client';

import { useState } from 'react';
import { RiArrowRightSLine, RiMenu2Fill } from '@/data';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';

export default function SidebarToggles({
  links,
  type,
}: {
  links: { slug: string; label: string }[];
  type: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden flex-between h-12 mt-4 px-4">
        <RiMenu2Fill size={20} className="cursor-pointer" onClick={() => setSidebarOpen(true)} />

        <p className="flex-center text-xs gap-1 text-muted-foreground bg-[rgb(var(--footer-bg))] px-4 py-2 rounded-lg">
          On this page{' '}
          <RiArrowRightSLine
            size={18}
            className="cursor-pointer"
            onClick={() => setRightSidebarOpen(true)}
          />
        </p>
      </div>

      {/* Sidebar drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setSidebarOpen(false)}>
          <div
            className="absolute left-0 top-0 bottom-0 w-64 bg-background shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar links={links} type={type} />
          </div>
        </div>
      )}

      {/* Right sidebar drawer */}
      {rightSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setRightSidebarOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-64 bg-background shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <RightSidebar clientHeadings={[]} />
          </div>
        </div>
      )}
    </>
  );
}
