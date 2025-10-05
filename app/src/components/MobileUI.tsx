'use client';
import React from 'react';
import { useSidebar } from './SidebarToggleContext';
import Sidebar from '@/components/Sidebar';

interface LinkItem { slug: string; label: string }

function Drawers({ links, type }: { links: LinkItem[]; type: string }) {
  const { sidebarOpen, setSidebarOpen, rightSidebarOpen, setRightSidebarOpen } = useSidebar();

  return (
    <>
      {/* Left Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-[60%] bg-background p-4 shadow-lg overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar links={links} type={type} />
        </div>
      </div>

      {/* Right Sidebar Portal Container */}
      <div
        id="right-sidebar-portal"
        className={`fixed inset-0 z-50 lg:hidden ${rightSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setRightSidebarOpen(false)}
      >
        <div
          className="absolute right-0 top-0 bottom-0 w-[60%] bg-background p-4 shadow-lg overflow-y-auto"
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
