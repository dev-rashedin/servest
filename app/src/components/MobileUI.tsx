'use client';
import React from 'react';
import { SidebarProvider, useSidebar } from './SidebarToggleContext';
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
          className="absolute left-0 top-0 bottom-0 w-[80%] bg-background p-4 shadow-lg overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar links={links} type={type} />
        </div>
      </div>

      {/* Right Sidebar portal container (content will be portaled here from DisplayContent) */}
      <div
        id="right-sidebar-portal"
        className={`fixed inset-0 z-50 lg:hidden ${rightSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setRightSidebarOpen(false)}
      >
        <div
          className="absolute right-0 top-0 bottom-0 w-[80%] bg-background p-4 shadow-lg overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* empty mount point: DisplayContent's client portal will render inside this div */}
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
    <SidebarProvider>
      {children}
      <Drawers links={links} type={type} />
    </SidebarProvider>
  );
}
