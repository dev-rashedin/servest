'use client';
import React from 'react';
import { useSidebar } from './SidebarToggleContext';
import LeftSidebar from '@/components/LeftSidebar';

function Drawers({ links, type, nestedLinks }: DrawerProps) {
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
          className={`absolute left-0 top-0 bottom-0 w-[63%] md:w-[36%] bg-sidebar shadow-lg overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <LeftSidebar links={links} type={type} nestedLinks={nestedLinks} />
        </div>
      </div>

      <div
        id="right-sidebar-portal"
        className={`fixed inset-0 z-50 xl:hidden transition-opacity duration-300 ease-in-out ${
          rightSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setRightSidebarOpen(false)}
      >
        <div
          className={`absolute left-1/2 top-[calc(9rem+1rem)] -translate-x-1/2 w-[90%] lg:w-[40%] transform transition-all duration-300 ease-in-out ${
            rightSidebarOpen ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            id="right-sidebar-portal-content"
            className="bg-sidebar p-6 rounded-lg shadow-lg border border-c-logo max-h-[70vh] overflow-y-auto"
          />
        </div>
      </div>
    </>
  );
}

export default function DrawerContainer({
  links,
  type,
  nestedLinks,
  children,
}: DrawerProps & { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Drawers links={links} type={type} nestedLinks={nestedLinks} />
    </>
  );
}
