'use client';
import React from 'react';
import { useSidebar } from './SidebarToggleContext';
import LeftSidebar from '@/components/LeftSidebar';

function Drawers({ links, type }: DrawerProps) {
  const { sidebarOpen, setSidebarOpen, rightSidebarOpen, setRightSidebarOpen } = useSidebar();

  return (
    <>
      {/* Left LeftSidebar Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ease-in-out ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`absolute left-0 top-0 bottom-0 w-[60%] md:w-[40%] bg-sidebar shadow-lg overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <LeftSidebar links={links} type={type} setSidebarOpen={setSidebarOpen} />
        </div>
      </div>

      {/* Right LeftSidebar Portal Container */}
      <div
        id="right-sidebar-portal"
        className={`fixed inset-0 lg:hidden ${rightSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setRightSidebarOpen(false)}
      >
        <div
          className="absolute right-0 top-0 bottom-0 w-[60%] md:w-[40%] bg-sidebar p-4 shadow-lg overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div id="right-sidebar-portal-content" />
        </div>
      </div>
    </>
  );
}

export default function MobileUI({
  links,
  type,
  children,
}: {
  links: { slug: string; label: string }[];
  type: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Drawers links={links} type={type} />
    </>
  );
}
